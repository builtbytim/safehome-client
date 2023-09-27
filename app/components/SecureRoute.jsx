"use client";

import useRemoteSession from "../utils/hooks/useRemoteSession";
import PageLoader from "./layout/PageLoader";
import config from "../utils/config";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { retreiveFromLocalStorage, clearLocalStorage } from "../utils/security";
import { useEffect, useState } from "react";

export default function SecureRoute(props) {
  const tokenObj = retreiveFromLocalStorage(`${config.localStorageKey}:token`);
  const [proceed, setProceed] = useState(false);

  useEffect(() => {
    if (proceed) {
      return;
    }

    if (window && window.location) {
      setProceed(true);
    }
  }, [proceed]);

  const { offspring: SecureChild, autoLogin = true, ...remProps } = props;
  const {
    authenticated,
    authenticating,
    authenticatedSession,
    authenticatedUser,
    authenticationFailed,
    authenticationToken,
  } = useRemoteSession(tokenObj);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPathname = usePathname();

  let targetUrl = searchParams.get(config.redirectSearchParam);

  if (authenticating || !proceed) {
    // console.log("Authenticating...");
    return <PageLoader />;
  }

  if (authenticated) {
    // console.log("Authentication Sucesssful!");

    console.log(targetUrl);

    // * if autoLogin, skips login page on success auth

    if (autoLogin) {
      if (currentPathname === config.loginUrl) {
        if (config.signInRedirectIgnore.includes(targetUrl)) {
          targetUrl = null;
        }

        const destinationUrl = new URL(
          targetUrl || config.authenticatedHome,
          window.location.origin
        );

        router.replace(destinationUrl.href);
      }
    }

    return (
      <SecureChild
        {...remProps}
        authenticatedSession={authenticatedSession}
        authenticatedUser={authenticatedUser}
        authenticationToken={authenticationToken}
        signOut={() => {
          clearLocalStorage(`${config.localStorageKey}:token`);
          router.replace(config.loginUrl);
        }}
      />
    );
  }

  if (authenticationFailed) {
    // console.log("Authentication Failed!");

    // * if the page is already the log in page, cease redirect
    if (currentPathname === config.loginUrl) {
      return <SecureChild {...remProps} />;
    }

    // * if the page is not  the log in page,  redirect

    const redirectUrl = new URL(currentPathname, window.location.origin);

    // for (let name of searchParams.keys()) {
    //   redirectUrl.searchParams.append(name, searchParams.get(name));
    // }

    const newUrl = new URL(config.loginUrl, window.location.origin);

    newUrl.searchParams.append("t", 3);

    newUrl.searchParams.append(
      config.redirectSearchParam,
      redirectUrl.pathname
    );

    router.replace(newUrl.href);
  }
}

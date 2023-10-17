"use client";

import useRemoteSession from "../utils/hooks/useRemoteSession";
import config from "../utils/config";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { retreiveFromLocalStorage, clearLocalStorage } from "../utils/security";
import Spinner from "./Spinner";
import Overlay3 from "./Overlay3";
import { useState, useEffect } from "react";
import { useDataStore } from "../utils/store";
import { useNotifyStore } from "../utils/store";

const MAX_WAIT_TIME = 30000;

export default function SecureRoute(props) {
  const setNotify = useNotifyStore((state) => state.setNotify);
  const authenticationToken = retreiveFromLocalStorage(
    `${config.localStorageKey}:token`
  );
  const [propagatedSession, setPropagatedSession] = useState(false);

  const setUserLocal = useDataStore((state) => state.setUserLocal);
  const setTokenLocal = useDataStore((state) => state.setTokenLocal);

  const { offspring: SecureChild, autoLogin = true, ...remProps } = props;
  const {
    authenticated,
    authenticating,
    authenticatedSession,
    authenticatedUser,
    authenticationFailed,
  } = useRemoteSession(authenticationToken);

  useEffect(() => {
    if (authenticatedUser && !propagatedSession) {
      setUserLocal(authenticatedUser);
      setTokenLocal(authenticationToken);
      setPropagatedSession(true);
    }
  }, [authenticatedUser]);

  // if its taking too long, offer to refresh

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!authenticating) return;
      // setNotify({
      //   show: true,
      //   content: "This seems to be taking too long",
      //   onAccept: () => {
      //     if (authenticating) {
      //       router.refresh();
      //     }
      //   },
      //   onAcceptText: "Refresh",
      // });

      console.log("This seems to be taking too long");
    }, MAX_WAIT_TIME);

    return () => clearTimeout(timeout);
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPathname = usePathname();

  const newSearchParams = new URLSearchParams();
  let targetUrl = searchParams.get(config.redirectSearchParam);

  if (authenticating) {
    return <AuthLoader />;
  }

  if (authenticated) {
    // console.log("Authentication Sucesssful!");

    // * if autoLogin, skips login page on success auth

    if (autoLogin) {
      if (currentPathname === config.loginUrl) {
        if (config.signInRedirectIgnore.includes(targetUrl)) {
          targetUrl = null;
        }

        const destinationUrl = targetUrl || config.authenticatedHome;

        router.replace(destinationUrl);
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

    const redirectUrl = currentPathname;

    const newUrl = config.loginUrl;

    newSearchParams.append(
      config.signInModeParam,
      config.signInModes.AUTH_FAILED
    );

    newSearchParams.append(config.redirectSearchParam, redirectUrl);

    router.replace(`${newUrl}?${newSearchParams.toString()}`);
  }
}

function AuthLoader() {
  return (
    <Overlay3 z={1}>
      <section className=" top-0 bottom-0 inset-x-0  flex flex-col justify-center items-center  w-full min-h-screen z-10 space-y-16">
        <div className="md:hidden">
          <Spinner size="small" />
        </div>

        <div className="md:block hidden">
          <Spinner size="large" />
        </div>
      </section>
    </Overlay3>
  );
}

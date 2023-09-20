"use client";

import SecureRoute from "../../components/SecureRoute";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cn from "classnames";
import SafeHomeLogo from "../../../assets/images/logo_brand.png";
import Spinner from "../../components/Spinner";
import useSignOut from "../../utils/hooks/useSignOut";

function Page({ authenticatedUser, authenticationToken, signOut }) {
  const router = useRouter();

  const { isLoading, isError, mutate, reset } = useSignOut(signOut);

  function goBack() {
    if (isLoading) return;

    router.back();
  }

  function handleLogoutClick() {
    if (isLoading) return;

    if (isError) {
      reset();
    }

    mutate(authenticationToken);
  }

  return (
    <>
      <div className=" min-h-screen p-3  xl:p-6">
        <div className="flex flex-col space-y-12 justify-center items-center">
          <Image
            width={120}
            height={100}
            src={SafeHomeLogo}
            priority
            alt="safehome logo"
            className=""
          />

          <div className="flex flex-col justify-center items-center  space-y-2 lg:space-y-8 border w-[90%] max-w-md   border-[#8d4000]/30  rounded-brand px-6 py-6 ">
            <div className="w-full">
              <p className=" text-sm lg:text-xl  font-normal text-center  py-2  text-[--text-secondary]">
                Are you sure you want to sign out of{" "}
                <span className="font-medium">{authenticatedUser.email}</span>?
              </p>

              <p
                className={
                  "  text-[--text-danger] text-center text-xs font-medium" +
                  cn({
                    " visible ": isError,
                    " invisible ": !isError,
                  })
                }
              >
                There was an error signing you out. Please try again.
              </p>
            </div>
            <button
              disabled={isLoading}
              onClick={handleLogoutClick}
              className="btn-1 text-sm lg:text-base  "
            >
              {isLoading ? (
                <Spinner size="mini" />
              ) : isError ? (
                "Retry"
              ) : (
                "Yes, Do It!"
              )}
            </button>

            <div
              className={
                "flex flex-row justify-center pt-3 items-center w-full "
              }
            >
              <p
                onClick={goBack}
                className=" cursor-pointer hover:underline text-[--text-secondary]  text-sm lg:text-base"
              >
                Go back
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

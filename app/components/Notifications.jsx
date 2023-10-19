"use client";

import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import { FcEmptyFilter } from "react-icons/fc";
import { useUiStore } from "../utils/store";
import Image from "next/image";
import CampaignRoundedImage from "../../assets/images/icons/campaign-rounded.svg";
import { createFetcher } from "../utils/fetchUtils";
import { useQuery, useQueryClient, useMutation } from "react-query";
import config from "../utils/config";
import queryKeys from "../utils/queryKeys";
import { useDataStore } from "../utils/store";
import LoadingView from "./LoadingView";
import ErrorMessageView from "./ErrorMessageView";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRef } from "react";
import useOutsideClickDetector from "../utils/hooks/useOutsideClickDetector";
import cn from "classnames";

dayjs.extend(relativeTime);

export default function Notifications() {
  const showNotifications = useUiStore((state) => state.showNotifications);
  const toggleNotifications = useUiStore((state) => state.toggleNotifications);
  const ref = useRef(null);
  const queryClient = useQueryClient();

  const dataStoreToken = useDataStore(
    (state) => state.data && state.data.token
  );

  useOutsideClickDetector(ref, () => {
    if (showNotifications) {
      toggleNotifications();
    }
  });

  // mark all as read mutation

  const {
    mutate,
    isLoading: isLoadingMarkAllAsRead,
    isError: isErrorMarkAllAsRead,
  } = useMutation({
    mutationKey: queryKeys.markAllNotificationsAsRead,
    mutationFn: createFetcher({
      url: config.apiPaths.markAllNotificationsAsRead,
      method: "GET",
      auth: dataStoreToken,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getMyNotifications);
    },
  });

  // clear all notifications mutation

  const {
    mutate: mutateClearAll,
    isLoading: isLoadingClearAll,
    isError: isErrorClearAll,
  } = useMutation({
    mutationKey: queryKeys.clearMyNotifications,
    mutationFn: createFetcher({
      url: config.apiPaths.clearMyNotifications,
      method: "GET",
      auth: dataStoreToken,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getMyNotifications);
    },
  });

  const { data, isFetching, isSuccess, isLoading, isError, refetch } = useQuery(
    {
      queryKey: [
        queryKeys.getMyNotifications,
        dataStoreToken,
        showNotifications,
      ],
      queryFn: createFetcher({
        url: config.apiPaths.getMyNotifications,
        method: "GET",
        auth: dataStoreToken,
      }),
      enabled: !!dataStoreToken,
    }
  );

  function closeSelf() {
    toggleNotifications();
  }

  if (!showNotifications) return null;

  const readCount =
    isSuccess && data && data.numItems > 0
      ? data.items.filter((v) => !v.read).length
      : 0;

  return (
    <Overlay
      ClickBack={() => {
        return (
          <div
            className="hidden md:block hover:bg-black/50 p-1 transitioning rounded-full  hover:cursor-pointer"
            onClick={toggleNotifications}
          >
            <BsX className="text-4xl text-white " />
          </div>
        );
      }}
      z={3}
    >
      <div
        ref={ref}
        className={
          "fixed  inset-y-0  bg-white mx-auto flex flex-col lg:justify-center items-center w-full lg:w-[80%] max-w-lg inset-x-0  md:right-auto md:left-0  z-40"
        }
      >
        <div className="w-full min-h-screen bg-white mt-4  px-4  space-y-4 relative">
          <div className="  flex md:hidden  flex-row justify-end items-center w-full">
            <BsX
              role="button"
              className="text-3xl text-[#8d4000] hover:text-[#8d4000]/80 transition-flow"
              onClick={closeSelf}
            />
          </div>

          <div className="flex flex-row justify-between items-center ">
            <p className="text-[--color-brand] font-bold text-lg    capitalize">
              {" "}
              Notifications
            </p>

            {isSuccess && data && data.numItems > 0 && readCount > 0 && (
              <button
                onClick={() => {
                  if (isLoadingMarkAllAsRead || isLoading) return;

                  mutate();
                }}
                disabled={isFetching || isLoadingMarkAllAsRead}
                type="button"
                className="text-[--text-danger] transitioning hover:cursor-pointer text-sm  hover:text-[--primary] rounded-brand p-1  disabled:opacity-20 disabled:pointer-events-none "
              >
                {isLoadingMarkAllAsRead ? "Marking..." : "Mark all as read"}
              </button>
            )}
          </div>
          {/* Notification items  */}

          <div className="pb-32  max-h-[80vh] overflow-y-auto scrollbar-fix">
            {data && data.unfilteredEntries === 0 && (
              <div className="w-full flex h-full flex-col justify-center items-center space-y-4">
                <div className="h-full pt-16 pb-8   space-y-4  mt-4 flex flex-col justify-center items-center text-[--color-brand-2]">
                  <FcEmptyFilter className="text-4xl text-[--color-brand-2] hover:text-[--color-brand-2]/80 transition-flow" />
                  <p className="text-center text-lg md:text-xl">
                    {" "}
                    No notifications at the moment
                  </p>
                </div>

                <button
                  disabled={isFetching}
                  type="button"
                  onClick={refetch}
                  className={
                    "text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--b1] flex flex-row justify-center items-center space-x-1 disabled:opacity-40 " +
                    cn({
                      " pointer-events-none  ": isFetching,
                    })
                  }
                >
                  <span className="self-center">
                    {isFetching ? "Refreshing..." : "Refresh"}
                  </span>
                </button>
              </div>
            )}

            {isLoading && (data === null || data === undefined) && (
              <div className="py-16">
                <LoadingView />
              </div>
            )}

            {isError && (data === null || data === undefined) && (
              <div className="py-16">
                <ErrorMessageView />
              </div>
            )}

            {/* {data && data.unfilteredEntries > 0 && data.entries === 0 && (
              <div className="w-full flex h-full flex-col justify-center items-center">
                <div className="h-full py-16   space-y-4  mt-4 flex flex-col justify-center items-center text-[--color-brand-2]">
                  <FcEmptyFilter className="text-4xl text-[--color-brand-2] hover:text-[--color-brand-2]/80 transition-flow" />
                  <p className="text-center text-sm md:text-lg">
                    No notifications match your filter at the moment
                  </p>
                </div>
              </div>
            )} */}

            {data &&
              data.numItems > 0 &&
              data.items.map((item, i) => (
                <div
                  key={i}
                  className={
                    "flex flex-row justify-between items-center w-full py-3 " +
                    cn({
                      "border-t border-[--b1] ": i !== 0,
                      " opacity-40 ": item.read,
                    })
                  }
                >
                  <div className="flex flex-row justify-between items-start space-x-4">
                    <div className="self-start  p-2 rounded-full bg-[#FF61000D] ">
                      <Image
                        src={CampaignRoundedImage}
                        alt="avatar"
                        width="22"
                        height="22"
                        className="rounded-full min-h-[22px] min-w-[22px] object-contain"
                      />
                    </div>

                    <div className="self-center space-y-1">
                      <p className="text-[--color-brand-2]  text-sm">
                        {item.body}
                      </p>
                      <p className="text-[--placeholder] text-xs">
                        {" "}
                        {dayjs(item.createdAt * 1000).fromNow()}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Buttons  */}

          {isSuccess && data && data.numItems > 0 && (
            <div className="bg-white absolute bottom-8 md:bottom-6 lg:bottom-4 inset-x-0 px-4 pt-4 pb-4 w-full flex flex-col justify-center itemss-center space-y-4 py-2">
              <button
                disabled={isFetching || isLoadingClearAll}
                onClick={() => {
                  if (isLoadingClearAll || isLoading) return;

                  mutateClearAll();
                }}
                className="btn-2 text-[--color-brand-2] font-medium border-[--color-brand-2] hover:bg-[#1E0700]/10 capitalize"
              >
                {isLoadingClearAll ? "Clearing all..." : "Clear all"}
              </button>
            </div>
          )}
        </div>
        {/* </Zoom> */}
      </div>
    </Overlay>
  );
}

"use client";

import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import { FcEmptyFilter } from "react-icons/fc";
import { useUiStore } from "../utils/store";
import Image from "next/image";
import CampaignRoundedImage from "../../assets/images/icons/campaign-rounded.svg";
import { createFetcher } from "../utils/fetchUtils";
import { useQuery, useQueryClient } from "react-query";
import config from "../utils/config";
import queryKeys from "../utils/queryKeys";
import { useDataStore } from "../utils/store";
import LoadingView from "./LoadingView";
import ErrorMessageView from "./ErrorMessageView";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Notifications() {
  const showNotifications = useUiStore((state) => state.showNotifications);
  const toggleNotifications = useUiStore((state) => state.toggleNotifications);

  const queryClient = useQueryClient();

  const dataStoreToken = useDataStore(
    (state) => state.data && state.data.token
  );

  const { data, isFetching, isSuccess, isLoading, isError, refetch } = useQuery(
    {
      queryKey: [queryKeys.getMyNotifications, dataStoreToken],
      queryFn: createFetcher({
        url: config.apiPaths.getMyNotifications,
        method: "GET",
        auth: dataStoreToken,
      }),
      enabled: !!dataStoreToken,

      refetchInterval: 1000 * 60 * 1,

      keepPreviousData: true,
    }
  );

  console.log(data);

  function closeSelf() {
    toggleNotifications();
  }

  if (!showNotifications) return null;

  if (isLoading && (data === null || data === undefined)) {
    return (
      <div className="py-16">
        <LoadingView />
      </div>
    );
  }

  if (isError && (data === null || data === undefined)) {
    return (
      <div className="py-16">
        <ErrorMessageView
          refetch={refetch}
          message="Something wrong while fetching  notifications"
        />
      </div>
    );
  }

  return (
    <Overlay
      ClickBack={() => {
        return (
          <div
            className="hidden md:block hover:cursor-pointer"
            onClick={toggleNotifications}
          >
            <BsX className="text-4xl text-white hover:text-white/80" />
          </div>
        );
      }}
      z={3}
    >
      <div
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

            <span className="text-[--text-danger] transitioning hover:cursor-pointer text-sm hover:text-[#ff0000]/80">
              Mark all as read
            </span>
          </div>
          {/* Notification items  */}

          <div className="pb-32  max-h-[80vh] overflow-y-auto scrollbar-fix">
            {data && data.unfilteredEntries === 0 && (
              <div className="w-full flex h-full flex-col justify-center items-center space-y-4">
                <div className="h-full py-16   space-y-4  mt-4 flex flex-col justify-center items-center text-[--color-brand-2]">
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
                    "text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--b1] flex flex-row justify-center items-center space-x-1 disabled:opacity-50 " +
                    cn({
                      " pointer-events-none  ": isFetching,
                    })
                  }
                >
                  <span className="self-center">Refresh</span>
                </button>
              </div>
            )}

            {data && data.unfilteredEntries > 0 && data.entries === 0 && (
              <div className="w-full flex h-full flex-col justify-center items-center">
                <div className="h-full py-16   space-y-4  mt-4 flex flex-col justify-center items-center text-[--color-brand-2]">
                  <FcEmptyFilter className="text-4xl text-[--color-brand-2] hover:text-[--color-brand-2]/80 transition-flow" />
                  <p className="text-center text-lg md:text-xl">
                    No notifications match your filter at the moment
                  </p>
                </div>
              </div>
            )}

            {data.numItems > 0 &&
              data.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-row justify-between items-center w-full mt-4"
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

                    <div className="self-center space-y-2">
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

          <div className="bg-white absolute bottom-4 inset-x-0 px-4 pt-4 pb-4 w-full flex flex-col justify-center itens-center space-y-4 py-2">
            <button className="btn-2 text-[--color-brand-2] font-medium border-[--color-brand-2] hover:bg-[#1E0700]/10">
              Clear All
            </button>
          </div>
        </div>
        {/* </Zoom> */}
      </div>
    </Overlay>
  );
}

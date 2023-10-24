import { createFetcher } from "../../utils/fetchUtils";
import { useQuery, useQueryClient, useMutation } from "react-query";
import config from "../../utils/config";
import queryKeys from "../../utils/queryKeys";
import { useDataStore } from "../../utils/store";
import LoadingView from "../LoadingView";
import ErrorMessageView from "../ErrorMessageView";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import cn from "classnames";
import Image from "next/image";
import CampaignRoundedImage from "../../../assets/images/icons/campaign-rounded.svg";

function RecentSavingsActivityList({ token }) {
  const { data, isFetching, isSuccess, isLoading, isError, refetch } = useQuery(
    {
      queryKey: [queryKeys.getMyNotifications, token],
      queryFn: createFetcher({
        url: config.apiPaths.getMyNotifications,
        method: "GET",
        auth: token,
        surfix: `?page=1&limit=10&type=savings`,
      }),
    }
  );

  if (isLoading && (data === null || data === undefined)) {
    return (
      <div className="py-10">
        <LoadingView />
      </div>
    );
  }

  if (isError && (data === null || data === undefined)) {
    return (
      <div className="py-10">
        <ErrorMessageView
          refetch={refetch}
          message="Something wrong while fetching your recent activities. Please try again."
        />
      </div>
    );
  }

  if (isSuccess && data && data.unfilteredEntries === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-sm lg:text-base  text-[#C4C4C4] xl:text-lg  ">
          No recent activities found.
        </p>
      </div>
    );
  }

  if (isSuccess && data && data.entries === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-[#C4C4C4]">No recent activities found.</p>
      </div>
    );
  }

  return (
    <div>
      {data &&
        data.entries > 0 &&
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
                <p className="text-[--color-brand-2]  text-sm">{item.body}</p>
                <p className="text-[--placeholder] text-xs">
                  {" "}
                  {dayjs(item.createdAt * 1000).fromNow()}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default RecentSavingsActivityList;

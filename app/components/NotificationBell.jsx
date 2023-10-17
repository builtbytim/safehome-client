import Image from "next/image";
import BellImage from "../../assets/images/icons/bell.svg";

import { createFetcher } from "../utils/fetchUtils";
import config from "../utils/config";
import queryKeys from "../utils/queryKeys";
import { useQuery } from "react-query";
import cn from "classnames";
import { useDataStore } from "../utils/store";

const FIVE_SECONDS = 1000 * 5;

function NotificationBell({ toggleNotifications, token }) {
  const dataStoreToken = useDataStore(
    (state) => state.data && state.data.token
  );

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [queryKeys.getMyNotificationStats, token || dataStoreToken],
    queryFn: createFetcher({
      url: config.apiPaths.getMyNotificationStats,
      method: "GET",
      auth: token || dataStoreToken,
    }),
    enabled: !!token || !!dataStoreToken,
    refetchInterval: FIVE_SECONDS,
  });

  return (
    <div
      onClick={toggleNotifications}
      className={
        "self-center hover:cursor-pointer relative " +
        cn({
          " animate-pulse ": isFetching,
        })
      }
    >
      <Image
        src={BellImage}
        width="48"
        height="48"
        priority
        alt="Notification Logo"
        className="w-[30px]  h-[30px] md:w-[40px] md:h-[40px] object-contain"
      />

      {isSuccess && data && data.unreadCount > 0 && (
        <span
          className={
            "border rounded-full border-[--text-brand] bg-[--text-brand] p-[0.125rem] md:p-1 inline-block absolute top-0 right-0 "
          }
        ></span>
      )}
    </div>
  );
}

export default NotificationBell;

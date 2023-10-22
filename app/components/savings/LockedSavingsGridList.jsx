import GoalSavingsCard from "./GoalSavingsCard";
import LoadingView from "../LoadingView";
import ErrorMessageView from "../ErrorMessageView";
import Pagination from "../Pagination";
import { useQuery } from "react-query";
import { createFetcher } from "../../utils/fetchUtils";
import config from "../../utils/config";
import queryKeys from "../../utils/queryKeys";
import { useState } from "react";
import MiniFetchStatusIndicator from "../MiniFetchStatusIndicator";
import NoSavings from "../investment/NoSavings";
import LockedSavings from "./LockedSavings";

function LockedSavingsGridList({
  token,
  launchCreateLockedPlan,
  setSelectedGoal,
  completed = false,
}) {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const searchParams = new URLSearchParams();

  if (filters.page) searchParams.append("page", filters.page);
  if (filters.limit) searchParams.append("limit", filters.limit);
  if (completed) searchParams.append("completed", completed);

  function setPageParam(page) {
    setFilters((prev) => ({ ...prev, page }));
  }

  const { data, isLoading, isError, isFetching, isSuccess, refetch } = useQuery(
    {
      queryKey: [queryKeys.getMyLockedSavings, completed, token],

      queryFn: createFetcher({
        url: config.apiPaths.getMyLockedSavings,
        method: "GET",
        auth: token,
        surfix: `?${searchParams.toString()}`,
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
          message="Something wrong while fetching your savings plans"
        />
      </div>
    );
  }

  if (isSuccess && data && data.unfilteredEntries === 0 && !completed) {
    return <NoSavings saveNowFunc={launchCreateLockedPlan} isLocked />;
  }

  if (isSuccess && data && data.unfilteredEntries === 0 && completed) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-xl text-[#C4C4C4] lg:text-2xl  ">
          You do not have any completed locked savings plan.
        </p>
      </div>
    );
  }

  if (isSuccess && data && data.entries === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-[#C4C4C4]">
          {" "}
          No savings plan found for the selected filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <MiniFetchStatusIndicator
        isFetching={isFetching}
        isLoading={isLoading}
        retry={refetch}
        isError={isError}
        isSuccess={isSuccess}
        successText={data ? `Showing ${data.numItems} of ${data.entries} ` : ""}
      />
      <div className="space-y-4 pt-4">
        {data.items.map((v, i) => {
          console.log(v);
          return <LockedSavings {...v} key={i} />;
        })}
      </div>

      <Pagination
        setPage={setPageParam}
        data={data}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  );
}

export default LockedSavingsGridList;

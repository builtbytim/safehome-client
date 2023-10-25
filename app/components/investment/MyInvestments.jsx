import { NoInvestment } from ".";
import { createFetcher } from "../../utils/fetchUtils";
import config from "../../utils/config";
import queryKeys from "../../utils/queryKeys";
import { useQuery } from "react-query";
import ErrorMessageView from "../ErrorMessageView";
import LoadingView from "../LoadingView";
import MyInvestmentCard from "./MyInvestmentCard";
import MiniFetchStatusIndicator from "../MiniFetchStatusIndicator";
import Pagination from "../Pagination";

function MyInvestments({
  token,
  setTabState,
  params,
  openInfo,
  completed = false,
  setParamsPage,
}) {
  const queryParams = new URLSearchParams();
  queryParams.append("page", params.page);
  queryParams.append("limit", params.limit);
  queryParams.append("ownersClub", params.ownersClub);

  const { isLoading, isError, refetch, data, isSuccess, error, isFetching } =
    useQuery({
      queryKey: [queryKeys.getMyInvestments, token, params, completed],
      queryFn: createFetcher({
        url: config.apiPaths.getMyInvestments,
        method: "GET",
        auth: token,
        surfix: `?includeAsset=true&completed=${completed}&${queryParams.toString()}`,
      }),

      enabled: !!token,
      keepPreviousData: true,
    });

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
          message="Something wrong while fetching your investments"
        />
      </div>
    );
  }

  if (
    isSuccess &&
    data &&
    data.entries === 0 &&
    completed &&
    (!params.ownersClub || params.ownersClub === "all")
  ) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-sm lg:text-base  text-[#C4C4C4] xl:text-lg  ">
          You do not have any completed investments
        </p>
      </div>
    );
  }

  if (isSuccess && data && data.unfilteredEntries === 0 && !completed) {
    return <NoInvestment investNowFunc={() => setTabState(1)} />;
  }

  if (isSuccess && data && data.entries === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-[#C4C4C4]">
          {" "}
          No investment matches your selected filters{" "}
        </p>
      </div>
    );
  }

  return (
    <>
      <MiniFetchStatusIndicator
        isFetching={isFetching}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        retry={refetch}
        successText={`Showing ${data?.numItems} of ${data?.entries}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 lg:max-h-[80vh]  overflow-y-auto scrollbar-fix  min-h-[80px] p-2 pb-2">
        {data.items.map((investment, index) => (
          <MyInvestmentCard
            openInfo={openInfo}
            key={index}
            investment={investment}
          />
        ))}
      </div>
      <Pagination
        setPage={setParamsPage}
        data={data}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  );
}

export default MyInvestments;

import InvestibleAssetCard from "./InvestibleAssetCard";
import ErrorMessageView from "../ErrorMessageView";
import LoadingView from "../LoadingView";
import Pagination from "../Pagination";

function AssetList({
  data,
  isLoading,
  refetch,
  isError,
  isSuccess,
  isFetching,
  error,
  openInfo,
  setParamsPage,
}) {
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
          message="Something wrong while fetching assets for you"
        />
      </div>
    );
  }

  if (isSuccess && data && data.unFilteredEntries === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-[#C4C4C4]">
          No assets available at this time, check back later
        </p>
      </div>
    );
  }

  if (isSuccess && data && data.entries === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-[#C4C4C4]">No assets matches the selected filters</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 lg:max-h-[80vh]  overflow-y-auto scrollbar-fix  min-h-[80px] p-2 pb-8">
        {data.items.map((item, index) => (
          <InvestibleAssetCard
            key={index}
            investibleAsset={item}
            openInfo={() => openInfo(item.uid)}
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

export default AssetList;

import { InvestmentCard } from ".";
import ErrorMessageView from "../ErrorMessageView";
import LoadingView from "../LoadingView";

function AssetList({
  data,
  isLoading,
  refetch,
  isError,
  isSuccess,
  error,
  openInfo,
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
        <p className="text-[#C4C4C4]">No assets available at this time</p>
      </div>
    );
  }

  if (isSuccess && data && data.entries === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-[#C4C4C4]">
          No assets found for the selected filters
        </p>
      </div>
    );
  }

  const investments = data.items;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 lg:max-h-[60vh]  overflow-y-auto scrollbar-fix pr-3 min-h-[80px]">
      {investments.map((investment, index) => (
        <InvestmentCard
          key={index}
          img={investment.img}
          title={investment.assetName}
          roi={investment.roi}
          price={investment.price}
          investors={investment.investorCount}
          pricePerUnit={investment.pricePerUnit}
          location={investment.location}
          units={investment.units}
          openInfo={() => openInfo(index)}
        />
      ))}
    </div>
  );
}

export default AssetList;

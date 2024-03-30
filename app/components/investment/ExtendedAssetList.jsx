import { createFetcher } from "../../utils/fetchUtils";
import config from "../../utils/config";
import queryKeys from "../../utils/queryKeys";
import { useQuery } from "react-query";
import ErrorMessageView from "../ErrorMessageView";
import LoadingView from "../LoadingView";
import MiniFetchStatusIndicator from "../MiniFetchStatusIndicator";
import Pagination from "../Pagination";
import LockableAssetCard from "./LockableAssetCard";

function ExtendedAssetList({ token, params, setParams, handleSubmit }) {
	function setParamsPage(page) {
		setParams({
			...params,
			page,
		});
	}

	const queryParams = new URLSearchParams();
	queryParams.append("page", params.page);
	queryParams.append("limit", params.limit);
	queryParams.append("ownersClub", params.ownersClub);

	const { isLoading, isError, refetch, data, isSuccess, isFetching } = useQuery(
		{
			queryKey: [queryKeys.getInvestmentAssets, token, params],
			queryFn: createFetcher({
				url: config.apiPaths.getInvestmentAssets,
				method: "GET",
				auth: token,
				surfix: `?${queryParams.toString()}`,
			}),

			enabled: !!token,
			keepPreviousData: true,
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
			<MiniFetchStatusIndicator
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
				isSuccess={isSuccess}
				retry={refetch}
				successText={`Showing ${data?.numItems} of ${data?.entries}`}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-4 xl:gap-8 h-full  overflow-y-auto scrollbar-fix  min-h-[80px] pt-3 p-1 pb-2">
				{data.items.map((item, index) => (
					<LockableAssetCard
						key={index}
						investibleAsset={item}
						onSelect={() => handleSubmit(item)}
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

export default ExtendedAssetList;

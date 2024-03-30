import cn from "classnames";

function TabSwitch({ tabItems, tabState, setTabState, extraClasses = "" }) {
	function isActive(tabId) {
		return tabId === tabState;
	}
	return (
		<div className="border-b flex  flex-no-wrap items-center scrollbar-fix text-center filter-container no-scrollbar max-w-[99%] font-semibold overflow-x-scroll overflow-y-hidden">
			{tabItems.map((v, i) => {
				return (
					<div
						onClick={() => {
							setTabState(i);

							if (v.handleClick) {
								v.handleClick();
							}
						}}
						key={i}
						className={`whitespace-nowrap tab-button-2 flex items-center gap-1
					${tabState === i ? "tab-button-active" : "tab-button-not-active"}`}
					>
						{v.img && (
							<div className="self-center inline-block">
								<v.img fill={isActive(i) ? "#ff9100" : "#9f9f9f"} />
							</div>
						)}
						<span className="group:hover:scale-[1.05] "> {v.name} </span>
					</div>
				);
			})}
		</div>
	);
}

export default TabSwitch;

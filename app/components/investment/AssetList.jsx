import React from "react";
import { InvestmentCard } from ".";

function AssetList({ investments, openInfo }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 lg:max-h-[60vh]  overflow-y-auto scrollbar-fix pr-3">
      {investments.map((investment, index) => (
        <InvestmentCard
          key={index}
          img={investment.img}
          title={investment.assetName}
          returns={investment.roi}
          value={investment.pricePerUnit}
          investors={investment.investorCount}
          location={investment.location}
          quantity={investment.units}
          openInfo={() => openInfo(index)}
        />
      ))}
    </div>
  );
}

export default AssetList;

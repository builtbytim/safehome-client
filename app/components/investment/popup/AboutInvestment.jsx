import React from "react";
import Image from "next/image";
import inv1 from "../../../../assets/images/investment/inv1.png";

const AboutInvestment = ({ data, investNowFunction }) => {
  return (
    <div>
      <div className="px-7 pb-8 space-y-8 text-[--text-secondary]">
        {/* <div className="py-3 px-7 space-y-2 text-[--text-secondary]">
					<h3 className="text-3xl text-[--text-brand] font-semibold">
						About Investment
					</h3>
					<p>Use the form below to purchase enough investment units.</p>
				</div> */}
        <div className="space-y-5">
          <div className="h-[250px] w-full">
            <Image
              src={inv1}
              alt={data.assetName}
              width={429}
              height={240}
              className="w-full h-full"
            />
          </div>
          <p className="pb-3">{data.about}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="h-[150px] w-full">
            <Image
              src={inv1}
              alt={data.assetName}
              width={429}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[150px] w-full">
            <Image
              src={inv1}
              alt={data.assetName}
              width={429}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[150px] w-full">
            <Image
              src={inv1}
              alt={data.assetName}
              width={429}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className=" bg-white px-7 py-9">
        <button
          className="w-full text-white bg-[--text-brand] py-3 px-5  rounded"
          onClick={() => investNowFunction()}
        >
          Invest Now
        </button>
      </div>
    </div>
  );
};

export default AboutInvestment;

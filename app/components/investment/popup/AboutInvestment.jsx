import React from "react";
import Image from "next/image";
import inv1 from "../../../../assets/images/investment/inv1.png";

import LandOwnersImage from "../../../../assets/images/LandOwnersClubImage.png";
import OfficeOwnersImage from "../../../../assets/images/OfficeOwnersClubImage.png";
import HomeOwnersImage from "../../../../assets/images/HomeOwnersClubImage.png";

const AboutInvestment = ({ data, investNowFunction }) => {
  const ownerClub = data.ownerClub;

  const img =
    ownerClub === "land_owners_club"
      ? LandOwnersImage
      : ownerClub === "office_owners_club"
      ? OfficeOwnersImage
      : HomeOwnersImage;

  return (
    <div>
      <div className="popup-px pb-8 space-y-8 text-[--text]">
        <div className="space-y-5">
          <div className="h-[250px] w-full">
            <Image
              src={img}
              alt={data.assetName}
              width={429}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="pb-3">{data.about}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="h-[150px] w-full">
            <Image
              src={img}
              alt={data.assetName}
              width={429}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[150px] w-full">
            <Image
              src={img}
              alt={data.assetName}
              width={429}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[150px] w-full">
            <Image
              src={img}
              alt={data.assetName}
              width={429}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {!data.soldOut && (
        <div className=" bg-white px-7 py-9">
          <button
            className="btn-1-v2 w-full  py-3 px-5  rounded"
            onClick={() => investNowFunction()}
          >
            Invest Now
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutInvestment;

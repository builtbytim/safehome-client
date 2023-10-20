import Image from "next/image";

import closeIcon from "../../../../assets/images/icons/closeIcon.svg";

const PopUpTopBar = ({ close, title, desc }) => {
  return (
    <div className=" bg-white ">
      <div className="px-5 flex justify-end items-center w-full h-[60px] lg:h-[80px]">
        <button
          className="p-[4px] border-2 border-[--lines] hover:bg-[--b1] transitioning rounded-full"
          onClick={() => close()}
        >
          <Image
            src={closeIcon}
            alt="close"
            priority
            width={24}
            height={24}
            className="object-contain w-[24px] h-[24px]"
          />
        </button>
      </div>
      {title && (
        <div className="pb-3 px-7 space-y-2 text-[--text-secondary]">
          <h3 className="text-3xl text-[--text-brand] font-semibold">
            {title}
          </h3>
          <p>{desc}</p>
        </div>
      )}
    </div>
  );
};

export default PopUpTopBar;

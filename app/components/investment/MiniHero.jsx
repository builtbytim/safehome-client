import Image from "next/image";
import verified from "../../../assets/images/icons/verified.png";
import { NumericFormat } from "react-number-format";

const MiniHero = ({ img, title, quantity, soldOut }) => {
  return (
    <div>
      <div className="w-full h-[250px] relative">
        <Image
          src={img}
          alt={title}
          width={"auto"}
          height={"auto"}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-between bg-[rgba(0,0,0,0.5)] px-5 py-5">
          <h2 className="text-white truncate capitalize font-semibold text-3xl w-[80%] py-2">
            {title}
          </h2>
          <div className="flex gap-4 justify-between items-center">
            {soldOut && (
              <div className="bg-white font-medium py-1 px-5 rounded">
                <span className="text-[--text-danger] font-semibold">
                  Sold Out
                </span>{" "}
              </div>
            )}
            {!soldOut && (
              <div className="bg-white font-medium py-1 px-5 rounded">
                <span className="text-[--text-brand] font-semibold">
                  Available Units:
                </span>{" "}
                <NumericFormat
                  value={quantity}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </div>
            )}
            <Image
              src={verified}
              alt={title}
              width={45}
              height={45}
              className="w-[45px] h-[45px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHero;

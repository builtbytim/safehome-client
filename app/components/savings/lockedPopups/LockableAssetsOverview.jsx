import Overlay2 from "../../Overlay2";
import { BsX } from "react-icons/bs";
import cn from "classnames";
import { useRef } from "react";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import ExtendedAssetList from "../../investment/ExtendedAssetList";
import useBodyScrollLock from "../../../utils/hooks/useBodyScrollLock";
import ClubOwnersFilter from "../../investment/ClubOwnersFilter";
import { useState } from "react";

function LockableAssetsOverview({
  goBack,
  handleSubmit,
  formData,
  show,
  token,
}) {
  const ref = useRef(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ownersClub: "all",
  });

  function setOwnersClubFilter(v) {
    return () => {
      setParams({
        ...params,
        ownersClub: v,
        page: 1,
      });
    };
  }

  useBodyScrollLock(true);

  useOutsideClickDetector(ref, () => {
    if (show) {
      goBack();
    }
  });

  return (
    <Overlay2 skipWrapper z={3}>
      <section
        ref={ref}
        className={
          "px-4  fixed pt-6  inset-y-0 mx-auto flex flex-col justify-center items-center w-full lg:w-[80%]   right-0 left-0    bg-white md:min-h-[95vh] h-[100vh] z-40  "
        }
      >
        <div className="h-full pb-8 space-y-2  max-w-full">
          <div className="space-y-2 ">
            <div className="flex flex-row justify-between items-center">
              <div className=" flex flex-row justify-start space-x-4 lg:space-x-6 items-center">
                <h1 className="font-bold whitespace-nowrap  text-[--color-brand] text-lg md:text-xl">
                  Choose property
                </h1>

                <input
                  type="text"
                  className="px-2 pl-4 text-sm outline-none focus:border-[--invert] placeholder:text-[--placeholder] rounded-brand py-1 border self-center"
                  placeholder="Search assets..."
                />
              </div>
              <div
                className="p-1 border  rounded-full hover:bg-[--b1] cursor-pointer"
                onClick={goBack}
              >
                <BsX
                  role="button"
                  className="text-2xl lg:text-2xl  rounded-full text-[--primary] transitioning"
                />
              </div>
            </div>
            <ClubOwnersFilter
              setOwnerFilter={setOwnersClubFilter}
              ownersClub={params.ownersClub}
            />
          </div>

          <div className="max-h-[85vh] min-h-[85vh] no-scrollbar overflow-y-auto">
            <ExtendedAssetList
              setParams={setParams}
              params={params}
              token={token}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
    </Overlay2>
  );
}

export default LockableAssetsOverview;

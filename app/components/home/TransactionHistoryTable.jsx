import Image from "next/image";
import ArrowDownRed from "../../../assets/images/icons/arrow-down.svg";

function TransactionHistoryTable() {
  return (
    <section>
      {/* For Mobile */}

      <div className=" md:hidden overflow-auto max-h-[482px]">
        {Array(10)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-start space-y-2 border-b border-[#e2e2e2] py-4"
            >
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex max-w-[50%] flex-row justify-center items-center space-x-2 truncate">
                  <div className="bg-[#FFE5E5] flex-1 p-2 rounded-full border border-transparent">
                    <Image
                      src={ArrowDownRed}
                      alt="arrow down"
                      width="24"
                      height="24"
                      className="object-contain w-[24px] h-[24px] "
                    />
                  </div>

                  <div className="flex  flex-col justify-center items-start space-y-1">
                    <span className="text-[--color-brand-2] truncate text-sm">
                      UYUUGEVUVYVUYTGJ
                    </span>
                    <span className="text-[--text-danger] text-sm">
                      {" "}
                      Withdrawal
                    </span>
                  </div>
                </div>

                <div className="flex px-2 flex-col justify-center items-end space-y-1">
                  <span className="text-[--text-secondary] font-semibold text-sm">
                    {" "}
                    ₦1,000,000{" "}
                  </span>
                  <span className="text-[--placeholder] text-xs">
                    10/01/2023 - 09:28AM
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* For Desktops  */}
      <div className="hidden md:block overflow-auto max-h-[482px]">
        <table className="w-full table text-[--text-secondary] font-normal ">
          <thead className="w-full">
            <tr className="table-row w-full ">
              <th className=" text-left  whitespace-nowrap"> Date & Time </th>
              <th className=" text-left  px-6 whitespace-nowrap">
                Transaction Type
              </th>
              <th className=" text-left  px-6 whitespace-nowrap">Amount</th>
              <th className=" text-left  px-6 whitespace-nowrap">Reference </th>
            </tr>
          </thead>

          <tbody>
            {Array(10)
              .fill()
              .map((_, i) => (
                <tr key={i} className="table-row text-left text-sm">
                  <td className="py-4  text-left">10 January 2023, 09:20:58</td>
                  <td className="text-left px-6"> Withdraw </td>
                  <td className="text-left px-6">₦1,000,000</td>
                  <td className="text-left px-6">
                    {" "}
                    UYUUGEVUVYVTYFYU#UGEYF&*YG#YUVEYVYU{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TransactionHistoryTable;

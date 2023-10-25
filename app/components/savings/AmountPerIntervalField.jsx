import { FaNairaSign } from "react-icons/fa6";
import FormattingField from "../forms/branded/FormattingField";
import { useEffect, useRef } from "react";
import { useField, ErrorMessage } from "formik";
import { timeIntervalsToSeconds } from "../../utils/constants";
import { NumericFormat } from "react-number-format";

export function AmountPerIntervalField({
  startDate,
  withdrawalDate,
  preferredInterval,
  goalAmount,
  errors,
}) {
  const field = useField("amountToSaveOnIntervalBasis");
  const setValue = field[2].setValue;

  let suggestedAmt = useRef(null);

  function calcAmount(
    startDate,
    withdrawalDate,
    preferredInterval,
    goalAmount,
    errors
  ) {
    // calculate the amount to pay on interval using the preferredInterval, startDate and withdrawalDate
    if (errors.startDate || errors.withdrawalDate) return 0;

    const _startDate = new Date(startDate);
    const _withdrawalDate = new Date(withdrawalDate);

    const timeDiff = _withdrawalDate.getTime() - _startDate.getTime();

    const preferredIntervalInSeconds =
      timeIntervalsToSeconds[preferredInterval];

    const numberOfIntervals = timeDiff / (preferredIntervalInSeconds * 1000);

    const amountToSaveOnIntervalBasisCalculated = Math.ceil(
      goalAmount / numberOfIntervals
    );

    return amountToSaveOnIntervalBasisCalculated;
  }

  useEffect(() => {
    const amountToSaveOnIntervalBasisCalculated = calcAmount(
      startDate,
      withdrawalDate,
      preferredInterval,
      goalAmount,
      errors
    );

    suggestedAmt.current = amountToSaveOnIntervalBasisCalculated;
  }, [startDate, withdrawalDate, preferredInterval, errors, goalAmount]);

  return (
    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
      <label
        htmlFor="amountToSaveOnDailyBasis"
        className="text-[--text-secondary] font-medium text-sm text-left"
      >
        Preferred amount to save on interval basis
        {suggestedAmt.current > 0 && (
          <div className="">
            <button
              type="button"
              className="text-[--text-primary] border border-[--lines]  text-xs font-normal p-1 px-2 rounded-brand bg-[--lines]"
              onClick={() => setValue(suggestedAmt.current)}
            >
              Suggested:{" "}
              <NumericFormat
                value={suggestedAmt.current}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦ "}
              />
            </button>
          </div>
        )}
      </label>

      <FormattingField
        icon={FaNairaSign}
        type="text"
        inputMode="numeric"
        className="field-1"
        name="amountToSaveOnIntervalBasis"
        placeholder="Amount to save on interval basis"
        extraClasses="field-1"
      />

      <ErrorMessage
        name="amountToSaveOnIntervalBasis"
        component="div"
        className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left"
      />
    </div>
  );
}

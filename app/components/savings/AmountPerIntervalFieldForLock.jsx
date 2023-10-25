import { FaNairaSign } from "react-icons/fa6";
import FormattingField from "../forms/branded/FormattingField";
import { useEffect } from "react";
import { useField, ErrorMessage } from "formik";
import { timeIntervalsToSeconds } from "../../utils/constants";

export function AmountPerIntervalFieldForLock({
  lockDurationInMonths,
  preferredInterval,
  amountToLock,
  errors,
}) {
  const field = useField("amountToSaveOnIntervalBasis");
  const setValue = field[2].setValue;
  const value = field[0].value;
  const setError = field[2].setError;
  const error = field[1].error;

  function calcAmount(
    lockDurationInMonths,
    preferredInterval,
    amountToLock,
    errors
  ) {
    // calculate the amount to pay on interval using the preferredInterval, startDate and withdrawalDate
    if (errors.amountToLock || errors.preferredInterval) return 0;

    const _startDate = new Date();

    const _withdrawalDate = new Date(_startDate);

    _withdrawalDate.setMonth(_startDate.getMonth() + lockDurationInMonths);

    const timeDiff = _withdrawalDate.getTime() - _startDate.getTime();

    const preferredIntervalInSeconds =
      timeIntervalsToSeconds[preferredInterval];

    const numberOfIntervals = timeDiff / (preferredIntervalInSeconds * 1000);

    const amountToSaveOnIntervalBasisCalculated = Math.ceil(
      amountToLock / numberOfIntervals
    );

    return amountToSaveOnIntervalBasisCalculated;
  }

  useEffect(() => {
    const amountToSaveOnIntervalBasisCalculated = calcAmount(
      lockDurationInMonths,
      preferredInterval,
      amountToLock,
      errors
    );

    if (amountToSaveOnIntervalBasisCalculated > value) {
      setError(
        `Amount must be at least ₦ ${amountToSaveOnIntervalBasisCalculated}`
      );
    } else {
      if (error) setError(null);
    }
  }, [value]);

  useEffect(() => {
    const amountToSaveOnIntervalBasisCalculated = calcAmount(
      lockDurationInMonths,
      preferredInterval,
      amountToLock,
      errors
    );

    setValue(amountToSaveOnIntervalBasisCalculated, true);
  }, [lockDurationInMonths, preferredInterval, errors, amountToLock]);

  return (
    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
      <label
        htmlFor="amountToSaveOnDailyBasis"
        className="text-[--text-secondary] font-medium text-sm text-left"
      >
        Preferred amount to save on interval basis
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

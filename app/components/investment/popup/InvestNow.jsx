"use client";

import GenericSelectFieldVariant1 from "../../forms/branded/GenericSelectFieldVariant1";
import { FaNairaSign } from "react-icons/fa6";
import FormattingField from "../../forms/branded/FormattingField";
import { NumericFormat } from "react-number-format";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MiniSwitch from "../../MiniSwitch";
import { createFetcher } from "../../../utils/fetchUtils";
import { useMutation, useQueryClient } from "react-query";
import { useNotifyStore, useUiStore } from "../../../utils/store";
import config from "../../../utils/config";
import queryKeys from "../../../utils/queryKeys";
import Spinner from "../../Spinner";
import { useRouter } from "next/navigation";
import useUserWallet from "../../../utils/hooks/useUserWallet";

const fundingSources = [
  {
    name: "Wallet",
    value: "wallet",
  },
  {
    name: "Bank",
    value: "bank",
  },
];

const InvestNow = ({ data, token, closeSelf, userAlreadyInvested }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setNotify = useNotifyStore((state) => state.setNotify);
  const toggleSuperOverlay = useUiStore((state) => state.toggleSuperOverlay);

  const { data: walletData, isSuccess: walletSuccess } = useUserWallet(
    token,
    null,
    null,
    true
  );

  function onSuccess(data, vars) {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.getWallet],
    });

    queryClient.invalidateQueries({
      queryKey: [queryKeys.getTransactions, token],
    });

    queryClient.invalidateQueries({
      queryKey: [queryKeys.getInvestmentAssets],
    });

    queryClient.invalidateQueries({
      queryKey: [queryKeys.getMyInvestments],
    });

    queryClient.invalidateQueries({
      queryKey: [queryKeys.getInvestmentStats],
    });
    closeSelf();

    if (vars.fundSource === fundingSources[1].value) {
      toggleSuperOverlay(true);
      window.location.href = data.redirectUrl;
    } else {
      setNotify({
        show: true,
        content: "Your investment was executed successfully.",
        allowClose: true,
      });
    }
  }

  function onError(err) {
    const action = err.action;

    switch (action) {
      case "VERIFY_KYC":
        setNotify({
          show: true,
          title: "KYC verification is required",
          content: err?.message,
          allowClose: true,
          onAcceptText: "Verify Now",
          onAccept: () => {
            router.push(`/kyc`);
          },
        });

        break;

      case "FUND_ACCOUNT":
        setNotify({
          show: true,
          title: "Insufficient balance",
          content: err?.message,
          allowClose: true,
          onAcceptText: "Add fund",
          onAccept: () => {
            router.push(`/?action=fund`);
          },
        });

        break;

      default:
        setNotify({
          show: true,
          title: "Unable to create investment",
          content: err?.message,
          allowClose: true,
        });
        reset();
        break;
    }
  }

  const { mutate, isLoading, reset } = useMutation({
    onSuccess,
    onError,
    mutationFn: createFetcher({
      url: config.apiPaths.createInvestment,
      method: "POST",
      auth: token,
    }),
    mutationKey: [queryKeys.createInvestment, token],
  });

  async function handleSubmit(values) {
    if (isLoading) return;

    const body = {
      fundSource: values.fundSource,
      units: values.units,
      assetUid: data.uid,
      reinvesting: userAlreadyInvested,
    };

    mutate(body);
  }

  return (
    <div className="popup-px pb-8 space-y-8 text-[--text] overflow-x-hidden">
      <div className="flex justify-between gap-5">
        <p className="text-xl truncate leading-[1.65rem] max-h-[3.3rem] font-semibold capitalize text-[--text] ">
          {data.assetName}
        </p>
        <div className="text-right">
          <p className="text-[--highlight] leading-[1.65rem] whitespace-nowrap font-semibold text-xl">
            <NumericFormat
              value={data.pricePerUnit}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦ "}
            />
          </p>
          <p className="">Per unit</p>
        </div>
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          amount: "",
          fundSource: fundingSources[0].value,
          units: "",
          acceptTerms: false,
        }}
        initialTouched={{
          acceptTerms: true,
          fundSource: true,
        }}
        validationSchema={Yup.object().shape({
          amount: Yup.number()
            .required("Amount is required")
            .moreThan(0, "Amount must be greater than 0")
            .typeError("Amount must be a number"),
          fundSource: Yup.string()
            .required("Funding Source is required")
            .oneOf(fundingSources.map((item) => item.value)),
          units: Yup.number()
            .required("Units is required")
            .moreThan(0, "Units must be greater than 0")
            .integer("Decimal values are not allowed")
            .max(
              data.availableUnits,
              `There are only ${data.availableUnits} units available`
            )
            .typeError("Units must be a number"),
          acceptTerms: Yup.boolean().isTrue(
            "You must accept the terms and conditions to continue"
          ),
        })}
      >
        {({ isValid, setFieldValue, values }) => {
          return (
            <Form className="space-y-7">
              <div className="relative">
                <p className="form-text">How many units?</p>

                <div className="relative">
                  <FormattingField
                    type="text"
                    inputMode="numeric"
                    placeholder="Total number of units"
                    name="units"
                    extraClasses="field-1"
                    customOnChange={(value) => {
                      setFieldValue("amount", value * data.pricePerUnit, true);
                    }}
                  />

                  <button
                    type="button"
                    role="button"
                    onClick={() => {
                      setFieldValue("units", data.availableUnits, true);
                      setFieldValue(
                        "amount",
                        data.availableUnits * data.pricePerUnit,
                        true
                      );
                    }}
                    className="text-[--text] absolute right-2 top-[50%] translate-y-[-50%] self-center text-xs  py-1 px-2 transitioning border border-[--placeholder] rounded-brand hover:cursor-pointer hover:bg-[--lines] flex flex-row justify-center items-center space-x-1"
                  >
                    MAX
                  </button>
                </div>

                <ErrorMessage
                  name="units"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>
              <div className="relative">
                <p className="form-text">Amount to pay</p>

                <FormattingField
                  icon={FaNairaSign}
                  type="text"
                  inputMode="numeric"
                  placeholder="Amount auto-generates due to units."
                  name="amount"
                  extraClasses="field-1"
                  disabled
                />

                <ErrorMessage
                  name="amount"
                  component="div"
                  className="absolute -bottom-[20%] left-0 text-[--text-danger] text-xs text-left"
                />

                {walletSuccess && (
                  <span className="text-xs font-light text-[green]">
                    Your balance:{" "}
                    <NumericFormat
                      value={walletData.balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦ "}
                    />
                  </span>
                )}
              </div>
              <div className="relative">
                <p className="form-text">Fund Source</p>
                <GenericSelectFieldVariant1
                  defaultSelectedItem={fundingSources[0]}
                  handleChange={({ selectedItem }) => {
                    setFieldValue("fundSource", selectedItem.value, true);
                  }}
                  items={fundingSources}
                />

                <ErrorMessage
                  name="fundSource"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>

              <div className="relative">
                <div className="flex gap-3 ">
                  <MiniSwitch
                    onChange={(v) => {
                      setFieldValue("acceptTerms", !values.acceptTerms, true);
                    }}
                  />
                  <p>
                    I hereby acknowledge and authorize SafeHome to invest my
                    funds into the designated property. This authorization
                    signifies my approval for SafeHome to proceed with the
                    investment on my behalf, adhering to the agreed terms and
                    conditions.
                  </p>
                </div>

                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="absolute pt-2 left-0 text-[--text-danger] text-xs text-left"
                />
              </div>

              <div className="py-5">
                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className="btn-1-v2 w- hover:bg  py-3 px-5 shadow rounded"
                >
                  {isLoading ? <Spinner /> : "Invest Now"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InvestNow;

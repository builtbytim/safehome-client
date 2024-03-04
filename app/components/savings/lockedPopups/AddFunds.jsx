import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import { Form, Formik, ErrorMessage } from "formik";
import GenericSelectFieldVariant1 from "../../forms/branded/GenericSelectFieldVariant1";
import { FaNairaSign } from "react-icons/fa6";

import FormattingField from "../../forms/branded/FormattingField";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { createFetcher } from "../../../utils/fetchUtils";
import config from "../../../utils/config";
import queryKeys from "../../../utils/queryKeys";
import { useUiStore, useNotifyStore } from "../../../utils/store";
import Spinner from "../../Spinner";
import useUserWallet from "../../../utils/hooks/useUserWallet";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";

const fundSources = [
  {
    name: "Wallet",
    value: "wallet",
  },
  {
    name: "Bank",
    value: "bank",
  },
];

function AddFunds({ closeSelf, closeAll, token, selectedLockedPlan }) {
  const queryClient = useQueryClient();

  const router = useRouter();

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
      queryKey: [queryKeys.getTransactions],
    });

    queryClient.invalidateQueries({
      queryKey: [queryKeys.getMyLockedSavings],
    });

    queryClient.invalidateQueries({
      queryKey: [queryKeys.getSavingsStats],
    });

    closeAll();

    if (vars.fundSource === fundSources[1].value) {
      toggleSuperOverlay(true);
      window.location.href = data.redirectUrl;
    } else {
      setNotify({
        show: true,
        content:
          "You have successfully added funds to your investment savings.",
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
          title: "KYC is required",
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
          title: "Unable to fund savings",
          content: err?.message,
          allowClose: true,
        });
        reset();
        break;
    }
  }

  const { mutate, isLoading, reset } = useMutation({
    mutationKey: [queryKeys.fundLockedSavings, token],
    mutationFn: createFetcher({
      url: config.apiPaths.fundLockedSavings,
      method: "POST",
      auth: token,
    }),
    onError,
    onSuccess,
  });

  function handlePayNow(values) {
    if (isLoading) return;

    mutate({
      amountToAdd: values.amountToAdd,
      fundSource: values.fundingSource,
      savingsId: selectedLockedPlan.uid,
    });
  }

  return (
    <Overlay2 z={3}>
      <section
        className={
          "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40 "
        }
      >
        <div className="flex p-6 flex-row justify-end items-center">
          <div
            onClick={closeSelf}
            className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning"
          >
            <BiX className="text-[--primary] text-3xl" />
          </div>
        </div>

        <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[85vh] pb-32">
          <div className="px-6">
            <h1 className="font-bold  text-[--color-brand] text-lg md:text-xl">
              Add Funds
            </h1>
            <p className="text-[--primary] font-medium text-sm pt-2">
              Instantly add funds to this savings goal
            </p>
          </div>

          <Formik
            initialValues={{
              amountToAdd: "",
              fundingSource: fundSources[0].value,
            }}
            initialTouched={{
              fundingSource: true,
            }}
            validationSchema={Yup.object().shape({
              amountToAdd: Yup.string()
                .required("Amount is required")
                .typeError("Amount must be a number")
                .min(1, "Amount must be greater than 0"),
              fundingSource: Yup.string()
                .required("Funding source is required")
                .oneOf(
                  fundSources.map((item) => item.value),
                  "Invalid funding source"
                ),
            })}
            onSubmit={handlePayNow}
          >
            {({ isValid, setFieldValue }) => {
              return (
                <Form className="space-y-6 p-6  ">
                  <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                    <label
                      htmlFor="amountToAdd"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      Amount to add
                    </label>

                    <FormattingField
                      icon={FaNairaSign}
                      name="amountToAdd"
                      type="text"
                      inputMode="numeric"
                      className="field-1"
                      placeholder="Amount to add"
                      extraClasses="field-1"
                    />

                    <ErrorMessage
                      name="amountToAdd"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
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

                  <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                    <label
                      htmlFor="fundingSource"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      Funding Source
                    </label>

                    <GenericSelectFieldVariant1
                      defaultSelectedItem={fundSources[0]}
                      handleChange={({ selectedItem }) => {
                        setFieldValue(
                          "fundingSource",
                          selectedItem.value,
                          true
                        );
                      }}
                      items={fundSources}
                    />

                    <ErrorMessage
                      name="fundingSource"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="absolute w-[90%]  inset-x-0 bottom-4  flex flex-col justify-center items-center  mx-auto">
                    <button
                      type="submit"
                      disabled={!isValid || isLoading}
                      className="btn-1 w-full bg-[--color-brand]  "
                    >
                      {isLoading ? <Spinner /> : "Add Funds"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </Overlay2>
  );
}

export default AddFunds;

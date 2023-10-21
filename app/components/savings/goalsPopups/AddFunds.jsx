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

function AddFunds({ closeSelf, token, selectedGoal }) {
  const queryClient = useQueryClient();

  const setNotify = useNotifyStore((state) => state.setNotify);
  const toggleSuperOverlay = useUiStore((state) => state.toggleSuperOverlay);

  function onSuccess(data, vars) {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.getWallet],
    });

    queryClient.invalidateQueries({
      queryKey: [queryKeys.getTransactions],
    });

    queryClient.invalidateQueries({
      queryKey: [queryKeys.getMyGoalSavings],
    });

    closeSelf();

    if (vars.fundSource === fundSources[1].value) {
      toggleSuperOverlay(true);
      window.location.href = data.redirectUrl;
    } else {
      setNotify({
        show: true,
        content: "You have successfully added funds to your savings goal.",
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
    mutationKey: [queryKeys.fundGoalSavings, token],
    mutationFn: createFetcher({
      url: config.apiPaths.fundGoalSavings,
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
      goalSavingsId: selectedGoal.uid,
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
            <BiX className="text-[--primary] text-2xl" />
          </div>
        </div>

        <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[85vh] pb-32">
          <div className="px-6">
            <h1 className="font-bold  text-[--text-brand-2] text-lg md:text-xl">
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
                      className="btn-1 w-full bg-[--text-brand-2] hover:bg-[--text-brand-2-hover] "
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

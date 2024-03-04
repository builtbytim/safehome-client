"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import queryKeys from "../../../utils/queryKeys";
import { FaNairaSign } from "react-icons/fa6";
import GenericComboField from "../../forms/branded/GenericComboxField";
import { createFetcher } from "../../../utils/fetchUtils";
import { useNotifyStore } from "../../../utils/store";
import { useMutation, useQuery, useQueryClient } from "react-query";
import config from "../../../utils/config";
import Spinner from "../../Spinner";
import FormattingField from "../../forms/branded/FormattingField";
import useUserWallet from "../../../utils/hooks/useUserWallet";
import { useRouter } from "next/navigation";
import ErrorMessageView from "../../ErrorMessageView";
import LoadingView from "../../LoadingView";
import { NumericFormat } from "react-number-format";

const Withdraw = ({ token, closeSelf }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setNotify = useNotifyStore((state) => state.setNotify);
  const {
    isLoading: getBankAccountsLoading,
    isError: getBankAccountsError,
    refetch: getBankAccountsRefetch,
    data: getBankAccountsData,
    isSuccess: getBankAccountsSuccess,
  } = useQuery({
    queryKey: [queryKeys.getBankAccounts, token],
    queryFn: createFetcher({
      url: config.apiPaths.getBankAccounts,
      method: "GET",
      auth: token,
    }),

    enabled: !!token,
  });

  const {
    data: walletData,
    isLoading: walletLoading,
    isSuccess: walletSuccess,
    isError: walletError,
    refetch: walletRefetch,
  } = useUserWallet(token, null, null, getBankAccountsSuccess);

  function onSuccess(data) {
    queryClient.invalidateQueries({ queryKey: [queryKeys.getWallet, token] });

    closeSelf();

    setNotify({
      show: true,
      content:
        "Withdrawal initiated successfully, you will be notified when it is completed.",
      allowClose: true,
    });
  }

  function onError(err) {
    const action = err.action;

    switch (action) {
      case "VERIFY_KYC":
        setNotify({
          show: true,
          title: "KYC is required",
          content: err?.message,
          onAcceptText: "Verify Now",
          allowClose: true,

          onAccept: () => {
            router.push(`/kyc`);
          },
        });

        break;

      default:
        setNotify({
          show: true,
          title: "Unable to withdraw",
          content: err?.message,
        });

        break;
    }
  }

  const { mutate, isLoading } = useMutation({
    onSuccess,
    onError,
    mutationFn: createFetcher({
      url: config.apiPaths.initiateWithdrawal,
      method: "POST",
      auth: token,
    }),

    mutationKey: [queryKeys.initiateTopUp, token],
  });

  async function handleSubmit(values) {
    if (isLoading) return;

    const body = {
      amount: values.amount,
      bankId: values.destinationBankAccount,
    };

    mutate(body);
  }

  function navigateToBankAccount() {
    closeSelf();

    router.push("/account/payments?tab=1");
  }

  return (
    <div className="px-7 flex flex-col justify-between w-full h-full ">
      {(walletLoading || getBankAccountsLoading) && (
        <div className="flex h-[50vh] justify-center items-center  w-full">
          <LoadingView />
        </div>
      )}

      {walletError && (
        <div className="flex h-[50vh] justify-center items-center  w-full">
          <ErrorMessageView
            message="Something went wrong while fetching your wallet."
            refetch={walletRefetch}
          />
        </div>
      )}

      {getBankAccountsError && (
        <div className="flex h-[50vh] justify-center items-center  w-full">
          <ErrorMessageView
            refetch={getBankAccountsRefetch}
            message="Something went wrong while fetching your bank accounts."
          />
        </div>
      )}

      {walletSuccess &&
        getBankAccountsSuccess &&
        getBankAccountsData &&
        getBankAccountsData.length == 0 && (
          <div className="flex h-[50vh] justify-center items-center  w-full">
            <ErrorMessageView
              message="You have no bank account linked to your SafeHome. Please add a bank account"
              refetch={navigateToBankAccount}
              buttonText="Add Bank Account"
            />
          </div>
        )}

      {walletSuccess &&
        getBankAccountsSuccess &&
        getBankAccountsData &&
        getBankAccountsData.length > 0 && (
          <Formik
            validationSchema={Yup.object().shape({
              amount: Yup.number()
                .required("Please enter an amount")
                .positive("Please enter an amount greater than 0")
                .max(walletData.balance, "Insufficient funds")
                .typeError("Please enter a valid amount"),

              destinationBankAccount: Yup.string()
                .required("Please select a bank account")
                .oneOf(getBankAccountsData.map((acct) => acct.uid)),
            })}
            onSubmit={handleSubmit}
            initialTouched={{
              destinationBankAccount: true,
            }}
            initialValues={{
              amount: "",
              destinationBankAccount: "",
            }}
          >
            {({ isValid, setFieldValue }) => {
              return (
                <Form className="space-y-10">
                  <div className="relative">
                    <p className="account-form-text">Amount to Withdraw</p>
                    <FormattingField
                      icon={FaNairaSign}
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter amount"
                      name="amount"
                      extraClasses="field-1"
                    />

                    <ErrorMessage
                      name="amount"
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

                  <div className="relative">
                    <p className="form-text"> Destination Bank Account</p>
                    <GenericComboField
                      defaultSelectedItem={getBankAccountsData[0]}
                      items={getBankAccountsData.map((acct) => ({
                        name: ` ${acct.bankName}  -  ${acct.accountName}`,
                        value: acct.uid,
                      }))}
                      handleChange={({ selectedItem }) => {
                        setFieldValue(
                          "destinationBankAccount",
                          selectedItem.value
                        );
                      }}
                      type="text"
                      placeholder="Select Bank"
                      className="field-1"
                    />

                    <ErrorMessage
                      name="destinationBankAccount"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="py-8">
                    <button
                      type="submit"
                      disabled={!isValid || isLoading}
                      className="btn-1 w-full text-white bg-[--color-brand] py-3 px-5 shadow rounded"
                    >
                      {isLoading ? <Spinner size="mini" /> : "Continue"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
    </div>
  );
};

export default Withdraw;

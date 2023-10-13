"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import queryKeys from "../../../utils/queryKeys";
import { FaNairaSign } from "react-icons/fa6";
import {
  fetchUtil,
  makeUrl,
  extractErrorMessage,
} from "../../../utils/fetchUtils";
import { useNotifyStore } from "../../../utils/store";
import { useMutation, useQueryClient } from "react-query";
import config from "../../../utils/config";
import Spinner from "../../Spinner";
import FormattingField from "../../forms/branded/FormattingField";

const Topup = ({ token, closeSelf }) => {
  const queryClient = useQueryClient();
  const setNotify = useNotifyStore((state) => state.setNotify);

  function onSuccess(data) {
    queryClient.invalidateQueries({ queryKey: [queryKeys.getWallet, token] });

    closeSelf();
    window.location.href = data.redirectUrl;
  }

  function onError(err) {
    closeSelf();

    setNotify({
      show: true,
      content: err.message,
      allowClose: true,
    });
  }

  const { mutate, isLoading } = useMutation({
    onSuccess,
    onError,
    mutationFn: async function (body) {
      const res = await fetchUtil({
        url: makeUrl(config.apiPaths.initiateTopUp),
        method: "POST",
        body,
        auth: token,
      });

      if (!res.success) {
        throw new Error(extractErrorMessage(res));
      }

      return res.data;
    },
    mutationKey: [queryKeys.initiateTopUp, token],
  });

  async function handleSubmit(values) {
    if (isLoading) return;

    const body = {
      amount: values.amount,
    };

    mutate(body);
  }

  return (
    <div className="px-7 flex flex-col justify-between w-full h-full ">
      <Formik
        validationSchema={Yup.object().shape({
          amount: Yup.number()
            .required("Please enter an amount")
            .positive("Please enter an amount greater than 0")
            .typeError("Please enter a valid amount"),
        })}
        onSubmit={handleSubmit}
        initialValues={{
          amount: "",
        }}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-10">
              <div className="relative">
                <p className="account-form-text">Amount to Add</p>
                <FormattingField
                  icon={FaNairaSign}
                  type="text"
                  inputMode="numeric"
                  placeholder="XXXXXXXX"
                  name="amount"
                  extraClasses="field-1"
                />

                <ErrorMessage
                  name="amount"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>

              <div className="py-8">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn-1 w-full text-white bg-[--color-brand] py-3 px-5 shadow rounded"
                >
                  {isLoading ? <Spinner /> : "Continue"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Topup;

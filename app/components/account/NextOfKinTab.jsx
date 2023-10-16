"use client";

import GenericSelectField from "../forms/branded/GenericSelectField";
import { relationshipTypes } from "../../utils/constants";
import { parsePhoneNumber } from "awesome-phonenumber";
import BarLoader from "../BarLoader";
import SwitchField from "../forms/branded/SwitchField";
import Spinner from "../Spinner";
import {
  fetchUtil,
  makeUrl,
  extractErrorMessage,
} from "../../utils/fetchUtils";
import { useMutation, useQueryClient, useQuery } from "react-query";
import queryKeys from "../../utils/queryKeys";
import config from "../../utils/config";
import { useNotifyStore } from "../../utils/store";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMessageView from "../ErrorMessageView";
import LoadingView from "../LoadingView";

const yupSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),

  lastName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),

  phone: Yup.string()
    .required("Required")
    .min(10, "Must be 10 characters or more")
    .test("phone-is-valid", "Invalid phone number", function (value) {
      const result = parsePhoneNumber(value, { regionCode: "NG" });
      return result.valid;
    }),

  relationship: Yup.string()
    .required("Required")
    .min(2, "Invalid relationship type")
    .oneOf(
      relationshipTypes.map((item) => item.value),
      "Invalid relationship type"
    ),

  email: Yup.string().required("Required").email("Invalid email address"),
});

const NextOfKinTab = ({ token }) => {
  const setNotify = useNotifyStore((state) => state.setNotify);
  const queryClient = useQueryClient();

  function onSuccess(data) {
    queryClient.invalidateQueries({ queryKey: [queryKeys.getNextOfKin] });

    setNotify({
      show: true,
      content: "Your next of kin has been updated successfully",
      allowClose: false,
      onAcceptText: "Ok",
      onAccept: () => {},
    });
  }

  function onError(err) {
    setNotify({
      show: true,
      content: err.message,
      allowClose: true,
    });
  }

  const {
    data,
    isLoading: loadingData,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.getNextOfKin, token],

    queryFn: async function () {
      const res = await fetchUtil({
        url: makeUrl(config.apiPaths.getNextOfKin),
        method: "GET",
        auth: token,
      });

      if (!res.success) {
        throw new Error(extractErrorMessage(res));
      }

      return res.data;
    },
  });

  const { mutate, isLoading } = useMutation({
    onSuccess,
    onError,
    mutationFn: async function (body) {
      const res = await fetchUtil({
        url: makeUrl(config.apiPaths.setNextOfKin),
        method: "POST",
        body,
        auth: token,
      });

      if (!res.success) {
        throw new Error(extractErrorMessage(res));
      }

      return res.data;
    },
    mutationKey: [queryKeys.setNextOfKin, token],
  });

  async function handleSubmit(values) {
    if (isLoading) return;

    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      relationship: values.relationship,
      email: values.email,
      replace: values.allowEdits,
    };

    mutate(body);
  }

  return (
    <div className="py-7 space-y-7 font-medium relative">
      {loadingData && (
        <div className="flex h-[50vh] justify-center items-center  w-full">
          <LoadingView />
        </div>
      )}

      {isError && (
        <div className="flex h-[50vh] justify-center items-center  w-full">
          <ErrorMessageView
            refetch={refetch}
            message="Something went wrong while trying to fetch your next of kin info"
          />
        </div>
      )}

      {isSuccess && (
        <Formik
          initialValues={{
            firstName: data ? data.firstName : "",
            lastName: data ? data.lastName : "",
            phone: data ? data.phone : "",
            relationship: data ? data.relationship : "",
            email: data ? data.email : "",
            allowEdits: data ? false : true,
          }}
          initialTouched={{
            relationship: true,
            allowEdits: true,
          }}
          validationSchema={yupSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, setFieldValue, values }) => {
            const disableForm = !values.allowEdits;

            return (
              <Form className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 md:gap-y-7">
                  <div className="relative">
                    <p className="account-form-text">First Name</p>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="account-form-input"
                      disabled={disableForm}
                    />

                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>
                  <div className="relative">
                    <p className="account-form-text">Last Name</p>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="account-form-input"
                      disabled={disableForm}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>
                  <div className="relative">
                    <p className="account-form-text">Relationship</p>
                    <GenericSelectField
                      disabled={disableForm}
                      defaultSelectedItem={
                        relationshipTypes.find(
                          (item) => item.value === values.relationship
                        ) || null
                      }
                      handleChange={({ selectedItem }) => {
                        setFieldValue("relationship", selectedItem.value, true);
                      }}
                      items={relationshipTypes}
                    />
                    <ErrorMessage
                      name="relationship"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>
                  <div className="relative">
                    <p className="account-form-text">Email</p>
                    <Field
                      disabled={disableForm}
                      name="email"
                      type="email"
                      placeholder="mail@email.com"
                      className="account-form-input"
                    />

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>
                  <div className="relative">
                    <p className="account-form-text">Telephone</p>
                    <Field
                      name="phone"
                      type="text"
                      inputMode="tel"
                      placeholder="+2348000000000"
                      disabled={disableForm}
                      className="account-form-input"
                    />

                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  {data && (
                    <div className="mt-4">
                      <p className="account-form-text"> Allow Edits </p>
                      <div className="">
                        <SwitchField
                          color="#1E0700"
                          defaultChecked={values.allowEdits}
                          handleChange={(v) => setFieldValue("allowEdits", v)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="py-10 text-center">
                  <button
                    type="submit"
                    disabled={
                      !isValid || isLoading || loadingData || disableForm
                    }
                    className="btn-1 w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
                  >
                    {isLoading || loadingData ? (
                      <Spinner />
                    ) : (
                      "Update Next of Kin"
                    )}
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

export default NextOfKinTab;

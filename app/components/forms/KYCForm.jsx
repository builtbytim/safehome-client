"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import BarLoader from "../BarLoader";
import config from "../../utils/config";
import {
  fetchUtil,
  makeUrl,
  isDigit,
  extractErrorMessage,
} from "../../utils/fetchUtils";
import Reviewing from "../Reviewing";
import queryKeys from "../../utils/queryKeys";
import { useState, useEffect } from "react";
import { useNotifyStore } from "../../utils/store";
import GenericSelectFieldVariant1 from "./branded/GenericSelectFieldVariant1";
import { states } from "../../utils/constants";
import { useSearchParams } from "next/navigation";

const modesOfIdentification = [
  {
    name: "National Identity Number (NIN)",
    value: "NIN",
  },

  {
    name: "International Passport",
    value: "IP",
  },

  {
    name: "Driver's License",
    value: "DL",
  },

  {
    name: "Voter's Card",
    value: "VC",
  },
];

function KYCForm() {
  const searchParams = useSearchParams();
  const setNotify = useNotifyStore((state) => state.setNotify);
  const [authCode, setAuthCode] = useState(null);

  useEffect(() => {
    if (authCode) return;

    if (searchParams.has("authCode")) {
      const t = searchParams.get("authCode");

      setAuthCode(t);
    }
  }, [searchParams, authCode]);

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationKey: [queryKeys.addKycInfo],
    mutationFn: async function req(body) {
      const res = await fetchUtil({
        url: makeUrl(config.apiPaths.addKycInfo),
        method: "POST",
        body,
        headers: {
          "X-AUTH-CODE": authCode,
        },
      });

      // console.log(params);

      if (res.success) {
        return res.data;
      } else {
        const errMessage = extractErrorMessage(res);
        console.log(errMessage);
        throw {
          message: extractErrorMessage(res),
        };
      }
    },

    onError: function (error) {
      setNotify({
        title: "Something went wrong",
        content: error.message,
        allowClose: true,
        show: true,
      });
    },
  });

  function handleSubmit(values) {
    if (isLoading) return;

    const body = {
      residentialAddress: values.residentialAddress,
      state: values.state,
      documentType: values.documentType,
      IDNumber: values.IDNumber,
    };

    // console.log(body);
    mutate(body);
  }

  return (
    <Formik
      initialValues={{
        residentialAddress: "",
        state: "",
        documentType: "NIN",
        IDNumber: "",
        BVN: "",
      }}
      initialTouched={{
        documentType: true,
      }}
      validationSchema={Yup.object().shape({
        documentType: Yup.string()
          .oneOf(
            modesOfIdentification.map((v) => v.value),

            "Invalid document type"
          )
          .required("Required"),

        state: Yup.string()
          .required("Required")
          .oneOf(
            states.map((state) => state.value),
            "Invalid state selected"
          ),

        residentialAddress: Yup.string()
          .required("Required")
          .min(10, "Must be 10 characters or more")
          .max(100, "Must be 100 characters or less"),

        BVN: Yup.string()
          .required("Required")
          .test("bvn-num-is-valid", "Invalid BVN", function (value) {
            if (!value) return true;

            return isDigit(value);
          })
          .length(11, "BVN number must be 10 digits"),

        IDNumber: Yup.string()
          .required("Required")
          .min(10, "ID number must be at least 10 characters"),
        // .test("ID-num-is-valid", "Invalid ID Number", function (value) {
        //   if (!value) return true;

        //   return isDigit(value);
        // })
      })}
      onSubmit={handleSubmit}
    >
      {({ isValid, setFieldValue, values }) => {
        return (
          <Form className="space-y-7 w-full">
            <BarLoader v={0} active={isLoading} />

            {isSuccess && <Reviewing />}

            <div className="w-full  relative flex flex-col justify-center items-start space-y-2">
              <label
                htmlFor="residentialAddress"
                className="text-[--text-secondary] text-sm text-left"
              >
                Residential Address
              </label>
              <Field
                name="residentialAddress"
                type="text"
                className="field-1"
                placeholder="Enter your address"
              />

              <ErrorMessage
                name="residentialAddress"
                component="div"
                className="absolute  -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
              />
            </div>

            <div className="w-full  relative flex flex-col justify-center items-start space-y-2">
              <label
                htmlFor="state"
                className="text-[--text-secondary] text-sm text-left"
              >
                State
              </label>
              <GenericSelectFieldVariant1
                items={states}
                handleChange={({ selectedItem }) => {
                  setFieldValue("state", selectedItem.value);
                }}
                name="state"
                type="text"
                className="field-1"
                placeholder="State of Residence"
              />

              <ErrorMessage
                name="state"
                component="div"
                className="absolute  -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
              />
            </div>

            <div className="w-full  relative flex flex-col justify-center items-start space-y-2">
              <label
                htmlFor="documentType"
                className="text-[--text-secondary] text-sm text-left"
              >
                Select Document Type
              </label>
              <GenericSelectFieldVariant1
                name="documentType"
                type="text"
                className="field-1"
                handleChange={({ selectedItem }) => {
                  setFieldValue("documentType", selectedItem.value);
                }}
                items={modesOfIdentification}
              />

              <ErrorMessage
                name="documentType"
                component="div"
                className="absolute  -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
              />
            </div>

            <div className="w-full  relative flex flex-col justify-center items-start space-y-2">
              <label
                htmlFor="IDNumber"
                className="text-[--text-secondary] text-sm text-left"
              >
                ID Number
              </label>
              <Field
                name="IDNumber"
                type="text"
                className="field-1"
                placeholder="Enter ID number"
              />

              <ErrorMessage
                name="IDNumber"
                component="div"
                className="absolute  -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
              />
            </div>

            <div className="w-full  relative flex flex-col justify-center items-start space-y-2">
              <label
                htmlFor="BVN"
                className="text-[--text-secondary] text-sm text-left"
              >
                BVN
              </label>
              <Field
                name="BVN"
                type="numeric"
                className="field-1"
                placeholder="Enter BVN"
              />

              <ErrorMessage
                name="BVN"
                component="div"
                className="absolute  -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
              />
            </div>

            <div className="pt-4 ">
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="btn-1"
              >
                <span> Submit </span>
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default KYCForm;

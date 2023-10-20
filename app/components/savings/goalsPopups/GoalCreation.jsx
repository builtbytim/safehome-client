"use client";

import React from "react";
import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import GoalImage from "../../../../assets/images/investment/inv1.png";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDropzone } from "react-dropzone";
import { FaNairaSign } from "react-icons/fa6";
import { useCallback, useState } from "react";
import cn from "classnames";
import GenericSelectFieldVariant1 from "../../forms/branded/GenericSelectFieldVariant1";
import FormattingField from "../../forms/branded/FormattingField";
import { useRef } from "react";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import * as Yup from "yup";
import { useMutation } from "react-query";
import queryKeys from "../../../utils/queryKeys";
import { createFetcher } from "../../../utils/fetchUtils";
import config from "../../../utils/config";
import Spinner from "../../Spinner";

const savingsPrefs = [
  {
    name: "Wallet",
    value: "wallet",
  },
  {
    name: "Card",
    value: "card",
  },
];

const validationSchema = Yup.object().shape({
  goalTitle: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(64, "Too long"),
  goalPurpose: Yup.string()
    .required("Required")
    .min(64, "Too short")
    .max(256, "Too long"),
  goalAmount: Yup.number()
    .required("Required")
    .min(1000, "Too low")
    .typeError("Invalid amount"),
  savingsPreference: Yup.string()
    .required("Required")
    .oneOf(["wallet", "card"], "Invalid preference"),
});

function GoalCreation({
  show = false,
  toggleShow,
  handleSubmit,
  formData,
  token,
}) {
  const ref = useRef(null);

  useOutsideClickDetector(ref, () => {
    if (show) toggleShow();
  });

  const [imageFile, setImageFile] = useState(
    formData.coverImageFile
      ? URL.createObjectURL(formData.coverImageFile)
      : null
  );
  const [rawFile, setRawFile] = useState(formData.coverImageFile || null);
  const [fileUrl, setFileUrl] = useState(formData.goalImageUrl || null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setRawFile(file);
    setImageFile(URL.createObjectURL(file));
    uploadCoverImage({
      file,
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpeg", ".jpg"],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
  });

  // mutation to upload cover image if it exists
  const {
    mutate: uploadCoverImage,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: [queryKeys.uploadImage, token],
    mutationFn: createFetcher({
      url: config.apiPaths.uploadImage,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      formEncoded: true,
      auth: token,
    }),

    onSuccess: (data) => {
      setFileUrl(data.secureUrl);
    },

    onError: (error) => {
      setRawFile(null);
      setImageFile(null);
    },
  });

  function handleSubmitClick(values) {
    handleSubmit({ ...values, goalImageUrl: fileUrl });
  }

  return (
    <Overlay2 pos="center">
      <section
        ref={ref}
        className={
          "w-full md:max-w-[493px]  bg-white  md:h-[100vh] h-[100vh] z-40 px-6 py-6"
        }
      >
        <div className="flex flex-row justify-end items-center">
          <div className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning">
            <BiX onClick={toggleShow} className="text-[--primary] text-2xl" />
          </div>
        </div>

        <div className="space-y-4 mt-6 max-h-[90vh] md:max-h-[85vh] overflow-y-auto no-scrollbar pb-8">
          <h1 className="text-[--text-brand-2] text-lg md:text-xl lg:text-2xl font-semibold">
            {" "}
            Create a Goal{" "}
          </h1>
          <p className="font-medium text-[--primary] text-sm md:text-base">
            Reach yours personal goals faster
            <span className="text-xs block text-[--placeholder]">
              Max. 2MB. JPG or PNG.
            </span>
          </p>

          {/* Uploaded image view  */}
          {!!imageFile && (
            <div className="bg-[--b1] relative w-full   flex flex-col justify-center items-center">
              <div className="absolute text-white bg-black/60 inset-0  flex flex-col justify-center items-center">
                {isLoading && <Spinner size="small" />}
              </div>

              {!isLoading && (
                <div
                  onClick={() => {
                    setRawFile(null);
                    setImageFile(null);
                  }}
                  title="Remove"
                  className="absolute right-0 bottom-0 p-2 hover:cursor-pointer bg-[--text-brand-2] text-white   opacity-60 hover:opacity-80 transitioning z-10"
                >
                  <BiX className=" text-2xl"></BiX>
                </div>
              )}

              <Image
                height="210"
                width="429"
                src={imageFile}
                className="w-full h-[210px] object-cover"
                alt="Goal image"
              />
            </div>
          )}

          {/* Uploaded image ends  */}

          <div
            className={
              "relative h-[210px]  w-full" +
              cn({
                " hidden ": !!imageFile,
              })
            }
            {...getRootProps()}
          >
            <Image
              src={GoalImage}
              alt="goal image"
              className="object-cover h-[210px] w-full"
            />
            <div className="absolute bg-black/60 inset-0  flex flex-col justify-center items-center">
              <input {...getInputProps()} />
              {isDragActive ? (
                <span className="text-white text-center">
                  {" "}
                  Drag the files here{" "}
                </span>
              ) : (
                <span className="text-white text-center">
                  {" "}
                  Change image (Optional){" "}
                </span>
              )}
            </div>
          </div>

          {/* Form now  */}

          <div>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                goalTitle: formData.goalTitle || "",
                goalPurpose: formData.goalPurpose || "",
                goalAmount: formData.goalAmount || "",
                savingsPreference:
                  formData.savingsPreference || savingsPrefs[0].value,
              }}
              initialTouched={{
                savingsPreference: true,
              }}
              onSubmit={handleSubmitClick}
            >
              {({ isValid, setFieldValue }) => {
                return (
                  <Form className="space-y-6">
                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="goalTitle"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Goal Title
                      </label>

                      <Field
                        name="goalTitle"
                        type="text"
                        className="field-1"
                        placeholder="Title of your goal"
                      />

                      <ErrorMessage
                        name="goalTitle"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="goalPurpose"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Purpose of Goal
                      </label>

                      <Field
                        name="goalPurpose"
                        type="text"
                        className="field-1"
                        placeholder="Purpose of your goal"
                      />

                      <ErrorMessage
                        name="goalPurpose"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="goalAmount"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Overall Goal Amount
                      </label>

                      <FormattingField
                        icon={FaNairaSign}
                        name="goalAmount"
                        type="text"
                        inputMode="numeric"
                        className="field-1"
                        placeholder="Amount"
                        extraClasses="field-1"
                      />

                      <ErrorMessage
                        name="goalAmount"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="savingPreference"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        How would you prefer to save?
                      </label>

                      <GenericSelectFieldVariant1
                        defaultSelectedItem={savingsPrefs[0]}
                        handleChange={({ selectedItem }) => {
                          setFieldValue(
                            "savingsPreference",
                            selectedItem.value,
                            true
                          );
                        }}
                        items={savingsPrefs}
                      />

                      <ErrorMessage
                        name="savingPreference"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="pt-4 flex flex-col justify-center items-center space-y-4">
                      <button
                        disabled={!isValid}
                        type="submit"
                        className="btn-1 bg-[--text-brand-2] hover:bg-[--text-brand-2-hover] "
                      >
                        {" "}
                        Continue Setup
                      </button>
                      <button
                        type="button"
                        onClick={toggleShow}
                        className="btn-2 text-[--text-brand-2] border-[--text-brand-2] hover:bg-[#ff9100]/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </Overlay2>
  );
}

export default GoalCreation;

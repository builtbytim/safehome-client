"use client";

import React from "react";
import Overlay2 from "../../Overlay2";
import { Slide } from "react-reveal";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import GoalImage from "../../../../assets/images/investment/inv1.png";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import cn from "classnames";

function GoalCreation({ show = false, toggleShow, handleSubmit }) {
  const [imageFile, setImageFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setRawFile(file);
    setImageFile(URL.createObjectURL(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpeg", ".jpg"],
    },
    maxFiles: 2,
    maxSize: 1024 * 1024 * 2,
  });

  if (!show) return null;
  return (
    <Overlay2 pos="center">
      <Slide right duration={300} delay={200}>
        <section
          className={
            "w-full md:max-w-[493px]  bg-white  md:h-[100vh] h-[100vh] z-40 px-6 py-6"
          }
        >
          <div className="flex flex-row justify-end items-center">
            <div className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--lines] transitioning">
              <BiX onClick={toggleShow} className="text-[--primary] text-xl" />
            </div>
          </div>

          <div className="space-y-4 mt-6 max-h-[90vh] md:max-h-[75vh] overflow-y-auto no-scrollbar pb-8">
            <h1 className="text-[--text-brand-2] text-lg md:text-xl lg:text-2xl font-semibold">
              {" "}
              Create a Goal{" "}
            </h1>
            <p className="font-medium text-[--primary] text-sm md:text-base">
              Reach yours personal goals faster
            </p>

            {/* Uploaded image view  */}
            {!!imageFile && (
              <div className="bg-[--b1] relative w-full   flex flex-col justify-center items-center">
                <div className="absolute bg-black/60 inset-0  flex flex-col justify-center items-center">
                  {" "}
                </div>
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
              <Formik initialValues={{}} onSubmit={handleSubmit}>
                {({ isValid }) => {
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

                        <Field
                          name="goalAmount"
                          type="text"
                          inputMode="numeric"
                          className="field-1"
                          placeholder="Amount"
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

                        <Field
                          as="select"
                          name="savingPreference"
                          type="text"
                          className="field-1"
                          placeholder=""
                        >
                          <option value=""> Bank </option>
                          <option value=""> Card </option>
                        </Field>

                        <ErrorMessage
                          name="savingPreference"
                          component="div"
                          className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                        />
                      </div>

                      <div className="pt-4 flex flex-col justify-center items-center space-y-4">
                        <button
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
                          {" "}
                          Cancel{" "}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </section>
      </Slide>
    </Overlay2>
  );
}

export default GoalCreation;

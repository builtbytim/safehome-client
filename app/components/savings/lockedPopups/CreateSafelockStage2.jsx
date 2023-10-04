import Overlay2 from "../../Overlay2";
import { Slide } from "react-reveal";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import { Form, Formik, Field, ErrorMessage } from "formik";

function CreateSafelock2({ toggleShow, handleSubmit }) {
  return (
    <Overlay2 pos="center">
      <Slide right duration={300} delay={200}>
        <section
          className={

            "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40 "

          }
        >
          <div className="flex p-6 flex-row justify-end items-center">
            <div
              onClick={toggleShow}
              className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--lines] transitioning"
            >
              <BiX className="text-[--primary] text-xl" />
            </div>
          </div>

          <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[75vh] pb-8">
            <div className="px-6">
              <h1 className="font-bold  text-[--color-brand] text-lg md:text-xl">
                Lock for 10 - 30 days
              </h1>
              <p className="text-[--primary] font-medium text-sm pt-2">
                Create a Locked Savings for just 10 - 30 days
              </p>
            </div>

            <Formik initialValues={{}} onSubmit={handleSubmit}>
              {({ isValid }) => {
                return (
                  <Form className="space-y-6 p-6  ">
                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="amountToLock"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Amount to Lock
                      </label>

                      <Field
                        name="amountToLock"
                        type="text"
                        inputMode="numeric"
                        className="field-1"
                        placeholder="Amount to lock"
                      />

                      <ErrorMessage
                        name="amountToLock"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="lockTitle"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Title of Lock
                      </label>

                      <Field
                        name="lockTitle"
                        type="text"
                        className="field-1"
                        placeholder="Title of lock"
                      />

                      <ErrorMessage
                        name="lockTitle"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="paybackDate"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Payback Date
                      </label>

                      <Field
                        name="paybackDate"
                        type="date"
                        className="field-1"
                        placeholder="Payback date"
                      />

                      <ErrorMessage
                        name="paybackDate"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="primarySource"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Select a Primary Source
                      </label>

                      <Field
                        as="select"
                        name="primarySource"
                        type="text"
                        className="field-1"
                        placeholder=""
                      >
                        <option value=""> Bank </option>
                        <option value=""> Card </option>
                      </Field>

                      <ErrorMessage
                        name="primarySource"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="absolute w-[90%]  inset-x-0 bottom-4  flex flex-col justify-center items-center  mx-auto">
                      <button type="submit" className="btn-1 w-full  ">
                        Continue
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </section>
      </Slide>
    </Overlay2>
  );
}

export default CreateSafelock2;

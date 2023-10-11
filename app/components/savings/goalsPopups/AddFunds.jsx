import Overlay2 from "../../Overlay2";
import { Slide } from "react-awesome-reveal";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import { Form, Formik, Field, ErrorMessage } from "formik";

function AddFunds({ toggleShow }) {
  return (
    <Overlay2 pos="center">
      <div right duration={300} delay={200}>
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
              <h1 className="font-bold  text-[--text-brand-2] text-lg md:text-xl">
                Add Funds
              </h1>
              <p className="text-[--primary] font-medium text-sm pt-2">
                Instantly add funds to this savings goal
              </p>
            </div>

            <Formik initialValues={{}} onSubmit={() => {}}>
              {({ isValid }) => {
                return (
                  <Form className="space-y-6 p-6  ">
                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="amountToAdd"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Amount to add
                      </label>

                      <Field
                        name="amountToAdd"
                        type="text"
                        inputMode="numeric"
                        className="field-1"
                        placeholder="Amount to add"
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

                      <Field
                        as="select"
                        name="fundingSource"
                        type="text"
                        className="field-1"
                        placeholder=""
                      >
                        <option value=""> Bank </option>
                        <option value=""> Card </option>
                      </Field>

                      <ErrorMessage
                        name="fundingSource"
                        component="div"
                        className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="absolute w-[90%]  inset-x-0 bottom-4  flex flex-col justify-center items-center  mx-auto">
                      <button
                        type="submit"
                        disabled={isValid}
                        className="btn-1 w-full bg-[--text-brand-2] hover:bg-[--text-brand-2-hover] "
                      >
                        Topup
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </section>
      </div>
    </Overlay2>
  );
}

export default AddFunds;

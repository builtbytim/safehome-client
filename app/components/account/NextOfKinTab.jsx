"use client";

import GenericSelectField from "../forms/branded/GenericSelectField";
import { relationshipTypes } from "../../utils/constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NextOfKinTab = () => {
  return (
    <div className="py-7 space-y-7 font-medium">
      <Formik>
        {({ isValid }) => {
          return (
            <Form className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 md:gap-y-7">
                <div>
                  <p className="account-form-text">First Name</p>
                  <Field
                    type="text"
                    placeholder="First Name"
                    className="account-form-input"
                  />
                </div>
                <div>
                  <p className="account-form-text">Last Name</p>
                  <Field
                    type="text"
                    placeholder="Last Name"
                    className="account-form-input"
                  />
                </div>
                <div>
                  <p className="account-form-text">Relationship</p>
                  <GenericSelectField items={relationshipTypes} />
                </div>
                <div>
                  <p className="account-form-text">Email</p>
                  <Field
                    type="email"
                    placeholder="mail@email.com"
                    className="account-form-input"
                  />
                </div>
                <div>
                  <p className="account-form-text">Telephone</p>
                  <Field
                    type="text"
                    inputMode="tel"
                    placeholder="+2348000000000"
                    className="account-form-input"
                  />
                </div>
              </div>
              <div className="py-10 text-center">
                <button
                  disabled={!isValid}
                  className="btn-1 w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
                >
                  Update Next of Kin
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NextOfKinTab;

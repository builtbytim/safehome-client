import Image from "next/image";
import BarLoader from "../BarLoader";
import { useNotifyStore } from "../../utils/store";
import { Form, Formik, Field, ErrorMessage } from "formik";

const BasicInfoTab = () => {
  return (
    <div className="py-7 space-y-5 font-medium">
      <div className="flex gap-2 items-center">
        <div className="rounded-full h-[96px] w-[96px] overflow-hidden">
          <Image
            priority
            src="https://i.pravatar.cc/150?u=helios@g.com"
            alt="User"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <button className="p-3">Tap to Change Avatar</button>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          surname: "",
          email: "",
          phone: "",
        }}
        onSubmit={() => {}}
      >
        {({ isValid }) => {
          return (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 md:gap-y-7">
              <div>
                <p className="account-form-text">First Name</p>
                <Field
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="account-form-input"
                />
              </div>
              <div>
                <p className="account-form-text">Surname</p>
                <Field
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  className="account-form-input"
                />
              </div>
              <div>
                <p className="account-form-text">Email</p>
                <Field
                  type="email"
                  name="email"
                  placeholder="mail@email.com"
                  className="account-form-input"
                />
              </div>
              <div>
                <p className="account-form-text">Telephone</p>
                <Field
                  type="text"
                  inputMode="numeric"
                  name="phone"
                  placeholder="+2348000000000"
                  className="account-form-input"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BasicInfoTab;

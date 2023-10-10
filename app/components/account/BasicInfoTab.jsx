import Image from "next/image";
import BarLoader from "../BarLoader";
import { useNotifyStore } from "../../utils/store";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useMutation } from "react-query";
import { parsePhoneNumber } from "awesome-phonenumber";
import {
  makeUrl,
  extractErrorMessage,
  fetchUtil,
} from "../../utils/fetchUtils";
import * as Yup from "yup";
import GenericSelectField from "../forms/branded/GenericSelectField";

const states = [
  { name: "Choose state", value: "" },
  { name: "Abia", value: "ABIA" },
  { name: "Adamawa", value: "ADAMAWA" },
  { name: "Akwa Ibom", value: "AKWA_IBOM" },
  { name: "Anambra", value: "ANAMBRA" },
  { name: "Bauchi", value: "BAUCHI" },
  { name: "Bayelsa", value: "BAYELSA" },
  { name: "Benue", value: "BENUE" },
  { name: "Borno", value: "BORNO" },
  { name: "Cross River", value: "CROSS_RIVER" },
  { name: "Delta", value: "DELTA" },
  { name: "Ebonyi", value: "EBONYI" },
  { name: "Edo", value: "EDO" },
  { name: "Ekiti", value: "EKITI" },
  { name: "Enugu", value: "ENUGU" },
  { name: "FCT", value: "FCT" },
  { name: "Gombe", value: "GOMBE" },
  { name: "Imo", value: "IMO" },
  { name: "Jigawa", value: "JIGAWA" },
  { name: "Kaduna", value: "KADUNA" },
  { name: "Kano", value: "KANO" },
  { name: "Katsina", value: "KATSINA" },
  { name: "Kebbi", value: "KEBBI" },
  { name: "Kogi", value: "KOGI" },
  { name: "Kwara", value: "KWARA" },
  { name: "Lagos", value: "LAGOS" },
  { name: "Nasarawa", value: "NASARAWA" },
  { name: "Niger", value: "NIGER" },
  { name: "Ogun", value: "OGUN" },
  { name: "Ondo", value: "ONDO" },
  { name: "Osun", value: "OSUN" },
  { name: "Oyo", value: "OYO" },
  { name: "Plateau", value: "PLATEAU" },
  { name: "Rivers", value: "RIVERS" },
  { name: "Sokoto", value: "SOKOTO" },
  { name: "Taraba", value: "TARABA" },
  { name: "Yobe", value: "YOBE" },
  { name: "Zamfara", value: "ZAMFARA" },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),

  surname: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),

  phone: Yup.string()
    .required("Required")
    .min(10, "Must be 10 characters or more")
    .test("phone-is-valid", "Invalid phone number", function (value) {
      const result = parsePhoneNumber(value, { regionCode: "NG" });
      return result.valid;
    }),

  gender: Yup.string()
    .required("Required")
    .oneOf(["MALE", "FEMALE"], "Invalid gender selected"),

  state: Yup.string()
    .required("Required")
    .oneOf(
      states.map((state) => state.value),
      "Invalid state selected"
    ),

  address: Yup.string()
    .required("Required")
    .min(10, "Must be 10 characters or more")
    .max(100, "Must be 100 characters or less"),

  dateOfBirth: Yup.date()
    .required("Required")
    .test(
      "date-is-valid",
      "You must be 18 years or older to use this service",
      function (value) {
        const now = new Date();
        const dob = new Date(value);
        const diff = now.getTime() - dob.getTime();
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        return age >= 18;
      }
    ),

  email: Yup.string().email("Invalid email address").required("Required"),
});

const BasicInfoTab = ({ user }) => {
  return (
    <div className="py-7 space-y-5 font-medium">
      <div className="flex gap-2 items-center">
        <div className="rounded-full h-[96px] w-[96px] overflow-hidden">
          <Image
            priority
            src={user.avatarUrl || "https://i.pravatar.cc/150?u=helios@g.com"}
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
          firstName: user.firstName || "",
          surname: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          gender: user.gender || "",
          dateOfBirth: user.dateOfBirth
            ? new Date(user.dateOfBirth * 1000).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
        }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        {({ isValid, setFieldValue }) => {
          return (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 md:gap-y-7">
              <div className="relative">
                <p className="account-form-text">First Name</p>
                <Field
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="account-form-input"
                />

                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>
              <div className="relative">
                <p className="account-form-text">Surname</p>
                <Field
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  className="account-form-input"
                />
                <ErrorMessage
                  name="surname"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>

              <div className="relative">
                <p className="account-form-text">Gender</p>
                <GenericSelectField
                  items={[
                    {
                      name: "Male",
                      value: "MALE",
                    },
                    {
                      name: "Female",
                      value: "FEMALE",
                    },
                  ]}
                  handleChange={(selectedItem) => {
                    setFieldValue("gender", selectedItem.value);
                  }}
                />

                <ErrorMessage
                  name="gender"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>

              <div className="relative">
                <p className="account-form-text"> Date of Birth</p>
                <Field
                  name="dateOfBirth"
                  type="date"
                  max="2100-01-01"
                  className="account-form-input"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>

              <div className="relative">
                <p className="account-form-text">Email</p>
                <Field
                  readOnly
                  type="email"
                  name="email"
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
                  type="text"
                  inputMode="numeric"
                  name="phone"
                  placeholder="+2348000000000"
                  className="account-form-input"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>

              <div className="relative">
                <p className="account-form-text">Address</p>
                <Field
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="account-form-input"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>

              <div className="relative">
                <p className="account-form-text">State of Residence</p>
                <GenericSelectField items={states} />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
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

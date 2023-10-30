import { Form, Formik, Field, ErrorMessage } from "formik";
import { parsePhoneNumber } from "awesome-phonenumber";
import * as Yup from "yup";
import GenericSelectField from "../forms/branded/GenericSelectField";
import { states } from "../../utils/constants";
import UserAvatarArea from "./UserAvatarArea";
import { useMutation, useQueryClient } from "react-query";
import queryKeys from "../../utils/queryKeys";
import config from "../../utils/config";
import { createFetcher } from "../../utils/fetchUtils";
import { useNotifyStore } from "../../utils/store";
import Spinner from "../Spinner";
import Link from "next/link";

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

const BasicInfoTab = ({ user, token }) => {
  const setNotify = useNotifyStore((state) => state.setNotify);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createFetcher({
      url: config.apiPaths.updateUser,
      method: "PUT",
      auth: token,
    }),

    mutationKey: [queryKeys.updateUser, token],

    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.getSession);
      setNotify({
        show: true,
        content: "Profile updated successfully",
        allowClose: true,
      });
    },

    onError: (error) => {
      setNotify({
        show: true,
        content: error.message,
        allowClose: true,
      });
    },
  });

  function handleSubmit(values) {
    if (isLoading) return;

    mutate({
      firstName: values.firstName,
      lastName: values.surname,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
      dateOfBirth: new Date(values.dateOfBirth).getTime() / 1000,
      residentialAddress: values.address,
      state: values.state,
    });
  }

  return (
    <div className="py-7 space-y-5 font-medium">
      <UserAvatarArea user={user} token={token} />

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
          address: user.address || "",
          state: user.state || "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, setFieldValue }) => {
          const disableForm =
            user.kycStatus === "PENDING" || user.kycStatus === "APPROVED";

          return (
            <Form className="py-6 w-full">
              {user.kycStatus && (
                <legend className="text-xs text-[--color-brand] pb-3">
                  {user.kycStatus === "APPROVED" &&
                    "Your KYC is approved, you can not edit your profile anymore at this time. If you wish to make changes, please contact support."}

                  {user.kycStatus === "PENDING" &&
                    "Your KYC is pending, you can not edit your profile anymore at this time. If you wish to make changes, please contact support."}
                </legend>
              )}

              {!user.kycStatus && (
                <div className="pb-4">
                  <Link
                    href="/kyc"
                    className=" ring-1 hover:ring-[--primary] font-normal ring-offset-2 bg-[--primary] text-white  transitioning  rounded-brand text-xs md:text-sm px-2 lg:px-2 items-center py-1"
                  >
                    Go to KYC
                  </Link>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 md:gap-y-7">
                <div className="relative">
                  <p className="account-form-text">First Name</p>
                  <Field
                    type="text"
                    disabled={disableForm}
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
                    disabled={disableForm}
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
                    disabled={disableForm}
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
                    handleChange={({ selectedItem }) => {
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
                    disabled={disableForm}
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
                    disabled
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
                    disabled={disableForm}
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
                    disabled={disableForm}
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
                  <GenericSelectField
                    handleChange={({ selectedItem }) => {
                      setFieldValue("state", selectedItem.value);
                    }}
                    defaultSelectedItem={
                      states.find((v) => v.value === user.state) || states[0]
                    }
                    disabled={disableForm}
                    items={states}
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
              </div>
              <div className="py-10 text-center flex flex-col justify-center items-center w-full">
                <button
                  disabled={disableForm || !isValid || isLoading}
                  className="btn-1 w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
                >
                  {isLoading ? <Spinner /> : "Save"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BasicInfoTab;

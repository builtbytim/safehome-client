import config from "../../../utils/config";
import ResetPassword from "../../../components/forms/ResetPassword";

export const metadata = {
  name: "Reset password",
  description: config.app.description,
};

async function Page() {
  return (
    <div className=" space-y-6 w-full">
      <div className="">
        <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
          {" "}
          Reset your password
        </h1>
      </div>
      <div className="text-[--text-secondary]">
        <p>
          Fill in the form below and we will send you a reset confirmation link.
        </p>
      </div>

      <ResetPassword />
    </div>
  );
}

export default Page;

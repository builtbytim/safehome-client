import config from "../../utils/config";

export const metadata = {
  name: "Verify email",
  description: config.app.description,
};

function EmailVerify() {
  return (
    <div>
      <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
        {" "}
        Email Verification
      </h1>

      <p>
        A code has been sent to Example gmail com, kindly input the code to
        confirm Signup.
      </p>
    </div>
  );
}

export default EmailVerify;

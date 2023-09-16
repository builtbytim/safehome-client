import config from "../../utils/config";
import VerifiyEmail from "../../components/forms/VerifiyEmail";

export const metadata = {
  name: "Verify email",
  description: config.app.description,
};

function EmailVerify() {
  return (
    <div className="">
      <div className="space-y-6 ">
        <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
          {" "}
          Email Verification
        </h1>

        <p className="text-[--text-secondary]">
          A code has been sent to johdoe@gmail, kindly input the code to confirm
          your account.
        </p>
      </div>

      <VerifiyEmail />
    </div>
  );
}

export default EmailVerify;

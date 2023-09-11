import SignIn from "../../components/forms/SignIn.jsx";
import Link from "next/link";

import config from "../../utils/config.js";

export const metadata = {
  title: `Sign in | ${config.app.name}`,
};

export default function Page() {
  return (
    <>
      <div className="bg-white w-[448px] max-w-[80%] lg:max-w-sm min-h-[300px] rounded-brand p-8 ">
        <SignIn />
      </div>

      <div className="mt-8 space-y-2 lg:space-y-4">
        <p className="text-center text-sm text-white ">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-white font-semibold hover:text-[--lines] cursor-pointer "
          >
            Create account
          </Link>
        </p>

        <p className="text-center underline lg:no-underline hover:underline cursor-pointer text-sm text-white ">
          Forgot password?
        </p>
      </div>
    </>
  );
}

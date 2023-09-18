import SignUp from "../../components/forms/SignUp.jsx";
import Link from "next/link";
import config from "../../utils/config.js";

export const metadata = {
  title: `Sign up | ${config.app.name}`,
};

export default function Page() {
  return (
    <>
      <div className="bg-white relative w-[448px] max-w-[80%] lg:max-w-sm min-h-[300px] rounded-brand p-8 ">
        <SignUp />
      </div>

      <div className="mt-8 space-y-2 lg:space-y-4">
        <p className="text-center text-sm text-white ">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-white font-semibold hover:text-[--lines] cursor-pointer "
          >
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}

import config from "../../../utils/config";
import VerifyEmail from "../../../components/forms/VerifyEmail";
import { fetchUtil, makeUrl } from "../../../utils/fetchUtils";

export const metadata = {
  name: "Verify email",
  description: config.app.description,
};

async function requestForOtp(body) {
  const res = await fetchUtil({
    body,
    method: "POST",
    url: makeUrl(config.apiPaths.requestEmailOtp),
    opts: {
      cache: "no-store",
    },
  });

  return res;
}

async function Page({ params }) {
  const res = await requestForOtp({
    uid: params.uid,
  });

  if (!res.success) {
    throw new Error(res?.error?.detail || res.errorMessage);
  }

  return (
    <div className=" space-y-6">
      <div className="">
        <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
          {" "}
          Email Verification
        </h1>
      </div>

      <VerifyEmail data={res.data} />
    </div>
  );
}

export default Page;

import { redirect } from "next/navigation";
import config from "../../utils/config";

function Page({ params }) {
  const query = new URLSearchParams(params);

  return redirect(`${config.signUpUrl}?${query.toString()}`);
}

export default Page;

"use client";

import KYCForm from "../../components/forms/KYCForm";
import SecureRoute from "../../components/SecureRoute";

function Page({ authenticatedUser, authenticationToken }) {
  return (
    <div className="">
      <div className="space-y-6 ">
        <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
          {" "}
          KYC Verification
        </h1>

        <p className="text-[--text-secondary]">
          Ensure your name matches the names on documents you provide.
        </p>

        <KYCForm token={authenticationToken} user={authenticatedUser} />
      </div>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

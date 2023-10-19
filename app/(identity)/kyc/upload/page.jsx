"use client";

import SecureRoute from "../../components/SecureRoute";
import KYCImageUpload from "../../../components/forms/KYCImageUpload";

function Page({ authenticatedUser, authenticationToken }) {
  return (
    <div className="">
      <div className="space-y-6 ">
        <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
          {" "}
          KYC Verification
        </h1>

        <p className="text-[--text-secondary]">
          Upload your KYC documents below
        </p>

        <KYCImageUpload token={authenticationToken} user={authenticatedUser} />
      </div>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

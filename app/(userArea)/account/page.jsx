"use client";

import SecureRoute from "../../components/SecureRoute";
import ProfileInformationArea from "../../components/account/ProfileInformationArea";

function Page({ authenticatedUser, authenticationToken, signOut }) {
  return (
    <div className="hidden lg:block ">
      <ProfileInformationArea
        authenticatedUser={authenticatedUser}
        authenticationToken={authenticationToken}
        signOut={signOut}
      />
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

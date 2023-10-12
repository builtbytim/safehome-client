"use client";

import SecureRoute from "../../../components/SecureRoute";

import ProfileInformationArea from "../../../components/account/ProfileInformationArea";

function Page({ authenticatedUser, authenticationToken, signOut }) {
  return (
    <ProfileInformationArea
      authenticatedUser={authenticatedUser}
      authenticationToken={authenticationToken}
      signOut={signOut}
    />
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

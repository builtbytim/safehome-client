"use client";

import SecureRoute from "../../components/SecureRoute";

function Page({ authenticatedUser }) {
  return (
    <div className="space-y-2  lg:space-y-8 w-full md:min-h-screen pt-8 pb-16">
      <main className=" space-y-2 lg:space-y-10">
        <div className="hidden "></div>
      </main>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

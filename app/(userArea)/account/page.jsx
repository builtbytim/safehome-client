"use client";

import SecureRoute from "../../components/SecureRoute";
import { useEffect } from "react";
import { useDataStore } from "../../utils/store";

function Page({ authenticatedUser }) {
  const setUser = useDataStore((state) => state.setUser);

  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pt-8 pb-16">
      <main className=" space-y-2 lg:space-y-10">
        <div className="hidden "></div>
      </main>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

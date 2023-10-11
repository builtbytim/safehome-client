"use client";

import SecureRoute from "../../components/SecureRoute";
import { useEffect } from "react";
import { useDataStore } from "../../utils/store";
import InlineRedirect from "../../components/InlineRedirect";

function Page({ authenticatedUser }) {
  const setData = useDataStore((state) => state.data);

  useEffect(() => {
    if (authenticatedUser) {
      setData({ user: authenticatedUser });
    }
  }, [authenticatedUser]);

  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pt-8 pb-16">
      <main className=" space-y-2 lg:space-y-10">
        <div className="hidden ">
          <InlineRedirect to="/account/profile" />
        </div>
      </main>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

"use client";

import React from "react";
import SecureRoute from "../../components/SecureRoute";

function Page() {
  return <div>page</div>;
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

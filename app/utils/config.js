const config = {
  app: {
    name: process.env.appName || "Safehome",
    description:
      "Safehome estates is a real estate company that provides affordable housing for all",
    keywords:
      "real estate, housing, affordable housing, safehome estates, safehome",
  },

  apiPaths: {
    createUser: "/users",
    requestEmailOtp: "/users/emails/verify",
    confirmEmailOtp: "/users/emails/confirm",
    getSession: "/users/session",
    signIn: "/users/sign-in",
  },

  redirectSearchParam: "redirect",
  loginUrl: "/sign-in",

  signInRedirectIgnore: ["/sign-in", "/sign-up"],

  authenticatedHome: "/",

  localStorageKey: "SAFEHOME_STORAGE",

  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api/v1",
};

export default config;

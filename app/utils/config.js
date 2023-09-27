const LANDING_PAGE_APP_URL =
  process.env.NEXT_PUBLIC_LANDING_PAGE_APP_URL || "http://localhost:3001";

const config = {
  urlMaps: {
    home: LANDING_PAGE_APP_URL + "",
    about: LANDING_PAGE_APP_URL + "/about",
    services: LANDING_PAGE_APP_URL + "/services",
    products: LANDING_PAGE_APP_URL + "/products",
  },
  app: {
    name: process.env.appName || "SafeHome",
    description:
      "SafeHome estates is a real estate company that provides affordable housing for all",
    keywords:
      "real estate, housing, affordable housing, SafeHome estates, SafeHome",
  },

  apiPaths: {
    createUser: "/users",
    requestEmailOtp: "/users/emails/verify",
    confirmEmailOtp: "/users/emails/confirm",
    getSession: "/users/session",
    signIn: "/users/sign-in",
    uploadKycPicture: "/users/kyc/photo",
    uploadKycID: "/users/kyc/document",
    signOut: "/users/sign-out",
    resetPassword: "/users/password/reset",
    confirmResetPassword: "/users/password/confirm-reset",
  },

  redirectSearchParam: "redirect",
  loginUrl: "/sign-in",

  signInRedirectIgnore: ["/sign-in", "/sign-up"],

  authenticatedHome: "/",

  localStorageKey: "SAFEHOME_STORAGE",

  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api/v1",
};

export default config;

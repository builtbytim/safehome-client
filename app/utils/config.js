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
    uploadKycID: "/users/kyc/upload",
    signOut: "/users/sign-out",
    changePassword: "/users/password/change",
    resetPassword: "/users/password/reset",
    confirmResetPassword: "/users/password/confirm-reset",
    addKycInfo: "/users/kyc",
    setSecurityQuestions: "/users/security-questions",
    getNotificationPreferences: "/notifications/preferences",
    setNotificationPreferences: "/notifications/preferences",
    setAvatar: "/users/avatar",
    setNextOfKin: "/users/next-of-kin",
    getNextOfKin: "/users/next-of-kin",
    initiateTopUp: "/wallet/top-up",
    initiateWithdrawal: "/wallet/withdraw",
    getWallet: "/wallet",
    getSupportedBanks: "/wallet/banks/supported",
    resolveBankAccount: "/wallet/banks/resolve",
    addBankAccount: "/wallet/banks",
    getBankAccounts: "/wallet/banks",
    deleteBankAccount: "/wallet/banks",
    getTransactions: "/wallet/transactions",
    getTransaction: "/wallet/transactions",
    getInvestmentAssets: "/investments/assets",
    getAnInvestmentAsset: "/investments/assets",
    createInvestmentAsset: "/investments/assets",
    createInvestment: "/investments/assets/invest",
    getMyInvestments: "/investments",
    getUserInvestmentStats: "/investments/stats",
    getMyNotifications: "/notifications",
    getMyNotification: "/notifications",
    getMyNotificationStats: "/notifications/stats",
    markNotificationAsRead: "/notifications",
    markAllNotificationsAsRead: "/notifications/mark-all-as-read",
    clearMyNotifications: "/notifications/clear-all",
  },

  signInModes: {
    NEW_USER: "NU",
    REGULAR: "RG",
    AUTH_FAILED: "AUF",
  },

  redirectSearchParam: "redirectUrl",
  signInModeParam: "mode",
  loginUrl: "/sign-in",

  signInRedirectIgnore: ["/sign-in", "/sign-up"],

  authenticatedHome: "/",

  localStorageKey: "SAFEHOME_STORAGE",

  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api/v1",
};

export default config;

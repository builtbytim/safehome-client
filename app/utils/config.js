const LANDING_PAGE_APP_URL =
  process.env.NEXT_PUBLIC_LANDING_PAGE_APP_URL || "http://localhost:3001";

const AFFILIATE_APP_URL =
  process.env.NEXT_PUBLIC_AFFILIATE_APP_URL || "http://localhost:3001";

const config = {
  urlMaps: {
    home: LANDING_PAGE_APP_URL + "",
    about: LANDING_PAGE_APP_URL + "/about",
    services: LANDING_PAGE_APP_URL + "/services",
    products: LANDING_PAGE_APP_URL + "/products",
    affiliate: AFFILIATE_APP_URL,
  },
  app: {
    name: process.env.appName || "Propvest",
    description:
      "Propvest estates is a real estate company that provides affordable housing for all",
    keywords:
      "real estate, housing, affordable housing, Propvest estates, Propvest",
  },

  apiPaths: {
    createUser: "/users",
    updateUser: "/users",
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
    uploadImage: "/uploads/images",
    initiateTopUp: "/wallet/top-up",
    initiateWithdrawal: "/wallet/withdraw",
    getWallet: "/wallet",
    getSupportedBanks: "/wallet/banks/supported",
    resolveBankAccount: "/wallet/banks/resolve",
    addBankAccount: "/wallet/banks",
    getBankAccounts: "/wallet/banks",
    deleteBankAccount: "/wallet/banks",
    addDebitCard: "/wallet/debit-cards",
    getDebitCards: "/wallet/debit-cards",
    deleteDebitCard: "/wallet/debit-cards",
    getTransactions: "/wallet/transactions",
    getTransaction: "/wallet/transactions",
    getInvestmentAssets: "/investibles",
    getAnInvestmentAsset: "/investibles",
    createInvestmentAsset: "/investibles",
    createInvestment: "/investibles/invest",
    getMyInvestments: "/investments",
    getInvestmentsForAsset: "/investibles",
    getUserInvestmentStats: "/investments/stats",
    getMyNotifications: "/notifications",
    getMyNotification: "/notifications",
    getMyNotificationStats: "/notifications/stats",
    markNotificationAsRead: "/notifications",
    markAllNotificationsAsRead: "/notifications/mark-all-as-read",
    clearMyNotifications: "/notifications/clear-all",
    payMembershipFee: "/payments/membership",
    createGoalSavings: "/savings/goals",
    getMyGoalSavings: "/savings/goals",
    fundGoalSavings: "/savings/goals/fund",
    getUserSavingsStats: "/savings/stats",
    createLockedSavings: "/savings/locked",
    getMyLockedSavings: "/savings/locked",
    fundLockedSavings: "/savings/locked/fund",
    getReferralProfile: "/refer/profile",
    getMyReferrals: "/refer/referrals",
    withdrawMyReferralBonus: "/refer/withdraw",
  },

  signInModes: {
    NEW_USER: "NU",
    REGULAR: "RG",
    AUTH_FAILED: "AUF",
  },

  redirectSearchParam: "redirectUrl",
  signInModeParam: "mode",
  loginUrl: "/sign-in",
  signUpUrl: "/sign-up",

  signInRedirectIgnore: [
    "/sign-in",
    "/sign-up",
    "/password/reset",
    "/password/reset/save",
    "/sign-out",
  ],

  authenticatedHome: "/",

  localStorageKey: "SAFEHOME_STORAGE",

  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api/v1",
};

export default config;

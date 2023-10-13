import {
  AccountSettingsSVG,
  CardSVG,
  ContactSVG,
  NotificationSVG,
  ReferEarnSVG,
  SecuritySVG,
  UpdateProfileSVG,
} from "../components/svg/account";

export const states = [
  { name: "Choose state", value: "" },
  { name: "Abia", value: "ABIA" },
  { name: "Adamawa", value: "ADAMAWA" },
  { name: "Akwa Ibom", value: "AKWA_IBOM" },
  { name: "Anambra", value: "ANAMBRA" },
  { name: "Bauchi", value: "BAUCHI" },
  { name: "Bayelsa", value: "BAYELSA" },
  { name: "Benue", value: "BENUE" },
  { name: "Borno", value: "BORNO" },
  { name: "Cross River", value: "CROSS_RIVER" },
  { name: "Delta", value: "DELTA" },
  { name: "Ebonyi", value: "EBONYI" },
  { name: "Edo", value: "EDO" },
  { name: "Ekiti", value: "EKITI" },
  { name: "Enugu", value: "ENUGU" },
  { name: "FCT", value: "FCT" },
  { name: "Gombe", value: "GOMBE" },
  { name: "Imo", value: "IMO" },
  { name: "Jigawa", value: "JIGAWA" },
  { name: "Kaduna", value: "KADUNA" },
  { name: "Kano", value: "KANO" },
  { name: "Katsina", value: "KATSINA" },
  { name: "Kebbi", value: "KEBBI" },
  { name: "Kogi", value: "KOGI" },
  { name: "Kwara", value: "KWARA" },
  { name: "Lagos", value: "LAGOS" },
  { name: "Nasarawa", value: "NASARAWA" },
  { name: "Niger", value: "NIGER" },
  { name: "Ogun", value: "OGUN" },
  { name: "Ondo", value: "ONDO" },
  { name: "Osun", value: "OSUN" },
  { name: "Oyo", value: "OYO" },
  { name: "Plateau", value: "PLATEAU" },
  { name: "Rivers", value: "RIVERS" },
  { name: "Sokoto", value: "SOKOTO" },
  { name: "Taraba", value: "TARABA" },
  { name: "Yobe", value: "YOBE" },
  { name: "Zamfara", value: "ZAMFARA" },
];

export const relationshipTypes = [
  { name: "Choose relationship", value: "" },

  { name: "Father", value: "FATHER" },
  { name: "Mother", value: "MOTHER" },
  { name: "Brother", value: "BROTHER" },
  { name: "Sister", value: "SISTER" },
  { name: "Uncle", value: "UNCLE" },
  { name: "Aunt", value: "AUNT" },
  { name: "Cousin", value: "COUSIN" },
  { name: "Nephew", value: "NEPHEW" },
  { name: "Niece", value: "NIECE" },
  { name: "Grandson", value: "GRANDSON" },
  { name: "Granddaughter", value: "GRANDDAUGHTER" },
  { name: "Friend", value: "FRIEND" },
];

export const securityQuestions = [
  {
    name: "Choose a security question",
    value: "",
  },
  {
    name: "What is your mother's maiden name?",
    value: "WhatIsYourMotherSMaidenName",
  },
  {
    name: "In which city were you born?",
    value: "InWhichCityWereYouBorn",
  },
  {
    name: "What is your favorite pet's name?",
    value: "WhatIsYourFavoritePetSName",
  },
  {
    name: "Who is your favorite teacher?",
    value: "WhoIsYourFavoriteTeacher",
  },
  {
    name: "What is the name of your first car?",
    value: "WhatIsTheNameOfYourFirstCar",
  },
];

export const navItems = [
  {
    name: "Profile",
    icon: AccountSettingsSVG,
    link: "/account/profile",
  },
  // {
  //   name: "Update Profile",
  //   icon: UpdateProfileSVG,
  //   link: "/account/update",
  // },
  {
    name: "Notification",
    icon: NotificationSVG,
    link: "/account/notification",
  },

  {
    name: "Card & Bank Settings",
    icon: CardSVG,
    link: "/account/payments",
  },
  {
    name: "Security",
    icon: SecuritySVG,
    link: "/account/security",
  },
  {
    name: "Refer & Earn",
    icon: ReferEarnSVG,
    link: "/account/refer",
  },
  {
    name: "Contact Us",
    icon: ContactSVG,
    link: "/account/contact",
  },
];

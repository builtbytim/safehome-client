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

export const dummyAssets = [
  {
    assetName: "SMART OFFICE LEKKI",
    location: "Lapal House, Onikan, Lagos Island.",
    pricePerUnit: 555073.0,
    units: 1823,
    unitsAvailable: 100,
    investorCount: 1823,
    assetImgUrls: ["url1", "url2", "url3"],
    properties: {
      investmentId: "SH LHO 001",
      investmentExit: "Property Sale",
      maturityDate: "3 Years",
      roi: "Capital + Annual Rent",
    },
    about:
      "Discover the perfect investment opportunity at Smart Office Lekki. Located in the prestigious Lapal House, our state-of-the-art office spaces offer an ideal environment for businesses to thrive. With a price per unit that makes it affordable for investors of all sizes, you can join our community of 1823 investors and be part of a property investment exit strategy that aims for property sales in the near future. Don't miss out on this golden opportunity; units are selling fast, and we have 100 available for immediate investment. Secure your spot and watch your investment grow.",
  },
  {
    assetName: "SHOPS IN IKOYI",
    location: "Lapal House, Onikan, Lagos Island.",
    pricePerUnit: 555073.0,
    units: 1823,
    unitsAvailable: 100,
    investorCount: 1823,
    assetImgUrls: ["url4", "url5", "url6"],
    properties: {
      investmentId: "SH LHO 002",
      investmentExit: "Property Sale",
      maturityDate: "3 Years",
      roi: "Capital + Annual Rent",
    },
    about:
      "Indulge in luxury retail investments with Shops in Ikoyi, conveniently situated in the Lapal House. Our retail spaces are designed for high-end shopping experiences. With a competitive price per unit, you can become one of our 1823 investors and enjoy the benefits of a property investment exit strategy centered around property sales. Secure one of the 100 available units now and join us on the path to success.",
  },
  {
    assetName: "LANDS IN FREEDOM WAY",
    location: "Lapal House, Onikan, Lagos Island.",
    pricePerUnit: 555073.0,
    units: 1823,
    unitsAvailable: 100,
    investorCount: 1823,
    assetImgUrls: ["url7", "url8", "url9"],
    properties: {
      investmentId: "SH LHO 003",
      investmentExit: "Property Sale",
      maturityDate: "3 Years",
      roi: "Capital + Annual Rent",
    },
    about:
      "Invest in prime real estate with Lands in Freedom Way, located within Lapal House. These spacious lands offer a unique opportunity for investors, and with our price per unit, everyone can get in on the action. Join the community of 1823 investors who share a property investment exit strategy focusing on property sales. With only 100 units available, act now to secure your piece of land and watch your investment flourish.",
  },
  {
    assetName: "DUPLEX IN FREEDOM WAY, LEKKI",
    location: "Lapal House, Onikan, Lagos Island.",
    pricePerUnit: 555073.0,
    units: 1823,
    unitsAvailable: 100,
    investorCount: 1823,
    assetImgUrls: ["url10", "url11", "url12"],
    properties: {
      investmentId: "SH LHO 004",
      investmentExit: "Property Sale",
      maturityDate: "3 Years",
      roi: "Capital + Annual Rent",
    },
    about:
      "Experience luxury living with Duplex in Freedom Way, Lekki, located within the prestigious Lapal House. Our stunning duplex units are designed to provide the ultimate in comfort and style. With a competitive price per unit, you can be one of 1823 investors participating in our property investment exit strategy focused on property sales. Don't miss your chance to secure one of the 100 available duplexes and embark on your investment journey.",
  },
];

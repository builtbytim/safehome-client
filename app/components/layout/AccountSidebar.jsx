"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BiLogOut, BiX } from "react-icons/bi";
import { useUiStore } from "../../utils/store";
import Overlay from "../Overlay";

import {
  AccountSettingsSVG,
  CardSVG,
  ContactSVG,
  NotificationSVG,
  ReferEarnSVG,
  SecuritySVG,
  UpdateProfileSVG,
} from "../svg/account";
import UserSection from "./UserSection";

const items = [
  {
    name: "Account Settings",
    icon: AccountSettingsSVG,
    link: "/account",
  },
  {
    name: "Update Profile",
    icon: UpdateProfileSVG,
    link: "/account/update",
  },
  {
    name: "Notification",
    icon: NotificationSVG,
    link: "/account/notification",
  },

  {
    name: "Card & Bank Settings",
    icon: CardSVG,
    link: "/account/card",
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

function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex relative flex-col justify-start border-r border-[--lines] items-center  w-full z-20 h-full">
      <UserSection />

      <ul className="space-y-4 flex flex-col justify-start items-start  w-full px-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="w-full" key={index}>
              <li>
                <Link href={item.link} as={item.link}>
                  <div className="flex flex-row justify-start items-center py-2 px-4 rounded-[8px] border border-white/0 group space-x-4 transitioning text-[--text-secondary]">
                    <div className="">
                      <div className="text-xl">
                        <Icon
                          fill={`${
                            pathname === item.link ? "#8d4000" : "#1a374d"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="text-[--text-primary] text-sm font-medium">
                      <span
                        className={`transitioning  text-base ${
                          pathname === item.link && "text-[--color-brand]"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </div>
          );
        })}
      </ul>

      <Link
        href="/sign-out"
        className="px-7 pt-4 pb-10 bottom-[5vh] flex flex-row space-x-4 justify-start items-center hover:cursor-pointer w-full"
      >
        <BiLogOut className="text-2xl text-[--text-danger]" />
        <span className="text-[--text-danger] font-medium"> Log Out </span>
      </Link>
    </div>
  );
}

export function MobileSidebar({ ...props }) {
  const showMe = useUiStore((state) => state.showSidebar);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  if (!showMe) return null;

  return (
    <Overlay
      ClickBack={() => {
        return (
          <div onClick={toggleSidebar}>
            <BiX className="text-4xl text-[--invert]" />
          </div>
        );
      }}
    >
      <aside className="bg-white   fixed z-20 left-0 inset-y-0 w-[227px] md:hidden md:w-[20%] lg:w-[20%] xl:w-[15%] self-stretch  ">
        <AccountSidebar />
      </aside>
    </Overlay>
  );
}

export default AccountSidebar;

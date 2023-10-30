"use client";

import { MdOutlineLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { navItems as items } from "../../utils/constants";
import Link from "next/link";
import MobileNavListUserPanel from "./MobileNavListUserPanel";
import { BiLinkExternal } from "react-icons/bi";
import { RiGuideLine } from "react-icons/ri";
import config from "../../utils/config";

function MobileNavList() {
  const pathname = usePathname();

  if (pathname !== "/account") return null;

  return (
    <div className="md:hidden">
      {/* authenticatedUser area panel  */}

      <MobileNavListUserPanel />

      <ul className="space-y-6 flex flex-col justify-start items-start  w-full pt-10">
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
                            pathname === item.link ? "#FF9100" : "#1a374d"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="text-[--text-primary] text-sm font-medium">
                      <span
                        className={`transitioning  text-base ${
                          pathname === item.link && "text-[--text-brand-2]"
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

        <a target="_blank" href="/">
          <div className="px-4 py-2   flex flex-row space-x-4 justify-start items-center hover:cursor-pointer w-full">
            <RiGuideLine className="text-2xl text-[--primary]" />
            <span className="text-[--primary] font-medium"> Guidelines </span>
          </div>
        </a>
        <a target="_blank" href={config.urlMaps.affiliate}>
          <div className="px-4 py-2   flex flex-row space-x-4 justify-start items-center hover:cursor-pointer w-full">
            <BiLinkExternal className="text-2xl text-[--primary]" />
            <span className="text-[--primary] font-medium"> Affiliates </span>
          </div>
        </a>

        <Link
          href="/sign-out"
          className="px-4 pt-4 pb-10  flex flex-row space-x-4 justify-start items-center hover:cursor-pointer w-full"
        >
          <MdOutlineLogout className="text-2xl text-[--text-danger]" />
          <span className="text-[--text-danger] font-medium"> Log Out </span>
        </Link>
      </ul>
    </div>
  );
}

export default MobileNavList;

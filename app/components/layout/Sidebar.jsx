"use client";

import LogoBrand from "../../../assets/images/logo_brand.png";
import config from "../../utils/config";
import Image from "next/image";
import Link from "next/link";
import { BiX, BiLinkExternal } from "react-icons/bi";
import { RiGuideLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import cn from "classnames";
import { useUiStore } from "../../utils/store";
import { usePathname } from "next/navigation";
import Overlay from "../Overlay";
import {
  AccountSVG,
  HomeSVG,
  InvestmentSVG,
  LoanSVG,
  SavingsSVG,
} from "../svg";

const items = [
  {
    name: "Home",
    icon: HomeSVG,
    link: "/",
  },
  {
    name: "Savings",
    icon: SavingsSVG,
    link: "/savings",
  },
  {
    name: "Investment",
    icon: InvestmentSVG,
    link: "/investments",
  },

  {
    name: "Loan",
    icon: LoanSVG,
    link: "/loans",
  },
  {
    name: "Account",
    icon: AccountSVG,
    link: "/account",
  },
];

function Sidebar() {
  const currentPathname = usePathname() || "";

  const routeIsActive = (route) =>
    ((currentPathname.includes(route) || currentPathname.startsWith(route)) &&
      route.length > 1) ||
    currentPathname === route;

  return (
    <div className="flex relative flex-col justify-start border-r  border-[--lines] items-center  border-b-[5vh] border-b-[--color-brand] w-full z-20 pt-[48px] pb-8 space-y-16 shadow h-full">
      <a target="_blank" href={config.urlMaps.home}>
        <div className="hover:cursor-pointer">
          <Image priority src={LogoBrand} alt="logo" width="100" />
        </div>
      </a>

      <ul className="space-y-6  flex flex-col justify-start items-start  w-full px-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="w-full" key={index}>
              <li>
                <Link href={item.link} as={item.link}>
                  <div
                    className={
                      "flex flex-row justify-start items-center py-2 px-4 rounded-[8px] border border-white/0 group space-x-4 transitioning" +
                      cn({
                        " hover:bg-[--b1] hover:border-[--lines] cursor-pointer ":
                          !routeIsActive(item.link),
                        " bg-[--color-brand] cursor-default ": routeIsActive(
                          item.link
                        ),
                      })
                    }
                  >
                    <div className="">
                      <div className="text-xl">
                        <Icon
                          fill={cn({
                            "#FFFFFF": routeIsActive(item.link),
                            "#c7c7cd": !routeIsActive(item.link),
                          })}
                        />
                      </div>
                    </div>

                    <div className="text-[--text-primary] text-sm font-medium">
                      <span
                        className={
                          "text-[--invert] transitioning  text-base " +
                          cn({
                            " text-white ": routeIsActive(item.link),
                          })
                        }
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

      <div className="absolute left-0  pl-8 py-2 bottom-[5vh] flex flex-col justify-start items-start space-y-4 text-base">
        <a target="_blank" href="/">
          <div className=" flex flex-row space-x-4 justify-start items-center hover:cursor-pointer">
            <RiGuideLine className="text-xl text-[--primary]" />
            <span className="text-[--primary] font-medium"> Guidelines </span>
          </div>
        </a>
        <a target="_blank" href={config.urlMaps.affiliate}>
          <div className=" flex flex-row space-x-4 justify-start items-center hover:cursor-pointer">
            <BiLinkExternal className="text-xl text-[--primary]" />
            <span className="text-[--primary] font-medium"> Affiliates </span>
          </div>
        </a>

        <Link href="/sign-out" as="/sign-out">
          <div className=" flex flex-row space-x-4 justify-start items-center hover:cursor-pointer">
            <MdOutlineLogout className="text-xl text-[--text-danger]" />
            <span className="text-[--text-danger] font-medium"> Log Out </span>
          </div>
        </Link>
      </div>
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
        <Sidebar />
      </aside>
    </Overlay>
  );
}

export default Sidebar;

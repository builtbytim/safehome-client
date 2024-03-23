"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BiLogOut, BiX } from "react-icons/bi";
import { useUiStore } from "../../utils/store";
import Overlay from "../Overlay";
import { navItems as items } from "../../utils/constants";
import UserSection from "./UserSection";
import { BiLinkExternal } from "react-icons/bi";
import { RiGuideLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import config from "../../utils/config";

function AccountSidebar() {
	const pathname = usePathname();

	return (
		<div className="flex relative flex-col justify-start border-r border-[--lines] items-center  w-full z-20 h-full">
			<UserSection />

			<ul className="space-y-4  flex flex-col justify-start items-start  w-full px-4 pb-10 overflow-y-scroll no-scrollbar">
				{items.map((item, index) => {
					const Icon = item.icon;
					return (
						<div className="w-full " key={index}>
							<li>
								<Link href={item.link} as={item.link}>
									<div className="flex flex-row justify-start items-center py-2 px-4 rounded-[8px] border border-white/0 group space-x-4 transitioning text-[--text]">
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
													pathname === item.link && "text-[--header]"
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

				<div className="  self-start px-4  bottom-[5vh] flex flex-col justify-start items-start space-y-4  ">
					<Link href="/account/guidelines" className="py-2 block  w-full">
						<div className=" flex flex-row space-x-4 justify-start items-center hover:cursor-pointer">
							<RiGuideLine className="text-xl text-[--primary]" />
							<span className="text-[--primary] font-medium"> Guidelines </span>
						</div>
					</Link>
					<a
						target="_blank"
						href={config.urlMaps.affiliate}
						className="py-2 block w-full"
					>
						<div className=" flex flex-row space-x-4 justify-start items-center hover:cursor-pointer">
							<BiLinkExternal className="text-xl text-[--primary]" />
							<span className="text-[--primary] font-medium"> Partners </span>
						</div>
					</a>

					<Link href="/sign-out" as="/sign-out" className="py-2 block w-full">
						<div className=" flex flex-row space-x-4 justify-start items-center hover:cursor-pointer">
							<MdOutlineLogout className="text-xl text-[--text-danger]" />
							<span className="text-[--text-danger] font-medium">
								{" "}
								Log Out{" "}
							</span>
						</div>
					</Link>
				</div>
			</ul>
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

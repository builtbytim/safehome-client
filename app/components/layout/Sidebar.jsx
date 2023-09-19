"use client";

import { usePathname } from "next/navigation";
import LogoBrand from "../../../assets/images/logo_brand.png";
import Image from "next/image";
import Link from "next/link";
import { BiLogOut, BiX } from "react-icons/bi";
import cn from "classnames";
import { useUiStore } from "../../utils/store";
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
		link: "/investment",
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
	const pathname = usePathname();

	return (
		<div className="flex relative flex-col justify-start border-r  border-[--lines] items-center  border-b-[5vh] border-b-[--color-brand] w-full z-20 pt-[48px] pb-8 space-y-16 shadow h-full">
			<div>
				<Image priority src={LogoBrand} alt="logo" width="100" />
			</div>

			<ul className="space-y-4 flex flex-col justify-start items-start  w-full px-4">
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
												"hover:bg-[--b1] hover:border-[--lines] cursor-pointer ":
													pathname !== item.link,
												" bg-[--color-brand] cursor-default ":
													pathname === item.link,
											})
										}
									>
										<div className="">
											<div className="text-xl">
												<Icon
													fill={cn({
														"#FFFFFF": pathname === item.link,
														"#c7c7cd": pathname !== item.link,
													})}
												/>
											</div>
										</div>

										<div className="text-[--text-primary] text-sm font-medium">
											<span
												className={
													"text-[--invert] transitioning  text-base " +
													cn({
														" text-white ": pathname === item.link,
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
			<div className="absolute left-0  px-6 py-2 bottom-[5vh] flex flex-row space-x-4 justify-start items-center hover:cursor-pointer">
				<BiLogOut className="text-2xl text-[--text-danger]" />
				<span className="text-[--text-danger] font-medium"> Log Out </span>
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

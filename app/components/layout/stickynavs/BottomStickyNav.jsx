"use client";

import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";
import {
	AccountSVG,
	HomeSVG,
	InvestmentSVG,
	LoanSVG,
	SavingsSVG,
} from "../../svg";

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

function BottomStickyNav() {
	const currentPathname = usePathname() || "";

	const routeIsActive = (route) =>
		((currentPathname.includes(route) || currentPathname.startsWith(route)) &&
			route.length > 1) ||
		currentPathname === route;

	return (
		<div className=" md:hidden flex fixed bottom-0 inset-x-0 flex-row justify-between  items-center  w-full z-20  shadow bg-white px-4">
			<ul className=" flex flex-row justify-between items-center  w-full ">
				{items.map((item, index) => {
					const Icon = item.icon;
					return (
						<div className="self-center pb-2 pt-2" key={index}>
							<li className="block">
								<Link href={item.link} as={item.link}>
									<div
										className={
											"flex  flex-col justify-center items-center group  transitioning" +
											cn({
												" hover:bg-[--b1] hover:border-[--lines] cursor-pointer ": !routeIsActive(
													item.link
												),
												"  cursor-default ": routeIsActive(item.link),
											})
										}
									>
										<div className="self-center">
											<div className="text-xl">
												<Icon
													fill={cn({
														"#c7c7cd": !routeIsActive(item.link),
														"#8d4000": routeIsActive(item.link),
													})}
												/>
											</div>
										</div>
										<div className="text-[--text-primary] text-sm self-center font-medium ">
											<span
												className={
													" transitioning text-center text-sm " +
													cn({
														" text-[--header] ": routeIsActive(item.link),
														"  text-[--invert]  ": !routeIsActive(item.link),
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
		</div>
	);
}

export default BottomStickyNav;

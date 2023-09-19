"use client";

import Sidebar, { MobileSidebar } from "../components/layout/Sidebar";
import Header from "../components/layout/headers/Header";
import HeaderAlt from "../components/layout/headers/HeaderAlt";
import config from "../utils/config";
import { usePathname } from "next/navigation";

export const metadata = {
	name: "SafeHome",
	description: config.app.description,
};

export default function Layout({ children }) {
	const pathname = usePathname();

	return (
		<main className=" min-h-screen bg-white w-full md:pl-[20%] lg:pl-[20%] xl:pl-[15%]">
			<aside className="bg-white hidden  fixed z-20 left-0 inset-y-0 w-[227px] md:flex md:w-[20%] lg:w-[20%] xl:w-[15%] self-stretch  ">
				<Sidebar />
			</aside>

			<MobileSidebar />

			<section className="w-full min-h-screen pt-[12px] lg:pt-[40px] px-[12px] lg:px-[48px] bg-[--surface-bg]">
				<div className="space-y-6 lg:space-y-8 w-full">
					{pathname === "/" ? <Header /> : <HeaderAlt pathname={pathname} />}
					{children}
				</div>
			</section>
		</main>
	);
}

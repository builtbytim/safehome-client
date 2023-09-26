import Image from "next/image";
import React from "react";
import BellImage from "../../../../assets/images/icons/bell.svg";
import { BiMenuAltLeft } from "react-icons/bi";
import { useUiStore } from "../../../utils/store";
import NotificationBell from "../../NotificationBell";

function HeaderInvestments({ title = "", extraClasses = "" }) {
	const toggleNotifications = useUiStore((state) => state.toggleNotifications);

	return (
		<header className="w-full  ">
			<div className="w-full flex flex-row justify-between items-center ">
				<div className="flex flex-row justify-start space-x-3">
					<BiMenuAltLeft className="text-[--text-brand] self-center text-4xl hidden " />
					<h1
						className={
							"self-center text-[--color-brand-2] capitalize text-2xl md:text-3xl lg:text-4xl  font-semibold " +
							extraClasses
						}
					>
						{title || "Savings"}
					</h1>
				</div>

				<div className="flex flex-row justify-center items-center  space-x-4 md:space-x-8">
					<NotificationBell toggleNotifications={toggleNotifications} />

					{/* <div className="self-center">
            <Image
              src="https://i.pravatar.cc/150?u=helios@g.com"
              width="52"
              height="52"
              alt="Avatar"
              className="rounded-full object-contain "
            />
          </div> */}
				</div>
			</div>
		</header>
	);
}

export default HeaderInvestments;

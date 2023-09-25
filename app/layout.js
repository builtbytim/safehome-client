import "./globals.css";
import { Outfit } from "next/font/google";
import config from "./utils/config";
import Notify from "./components/Notify";
import Notifications from "./components/Notifications";
import RemoteDataProvider from "./utils/RemoteDataProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
	title: config.app.name,
	description: config.app.description,
	themeColor: "#FFFFFF",
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={outfit.className}>
				<RemoteDataProvider>
					<Notify />
					<Notifications />
					{children}
				</RemoteDataProvider>
			</body>
		</html>
	);
}

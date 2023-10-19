import "./globals.css";
import { Outfit } from "next/font/google";
import config from "./utils/config";
import Notify from "./components/Notify";
import Notifications from "./components/Notifications";
import RemoteDataProvider from "./utils/RemoteDataProvider";
import TransactionReceipt from "./components/home/popups/Receipt";
import SuperOverlay from "./components/SuperOverlay";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "400", "600", "900"],
});

export const metadata = {
  title: config.app.name,
  description: config.app.description,
  themeColor: "#FFFFFF",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <SuperOverlay />
        <Notify />
        <RemoteDataProvider>
          <Notifications />
          <TransactionReceipt />
          {children}
        </RemoteDataProvider>
      </body>
    </html>
  );
}

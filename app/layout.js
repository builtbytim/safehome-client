import "./globals.css";
import { Outfit } from "next/font/google";
import config from "./utils/config";
import DataClient from "./utils/DataClient";
import Notify from "./components/Notify";
import Notifications from "./components/Notifications";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: config.app.name,
  description: config.app.description,
  themeColor: "#FFFFFF",
};

export default async function RootLayout({ children }) {
  return (
    <DataClient>
      <html lang="en">
        <body className={outfit.className}>
          <Notify />
          <Notifications />
          {children}
        </body>
      </html>
    </DataClient>
  );
}

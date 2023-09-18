import "./globals.css";
import { Outfit } from "next/font/google";
import config from "./utils/config";
import DataClient from "./utils/DataClient";
import Notify from "./components/Notify";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: config.app.name,
  description: config.app.description,
  themeColor: "#8d4000",
};

export default function RootLayout({ children }) {
  return (
    <DataClient>
      <html lang="en">
        <body className={outfit.className}> {children}</body>

        <Notify />
      </html>
    </DataClient>
  );
}

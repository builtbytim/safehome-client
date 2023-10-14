import "./globals.css";
import { Noto_Sans } from "next/font/google";
import config from "./utils/config";
import Notify from "./components/Notify";
import Notifications from "./components/Notifications";
import RemoteDataProvider from "./utils/RemoteDataProvider";

const noto = Noto_Sans({
  subsets: ["cyrillic"],
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
      <body className={noto.className}>
        <RemoteDataProvider>
          <Notify />
          <Notifications />
          {children}
        </RemoteDataProvider>
      </body>
    </html>
  );
}

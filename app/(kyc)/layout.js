import Logo from "../../assets/images/logo.png";
import Image from "next/image";
import { BsX } from "react-icons/bs";

import config from "../utils/config";

export default function Layout({ children }) {
  return (
    <main className="relative bg-white flex flex-col justify-center items-center  w-full min-h-screen">
      {/* Children goes here  */}

      <div className="   w-full max-w-2xl p-8 border rounded-brand border-[--lines]">
        <div className="flex flex-col justify-center items-end">
          <BsX className="text-3xl text-[#8D4000] cursor-pointer" />
        </div>

        <div className="w-full flex flex-col justify-center items-start">
          {children}
        </div>
      </div>
    </main>
  );
}

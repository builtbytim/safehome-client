import Logo from "../../assets/images/logo.png";
import Image from "next/image";
import Zigzag from "../../assets/images/zigzag.png";
import Zigzag2 from "../../assets/images/zigzag2.png";
import UnionImage from "../../assets/images/union.png";
import Ellipse from "../../assets/images/ellipse.png";
import Polygon from "../../assets/images/polygon.png";
import config from "../utils/config";
import Pattern from "../../assets/images/pattern.png";

export default function Layout({ children }) {
  return (
    <main className="relative bg-gradient-to-b from-[#8D4000]  to-[#1E0700] flex flex-col justify-center items-center  w-full min-h-screen">
      <Image src={Pattern} alt="pattern" className="opacity-10" layout="fill" />

      <Image
        src={Zigzag}
        alt="zigzag"
        priority
        className="top-0 w-20 lg:w-32   absolute right-0"
      />
      <Image
        src={Zigzag2}
        alt="zigzag"
        priority
        className="top-0 w-20 lg:w-32   absolute right-0"
      />
      <Image
        src={UnionImage}
        alt="union"
        priority
        className="w-24 lg:w-32 absolute bottom-0 right-0"
      />
      <Image
        src={Ellipse}
        alt="ellipse"
        priority
        className="top-0 w-24 lg:w-48   absolute left-0"
      />

      <Image
        src={Polygon}
        priority
        alt="polygon"
        className="bottom-0 w-24 lg:w-32   absolute left-0"
      />

      {/* Children goes here  */}

      <div className="  z-10 w-full max-w-2xl space-y-6 ">
        <div className="flex flex-col justify-center items-center">
          <Image priority src={Logo} alt="logo" className="" />
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  );
}

import Sidebar, { MobileSidebar } from "../components/layout/Sidebar";
import config from "../utils/config";
import BottomStickyNav from "../components/layout/stickynavs/BottomStickyNav";

export const metadata = {
  name: "SafeHome",
  description: config.app.description,
};

export default function Layout({ children }) {
  return (
    <main className=" min-h-screen bg-white w-full md:pl-[20%] lg:pl-[20%] xl:pl-[15%]">
      <aside className="bg-white hidden  fixed z-20 left-0 inset-y-0 w-[227px] md:flex md:w-[20%] lg:w-[20%] xl:w-[15%] self-stretch  ">
        <Sidebar />
      </aside>

      {/* <MobileSidebar /> */}

      <BottomStickyNav />

      <section className="w-full min-h-screen pt-[24px] lg:pt-[40px] px-[12px] lg:px-[48px] bg-white  md:bg-[--lines] ">
        <div className="">{children}</div>
      </section>
    </main>
  );
}

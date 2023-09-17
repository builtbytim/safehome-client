import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/headers/Header";
import config from "../utils/config";

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
      <section className="w-full min-h-screen pt-[20px] lg:pt-[40px] px-[20px] lg:px-[48px] bg-[--lines]">
        <div className="space-y-16 w-full">
          <Header />
          {children}
        </div>
      </section>
    </main>
  );
}

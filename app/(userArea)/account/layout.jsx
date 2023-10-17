import AccountSidebar from "../../components/layout/AccountSidebar";
import HeaderAccount from "../../components/layout/headers/HeaderAccount";
import MobileNavList from "../../components/account/MobileNavList";

export default function Layout({
  children,
  authenticatedUser,
  authenticatedToken,
}) {
  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-12 ">
      <HeaderAccount
        token={authenticatedToken}
        title="Account"
        user={authenticatedUser}
      />

      <main className="min-h-[80vh] bg-white w-full rounded md:rounded-2xl overflow-hidden flex items-stretch">
        <aside className="bg-white hidden lg:block w-[35%] xl:w-[40%] min-h-[80vh] border-r border-[--lines]">
          <AccountSidebar />
        </aside>

        {/* <MobileSidebar /> */}

        <section className="w-full md:p-5 ">
          <MobileNavList />
          <div className="w-full h-full">{children}</div>
        </section>
      </main>
    </div>
  );
}

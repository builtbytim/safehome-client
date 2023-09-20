import Spinner from "../Spinner";
import BarLoader from "../BarLoader";

function PageLoader() {
  return <BarLoader v={0} active={true} />;
  // return (
  //   <section className="fixed top-0 bottom-0 inset-x-0 bg-gradient-to-b from-[#8D4000]  to-[#1E0700] flex flex-col justify-center items-center  w-full min-h-screen z-10 space-y-16">
  //     <div>
  //       <Spinner size="large" />
  //     </div>
  //   </section>
  // );
}

export default PageLoader;

import Spinner from "../Spinner";

function PageLoader() {
  return (
    <section className="fixed inset-y-0 inset-x-0 bg-gradient-to-b from-[#8D4000]  to-[#1E0700] flex flex-col justify-center items-center  w-full min-h-screen space-y-16">
      <div>
        <Spinner siize="large" />
      </div>
    </section>
  );
}

export default PageLoader;

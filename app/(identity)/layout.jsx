import CancelButton from "../components/CancelButton";

export default function Layout({ children }) {
  return (
    <main className="relative bg-white flex flex-col justify-start items-center  w-full min-h-screen py-16 ">
      {/* Children goes here  */}

      <div className=" w-[607px]  max-w-[90%] lg:max-w-2xl shadow px-4 lg:px-8 py-4 lg:py-8 border rounded-brand border-[--lines] space-y-4 lg:space-y-8">
        <div className="flex flex-col justify-center items-end">
          <CancelButton />
        </div>

        <div className="w-full  flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  );
}

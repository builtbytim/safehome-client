import KYCForm from "../../components/forms/KYCForm";

function Page() {
  return (
    <div className="">
      <div className="space-y-6 ">
        <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
          {" "}
          KYC Verification
        </h1>

        <p className="text-[--text-secondary]">
          Ensure your name matches the names on documents you provide.
        </p>

        <KYCForm />
      </div>
    </div>
  );
}

export default Page;

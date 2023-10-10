import KYCImageUpload from "../../../components/forms/KYCImageUpload";

function Page() {
  return (
    <div className="">
      <div className="space-y-6 ">
        <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
          {" "}
          KYC Verification
        </h1>

        <p className="text-[--text-secondary]">
          Upload Valid ID Image (Int’l passport, Nimc - National ID Card,
          Driver’s License, Voter’s Card)
        </p>

        <p className="text-[--placeholder]">
          Make sure it is clear. Supported format JPG, PNG, PDF. (2MB max.)
        </p>

        <KYCImageUpload />
      </div>
    </div>
  );
}

export default Page;

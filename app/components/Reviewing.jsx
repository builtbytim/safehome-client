import KycSuccess from "../../assets/images/kycsuccess.png";
import Image from "next/image";

function Reviewing() {
  return (
    <section className="fixed inset-y-0 inset-x-0 bg-gradient-to-b from-[#8D4000]  to-[#1E0700] flex flex-col justify-center items-center  w-full min-h-screen space-y-16">
      <div>
        <Image
          src={KycSuccess}
          alt="KYC Success"
          objectFit="contain"
          width="300"
          height="300"
        />
      </div>
      <div className="max-w-2xl space-y-8 px-6">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center text-white">
          We are reviewing your information
        </h1>

        <p className="text-center text-white/90 text-base md:text-lg lg:text-xl">
          We will send you an email in the next few minutes to confirm your
          verification status.
        </p>
      </div>
    </section>
  );
}

export default Reviewing;

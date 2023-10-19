import explore1 from "../../../assets/images/explore1.png";
import explore2 from "../../../assets/images/explore2.png";
import explore3 from "../../../assets/images/explore3.png";
import Image from "next/image";
import Link from "next/link";
const exploreItems = [
  {
    title: "Complete your KYC",
    body: "Hello, Kindly finish your KYC so we can verify your identity and comply with regulatory requirements.",
    img: explore1,
    link: "/kyc",
  },

  {
    title: "Explore our Assets",
    body: "Explore our diverse Real Estate portfolio and get a feel of our asset options and performance history",
    img: explore2,
    link: "/investments?tab=1",
  },

  {
    title: "Refer and Earn",
    body: "Earn $2,000 every successful referral.",
    img: explore3,
    link: "/account/refer",
  },
];

const ExploreCard = ({ title, body, img, link }) => {
  return (
    <Link
      href={link}
      className="bg-[#FF910019] transitioning hover:bg-[#BF810019] w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch rounded-brand p-6 py-12 flex flex-row justify-between items-center space-x-6 whitespace-normal"
    >
      <div className="space-y-4 ">
        <h2 className="text-xl lg:text-2xl text-left text-[--sorta-dark] ">
          {title}
        </h2>

        <p className="text-sm">{body}</p>
      </div>
      <div>
        <Image src={img} alt="Explore" width={100} height={100} />
      </div>
    </Link>
  );
};

function ExploreCardsRow({ user }) {
  return (
    <>
      <h2 className="text-xl  pt-6 md lg:text-2xl xl:text-3xl text-left text-[--sorta-dark] font-bold ">
        Explore
      </h2>
      <div
        id="scroll-indicators"
        className="flex   flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
      >
        {exploreItems.map((item, i) => {
          if (i === 0 && user.kycStatus === "APPROVED") return null;
          return (
            <ExploreCard
              key={i}
              title={item.title}
              body={item.body}
              img={item.img}
              link={item.link}
            />
          );
        })}
      </div>
    </>
  );
}

export default ExploreCardsRow;

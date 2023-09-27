import Image from "next/image";
import BellImage from "../../assets/images/icons/bell.svg";

function NotificationBell({ toggleNotifications }) {
  return (
    <div
      onClick={toggleNotifications}
      className="self-center hover:cursor-pointer relative"
    >
      <Image
        src={BellImage}
        width="48"
        height="48"
        alt="Notification Logo"
        className="w-[24px]  h-[24px] md:w-[40px] md:h-[40px] object-contain"
      />
      <span className="border rounded-full border-[--text-brand] bg-[--text-brand] p-[0.125rem] md:p-1 inline-block absolute top-0 right-0"></span>
    </div>
  );
}

export default NotificationBell;

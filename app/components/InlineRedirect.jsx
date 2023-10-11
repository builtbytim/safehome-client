import { useRouter } from "next/navigation";

const InlineRedirect = ({ to }) => {
  const router = useRouter();

  // Redirect to the specified page
  router.push(to);

  // Return null to prevent rendering anything
  return null;
};

export default InlineRedirect;

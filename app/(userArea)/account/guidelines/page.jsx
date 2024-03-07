"use client";
import SecureRoute from "../../../components/SecureRoute";

function Page() {
  return (
    <div className="min-h-screen   w-full">
      <h1 className="self-center text-[--text-secondary] capitalize text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
        Guidelines
      </h1>

      <div className="text-base space-y-6   text-[--text-secondary]  font-normal  ">
        <p className="pt-2">
          You must adhere to these rules in order to use SafeHome&apos;s
          services:
        </p>
        <div className="space-y-2">
          <p>
            1. Complete your KYC (Know Your Customer) verification to be able to
            save and invest on our platform.
          </p>
          <p>
            2. Save at least 5,000 naira every month. This is a compulsory
            monthly savings plan.
          </p>{" "}
          <p>
            3. You will be charged a penalty fee if you break your goal savings
            before the maturity date.
          </p>{" "}
          <p>
            4. You will be charged a penalty fee, if you do not complete your
            investment savings before the maturity date
          </p>{" "}
          <p className="pt-4">
            All investment and goal-based savings that have achieved maturity
            will be credited into your wallet unless their duration is extended.
            You have a right to withdraw a saved amount before the due date has
            been reached. You may exercise this right by withdrawing into your
            wallet. If you exercise your right to withdraw the savings
            prematurely, we reserve the right to retain the fees charged for the
            service (and we may charge you those fees if they have not yet been
            paid). Withdrawals can take up to two working days to be processed,
            depending on the third party systems we use.
          </p>
          <p className="pt-4">
            Our Customer service is available 24/7 via phone, WhatsApp, or
            email. We are always ready to assist you and answer your questions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}

"use client";
import SecureRoute from "../../../components/SecureRoute";

function Page() {
	return (
		<main className=" space-y-6 text-[--text] border border-[--lines] account-p h-full min-h-[80vh] rounded-2xl">
			<div className="pb-0 space-y-1">
				<h3 className="popup-header">Guidelines</h3>
				<p>
					You must adhere to these rules in order to use Propvest&apos;s
					services:
				</p>
			</div>

			<div className="text-base space-y-6   text-[--text]  font-normal  ">
				<div className="space-y-2">
					<p>
						1. The ₦5,000 cooperative membership registration fee is a once of
						non refundable fee paid to become a registered member of the
						Propvest Cooperative
					</p>
					<p>
						2. Complete your KYC (Know Your Customer) verification to be able to
						save and invest on our platform.
					</p>
					<p>
						3. Save at least 5,000 naira every month. This is a compulsory
						monthly savings plan.
					</p>{" "}
					<p>
						4. You will be charged a penalty fee if you break your goal savings
						before the maturity date.
					</p>{" "}
					<p>
						5. You will be charged a penalty fee, if you do not complete your
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
		</main>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}

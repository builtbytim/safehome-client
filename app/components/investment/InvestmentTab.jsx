import React from "react";

const InvestmentTab = ({ heading, content, type }) => {
	return (
		<div>
			{type === "info" ? (
				<div className="p-3 border border-[--lines] rounded text-[--text-secondary] space-y-1 h-full">
					<p className="text-sm text-[--text-brand]">{heading}</p>
					<p className="font-semibold">{content}</p>
				</div>
			) : (
				<div className="p-3 border border-[--lines] rounded text-[--text-secondary] space-y-1 h-full">
					<p className="text-sm font-light">{heading}</p>
					<p className="font-medium">{content}</p>
				</div>
			)}
		</div>
	);
};

export default InvestmentTab;

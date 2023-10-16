import { NumericFormat } from "react-number-format";

const InvestmentTab = ({ heading, content, type, formatAsNumber = false }) => {
  return (
    <div>
      {type === "info" ? (
        <div className="p-3 border border-[--lines] rounded text-[--text-secondary] space-y-1 h-full">
          <p className="text-sm text-[--text-brand]">{heading}</p>
          <p className="font-semibold">
            {formatAsNumber ? (
              <NumericFormat
                value={content}
                displayType={"text"}
                thousandSeparator={true}
              />
            ) : (
              content
            )}
          </p>
        </div>
      ) : (
        <div className="p-3 border border-[--lines] rounded text-[--text-secondary] space-y-1 h-full">
          <p className="text-sm font-light">{heading}</p>
          <p className="font-medium">
            {formatAsNumber ? (
              <NumericFormat
                value={content}
                displayType={"text"}
                thousandSeparator={true}
              />
            ) : (
              content
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default InvestmentTab;

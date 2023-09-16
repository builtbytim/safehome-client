import OTPInput from "react-otp-input";

export default function OTPField({ otp, setOtp, numInputs = 6 }) {
  //   console.log(OTP);

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <OTPInput
        value={otp}
        placeholder=""
        onChange={setOtp}
        numInputs={numInputs}
        renderInput={OTPFragment}
        renderSeparator={
          <span className=" text-[--color-brand] ">
            {" "}
            &nbsp;&nbsp;-&nbsp;&nbsp;{" "}
          </span>
        }
        shouldAutoFocus
      />
    </div>
  );
}

function OTPFragment(props) {
  return (
    <input
      {...props}
      inputMode="numeric"
      type="number"
      className="min-w-[35px] custom-number-input appearance-none py-1 px-1 lg:min-w-[55px] min-h-[50px] lg:min-h-[75px]  inline-block rounded-8 focus:border-primary text-[--color-brand] font-semibold border  border-[--color-brand] outline-none border-placeholder rounded-[8px] select-none focus:text-primary text-base md:text-lg text-center "
    />
  );
}

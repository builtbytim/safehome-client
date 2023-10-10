import VisualCapture from "../../../components/forms/branded/VisualCapture";

function Page() {
  return (
    <div className=" space-y-6 min-h-[500px] flex flex-col justify-start  items-center">
      <div className="space-y-6 ">
        <h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--color-brand]">
          {" "}
          Visual Verification
        </h1>

        <p className="text-[--text-secondary]">
          Take a selfie, so we can match your face to your ID Document. Make
          sure you are in a very light room before proceeding with verification.
        </p>
      </div>

      <VisualCapture />
    </div>
  );
}

export default Page;

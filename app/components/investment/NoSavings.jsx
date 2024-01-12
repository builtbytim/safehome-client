const NoSavings = ({ saveNowFunc, isLocked = false }) => {
  return (
    <div className="border border-[--lines] p-10 rounded-xl">
      <div className="w-full max-w-[800px] mx-auto space-y-3 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-[--text-brand] font-semibold">
          Start Saving
        </h2>
        <p className="text-[--text-secondary] text-sm md:text-base">
          {isLocked
            ? "Start saving towards an investment of your choice now, let us help you get started"
            : "Start saving towards your goals. Let&apos;s help you get started."}
        </p>
        <div className="w-full  mx-auto space-y-3 pt-3 max-w-md">
          <button
            className="btn-1-v2 hidden w-full lg:block "
            onClick={() => saveNowFunc()}
          >
            {isLocked ? "INVEST FUND NOW" : "SAVE NOW"}
          </button>
          <button className="btn-2-v2 w-full ">LEARN MORE</button>
        </div>
      </div>
    </div>
  );
};

export default NoSavings;

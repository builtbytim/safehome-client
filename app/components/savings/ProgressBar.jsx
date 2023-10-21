function ProgressBar({ percentage = 0 }) {
  return (
    <div className="relative self-center w-full h-[7px] rounded-brand  bg-[#DDDDDD] ">
      <div
        style={{
          width: `${percentage}%`,
        }}
        className="absolute  h-full rounded-brand border-transparent bg-[--text-brand-2]"
      ></div>
    </div>
  );
}

export default ProgressBar;

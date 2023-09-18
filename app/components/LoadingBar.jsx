function LoadingBar() {
  return (
    <div className="w-full border h-4 bg-[#ff6100]/50 rounded-t-[16px]  overflow-hidden relative">
      <div
        className="h-full border bg-[--text-brand] absolute rounded-t-[16px] "
        style={{
          animation: "slideLeft 0.8s linear infinite",
          width: "100%",
        }}
      ></div>
    </div>
  );
}

export default LoadingBar;

import { useState } from "react";

function MiniSwitch({ onChange }) {
  const [toggleActive, setToggleActive] = useState(false);

  const handleToggle = () => {
    setToggleActive((prev) => !prev);
    onChange(toggleActive);
  };

  return (
    <div className="block w-[51px] h-[31px] bg-[--lines] rounded-3xl">
      <button
        type="submit"
        className={`h-[31px] w-[53px] rounded-3xl block p-[3px] ${
          toggleActive ? "bg-[--green] text-right" : "bg-[--lines] text-left"
        }`}
        onClick={handleToggle}
      >
        <span className="bg-white rounded-full h-[25px] w-[25px] inline-block shadow"></span>
      </button>
    </div>
  );
}

export default MiniSwitch;

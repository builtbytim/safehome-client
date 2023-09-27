"use client";

import { BsX } from "react-icons/bs";

function CancelButton() {
  return (
    <BsX
      onClick={() => {
        window.history.back();
      }}
      className="text-3xl transitioning hover:scale-[1.1] text-[#8D4000] cursor-pointer"
    />
  );
}

export default CancelButton;

import React from "react";
import Overlay2 from "../../Overlay2";
import { Slide } from "react-reveal";
import { BiX } from "react-icons/bi";

function GoalOverview() {
  return (
    <Overlay2 pos="center">
      <Slide right duration={300} delay={200}>
        <section
          className={
            "w-full md:max-w-[493px] bg-white md:h-[90vh] h-[100vh] z-40 px-6 py-6"
          }
        >
          <div className="flex flex-row justify-end items-center">
            <div className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--lines] transitioning">
              <BiX className="text-[--primary] text-xl" />
            </div>
          </div>
        </section>
      </Slide>
    </Overlay2>
  );
}

export default GoalOverview;

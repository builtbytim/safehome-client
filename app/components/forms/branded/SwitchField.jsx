"use client";

import Switch from "react-switch";
import { useState } from "react";

function SwitchField({ handleChange, defaultChecked = false, color }) {
  const [checked, setChecked] = useState(defaultChecked);

  function _handleChange(v) {
    setChecked(v);

    if (typeof handleChange === "function") handleChange(v);
  }
  return (
    <Switch
      onColor={color || "#ff9100"}
      onChange={_handleChange}
      checked={checked}
      checkedIcon={false}
      uncheckedIcon={false}
    />
  );
}

export default SwitchField;

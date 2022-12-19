import { useState } from "react";
import { Switch as MuiSwitch } from "@mui/material";

interface OveractSwitchProps {
    label: string,
    setInput: Function,
}

export default function Switch({ label, setInput }: OveractSwitchProps) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center">
      <MuiSwitch color="primary"
        inputProps={{'aria-label': label}}
        checked={enabled}
        onChange={() => {
          setEnabled(!enabled);
          setInput(!enabled);
        }}
      />
    </div>
  );
}

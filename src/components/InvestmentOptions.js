import React from "react";
import { Select, useRadioGroup, option } from "@chakra-ui/react";

const options = [
  {
    label: "14 days unlocked",
    value: "14_unlocked",
  },
  {
    label: "21 days unlocked",
    value: "21_unlocked",
  },
  {
    label: "30 days unlocked",
    value: "30_unlocked",
  },
  {
    label: "14 days locked",
    value: "14_unlocked",
  },
  {
    label: "21 days locked",
    value: "21_unlocked",
  },
  {
    label: "30 days locked",
    value: "30_unlocked",
  },
];
export default function InvestmentOptions() {
  return (
    <Select>
      {options.map(({ value, label }) => {
        return <option value={value}>{label}</option>;
      })}
    </Select>
  );
}

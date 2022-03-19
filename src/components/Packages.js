import React, { useState } from "react";
import {
  Flex,
  useColorModeValue,
  Text,
  Heading,
  Image,
  Box,
  Circle,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
} from "@chakra-ui/react";

import { UnlockIcon, LockIcon, ArrowRightIcon } from "@chakra-ui/icons";
import PackageCard from "./PackageCard";

export const packagesOptions = [
  {
    label: "SAVINGS",
    value: 14,
    isLocked: false,
  },
  {
    label: "CLASSICS",
    value: 21,
    isLocked: false,
  },
  {
    label: "PREMIUM",
    value: 28,
    isLocked: false,
  },
  {
    label: "SILVER",
    value: 14,
    isLocked: true,
  },
  {
    label: "GOLD",
    value: 21,
    isLocked: true,
  },
  {
    label: "PLATINUM",
    value: 28,
    isLocked: true,
  },
];

export default function Packages() {
  return (
    <Flex wrap="wrap" maxW="1200px">
      {packagesOptions.map((item, index) => (
        <PackageCard
          key={`${item.value}-${item.label}`}
          index={index}
          {...item}
        />
      ))}
    </Flex>
  );
}

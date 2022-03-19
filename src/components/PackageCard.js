import React, { useState } from "react";
import {
  Flex,
  useColorModeValue,
  Text,
  Heading,
  Image,
  Box,
  Circle,
  Square,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
} from "@chakra-ui/react";

import { UnlockIcon, LockIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import PackageInvestmentButton from "./PackageInvestmentButton";

function getResult({ plan, deposit, percent, days }) {
  let profit = 0;

  if (plan < 3) {
    profit = ((deposit * percent) / 1000) * days;
  } else if (plan < 6) {
    for (let i = 0; i < days; i++) {
      profit = profit + ((deposit + profit) * percent) / 1000;
    }
  }
  return profit.toFixed(2);
}

const plans = [
  {
    time: 14,
    percent: 96,
  },
  {
    time: 21,
    percent: 101,
  },
  {
    time: 28,
    percent: 107,
  },
  {
    time: 14,
    percent: 96,
  },
  {
    time: 21,
    percent: 101,
  },
  {
    time: 28,
    percent: 107,
  },
];

const startTime = process.env.START_TIME;
const timestamp = Date.now();

function getPercent(plan) {
  if (timestamp > startTime) {
    return plans[plan].percent + (5 * (timestamp - startTime)) / 86400000;
  } else {
    return plans[plan].percent;
  }
}

export default function PackageCard({ isLocked, label, value, index }) {
  const [deposit, setDeposit] = useState("0");
  const data = getPercent(index);

  function onChange(event) {
    setDeposit(event.target.value);
  }

  return (
    <Flex
      direction="column"
      justify="space-between"
      role={"group"}
      p={6}
      m={6}
      bg={useColorModeValue("white", "yellow.200")}
      boxShadow={"2xl"}
      rounded={"lg"}
      zIndex={1}
      flex={1}
    >
      <Flex justify="space-between">
        <Text
          color={"gray.500"}
          fontSize={"sm"}
          textTransform={"uppercase"}
          paddingBottom={1}
          marginBottom={4}
          textAlign="left"
        >
          {label}
        </Text>
        {isLocked ? <LockIcon /> : <UnlockIcon />}
      </Flex>
      <Flex justify="space-between">
        <Box textAlign="left">
          <Text fontSize={"md"}>Daily Earnings</Text>
          <Text
            fontSize={"md"}
            color={useColorModeValue("teal.800", "white")}
            fontWeight="bold"
          >
            {(data / 10).toFixed(2)}%
          </Text>
        </Box>
        <Box textAlign="left">
          <Text fontSize={"md"}>Total ROI</Text>
          <Text
            fontSize={"md"}
            color={useColorModeValue("teal.800", "white")}
            fontWeight="bold"
          >
            {getResult({
              plan: index,
              days: value,
              deposit: 100,
              percent: data,
            })}%
          </Text>
        </Box>
      </Flex>
      <Flex justify="center" mt={8}>
        <Square size="60px" bg="#F0B90B" color="black">
          <Box>
            <Text fontSize={"lg"}>{value}</Text>
            <Text fontSize={"sm"}>Days</Text>
          </Box>
        </Square>
      </Flex>
      <Flex mt={8}>
        <Box mb={6} mr={8}>
          <Text color="gray.500" fontSize="sm" mb={1} textAlign="left">
            Enter Amount BNB
          </Text>
          <InputGroup w="200px">
            <InputLeftAddon
              children={<Image width="18px" src="/assets/avax.svg" />}
            />
            <Input type="text" placeholder="0.1" onChange={onChange} />
          </InputGroup>
        </Box>
        <Box textAlign="left">
          <Text fontSize="sm">ROI in {value} Days</Text>
          <Text fontSize="lg">
            {getResult({
              plan: index,
              days: value,
              deposit: Number(deposit),
              percent: data,
            })}
          </Text>
        </Box>
      </Flex>
      <PackageInvestmentButton
        plan={index}
        deposit={deposit}
        hasStarted={timestamp > startTime}
      />
    </Flex>
  );
}

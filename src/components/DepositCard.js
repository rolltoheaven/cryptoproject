import React, { useState } from "react";
import {
  Flex,
  useColorModeValue,
  Text,
  Skeleton,
  Image,
  Box,
  Circle,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
} from "@chakra-ui/react";

import { UnlockIcon, LockIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import ComingSoon from "./ComingSoon";
import useGetUserDepositInfo from "../hooks/useGetUserDepositInfo";
import { packagesOptions } from "./Packages";

export default function DepositCard({ index }) {
  const { data, loading } = useGetUserDepositInfo(index);
  const { plan, amount, profit, finish } = data || {};
  const { isLocked, label, value } = packagesOptions?.[plan] || {};
  return (
    <Flex
      direction="column"
      justify="space-between"
      role={"group"}
      p={6}
      m={6}
      bg={useColorModeValue("white", "teal.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      zIndex={1}
      flex={["1", "1", "0 1 25%"]}
      minW="300px"
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
      <Flex justify="center" mt={8}>
        <Circle size="70px" bg="tomato" color="white">
          <Box>
            <Text fontSize={"lg"}>{value}</Text>
            <Text fontSize={"sm"}>Days</Text>
          </Box>
        </Circle>
      </Flex>
      <Flex justify="space-between" mt={4}>
        <Box textAlign="left">
          <Text
            fontSize="md"
            color={useColorModeValue("teal.800", "white")}
            fontWeight="bold"
          >
            {amount}
          </Text>
          <Text fontSize="sm">BNB</Text>
        </Box>
        <Box textAlign="left">
          <Text
            fontSize="md"
            color={useColorModeValue("teal.800", "white")}
            fontWeight="bold"
          >
            {profit}
          </Text>
          <Text fontSize="sm">BNB</Text>
        </Box>
      </Flex>
      <Skeleton isLoaded={!loading}>
        <ComingSoon countdownDate={finish} />
      </Skeleton>
    </Flex>
  );
}

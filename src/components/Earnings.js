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
  Skeleton,
  Button,
} from "@chakra-ui/react";

import { UnlockIcon, LockIcon, ArrowRightIcon } from "@chakra-ui/icons";
import useGetUserTotalDeposits from "../hooks/useGetUserTotalDeposits";
import useGetUserAvailable from "../hooks/useGetUserAvailable";
import WithdrawInvestmentButton from "./WithdrawInvestmentButton";

export default function Earnings({ isLocked }) {
  const { loading, data, error } = useGetUserTotalDeposits();
  const { loading: availableLoading, data: available } = useGetUserAvailable();
  return (
    <Flex
      direction="column"
      justify="space-between"
      role={"group"}
      p={6}
      m={6}
      bg={useColorModeValue("white", "teal.800")}
      boxShadow="2xl"
      rounded="lg"
      zIndex={1}
      w={["100%", "100%", "auto"]}
    >
      <Box textAlign="left">
        <Text fontSize="sm">Staked BNB</Text>
        <Skeleton isLoaded={!loading}>
          <Text fontSize="2xl" fontWeight="bold">
            {data}
          </Text>
        </Skeleton>
      </Box>
      <Box textAlign="left" mt={8} mb={20}>
        <Text fontSize="sm">Available BNB for withdraw</Text>
        <Skeleton isLoaded={!availableLoading}>
          <Text fontSize="2xl" fontWeight="bold">
            {available}
          </Text>
        </Skeleton>
      </Box>
      <WithdrawInvestmentButton />
    </Flex>
  );
}

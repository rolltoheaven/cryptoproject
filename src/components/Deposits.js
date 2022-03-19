import React, { useState } from "react";
import { Flex, Skeleton, Text } from "@chakra-ui/react";

import { UnlockIcon, LockIcon, ArrowRightIcon } from "@chakra-ui/icons";
import DepositCard from "./DepositCard";
import useGetUserAmountOfDeposits from "../hooks/useGetUserAmountOfDeposits";

export default function Deposits() {
  const { data, loading } = useGetUserAmountOfDeposits();
  return (
    <Flex flexFlow="row wrap" justify="center" maxW="1200px">
      {data ? (
        [...Array(data)].map((item, index) => (
          <Skeleton isLoaded={!loading}>
            <DepositCard key={`deposit-${index}`} index={index} />
          </Skeleton>
        ))
      ) : (
        <Text>No investments so far!</Text>
      )}
    </Flex>
  );
}

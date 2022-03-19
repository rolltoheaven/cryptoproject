import React from "react";
import {
  Flex,
  useColorModeValue,
  Text,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import useContractBalance from "../hooks/useContractBalance";

export default function GlobalStats() {
  const { loading, data } = useContractBalance();
  return (
    <Flex justify="space-evenly" align="center" w={["90%", "70%", "70%"]} flexWrap="wrap" mt={12}>
      <Heading flex={1} minW="300px">
        Stake Your BNB & Earn up to 20% Daily
      </Heading>
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
        flex={1}
      >
        <Text
          color={"gray.500"}
          fontSize={"sm"}
          textTransform={"uppercase"}
          borderBottom="1px solid"
          paddingBottom={1}
          marginBottom={4}
          textAlign="left"
        >
          GLOBAL STATS
        </Text>
        <Text fontSize={"md"}>Total Contract Balance</Text>
        <Skeleton isLoaded={!loading}>
          <Text
            fontSize={"md"}
            color={useColorModeValue("teal.800", "white")}
            fontWeight="bold"
          >
            {data} BNB
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
}

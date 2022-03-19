import React from "react";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  InputGroup,
  Flex,
  InputLeftAddon,
  Input,
  Image,
  Button,
} from "@chakra-ui/react";
import { ArrowRightIcon } from '@chakra-ui/icons'


import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

export default function ClaimInvestment() {
  const { contractInterface, getNumOfMessages, getOwnMessages } =
    useAvaxboxContext();

  return (
    <Center py={12} w={["90%", "60%"]}>
      <Flex
        direction="row"
        justify="space-between"
        role={"group"}
        w="100%"
        p={6}
        bg={useColorModeValue("white", "teal.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        zIndex={1}
      >
        <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
          Total Staked 1000
        </Text>
        <Text fontSize={"md"} color="white">
          Available 100BNB for withdraw
        </Text>
        <Button rightIcon={<ArrowRightIcon />} colorScheme='pink' variant='solid'>Claim</Button>
      </Flex>
    </Center>
  );
}

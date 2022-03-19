import React from "react";
import { Box, Flex, VStack, useColorMode } from "@chakra-ui/react";
import { useAuthContext } from "../context/auth/authContext";
import { ACCOUNTS_ERROR } from "../context/auth/authReducer";
import Header from "../components/Header";
import Investments from "../components/Investments";
import MakeInvestment from "../components/MakeInvestment";
import ClaimInvestment from "../components/ClaimInvestment";

export default function Home() {
  const { colorMode } = useColorMode();
  const { authState } = useAuthContext();
  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  const hasAccountError =
    authState.status === ACCOUNTS_ERROR || authState.error;

  return (
    <Box
      textAlign="center"
      fontSize="xl"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
    >
      <Flex minH="100vh" p={3} direction="column">
        <Header />
        <VStack spacing={8}>
          <MakeInvestment />
          <ClaimInvestment />
          <Investments />
        </VStack>
      </Flex>
    </Box>
  );
}

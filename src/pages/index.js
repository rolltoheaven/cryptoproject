import React, { useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  useColorMode,
  Button,
  Text,
  AlertIcon,
  Alert,
  Link,
} from "@chakra-ui/react";
import Web3Modal from "web3modal";
import dynamic from "next/dynamic";
import { useAuthContext } from "../context/auth/authContext";
import { ACCOUNTS_ERROR } from "../context/auth/authReducer";
import GlobalStats from "../components/GlobalStats";
import Earnings from "../components/Earnings";
import Referral from "../components/Referral";
import Packages from "../components/Packages";
import Deposits from "../components/Deposits";

import { providerOptions } from "../utilities/providerOptions";

const Header = dynamic(() => import("../components/Header"), {
  SSR: false,
});

export default function Home() {
  const { colorMode } = useColorMode();
  const { authState } = useAuthContext();
  const bgColor = { light: "orange.50", dark: "yellow.900" };

  const color = { light: "black", dark: "white" };
  useEffect(async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    await web3Modal.connect();
  }, []);

  return (
    <Box
      textAlign="center"
      fontSize="xl"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
    >
      <Flex minH="100vh" p={3} direction="column">
        {authState.isWrongWallet && (
          <Text mb={8} fontSize="xl" color="red">
            Wrong network, BNB only
          </Text>
        )}
        {/* <Box w="100%" mb={6}>
          <Alert status="info">
            <AlertIcon />
            <Flex w="100%" justify="center">
              <Link href="https://t.me/FuryStaker_Official" isExternal>
                Click on Telegram @FuryStaker_official
              </Link>
            </Flex>
          </Alert>
        </Box> */}
        <Header />
        <VStack spacing={8}>
          <Flex justify="space-evenly" w="70%" mt={12} flexWrap="wrap">
            {/* <Button
              as="a"
              target="_blank"
              href="https://medium.com/@Furystaker/Furystaker-io-earn-up-to-21-daily-by-staking-bnb-tokens"
              bg="transparent"
            >
              Documentation
            </Button> */}
            <Button as="a" href="/">
              Dashboard
            </Button>
            <Button
              as="a"
              target="_blank"
              href="https://hazecrypto.net/audit/Furystaker"
              bg="transparent"
            >
              Audit
            </Button>
            <Button
              as="a"
              target="_blank"
              href={`https://bscscan.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
              bg="transparent"
            >
              Contract
            </Button>
            <Button
              as="a"
              target="_blank"
              href="https://t.me/FuryStaker_Official"
              bg="transparent"
            >
              Telegram
            </Button>
          </Flex>
          {/* <GlobalStats /> */}
          <Box textAlign="left">
            <Text fontSize="xl">Packages</Text>
          </Box>
          {authState.isWrongWallet && (
            <Text mb={8} fontSize="xl" color="red">
              Wrong network, BNB only
            </Text>
          )}
          <Packages />
          <Box textAlign="left">
            <Text fontSize="xl">Earnings</Text>
          </Box>
          <Flex flexWrap="wrap">
            <Earnings />
            <Referral />
          </Flex>
          <Box textAlign="left">
            <Text fontSize="xl">Deposits</Text>
          </Box>
          <Deposits />
        </VStack>
      </Flex>
    </Box>
  );
}

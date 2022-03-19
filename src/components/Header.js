import React, { useEffect, useState } from "react";
import { Flex, Button, Text, Skeleton, Image } from "@chakra-ui/react";
import { useAuthContext } from "../context/auth/authContext";
import { ACCOUNTS_FETCHED } from "../context/auth/authReducer";
import compressAddress from "../utilities/compressAddress";
import useFetch from "../hooks/useFetch";
import useWeb3Modal from "../hooks/useWeb3Modal";
import useGetTotalStaked from "../hooks/useGetTotalStaked";
import Web3Modal from "web3modal";
import { providerOptions } from "../utilities/providerOptions";

function Header() {
  const { authState, connectWallet } = useAuthContext();
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  // const [totalStaked, setTotalStaked] = useState(0);
  const { data: totalStaked, loading: stakedLoading } = useGetTotalStaked();
  const { data, loading, error } = useFetch("/api/price");
  const isConnected = [ACCOUNTS_FETCHED].includes(authState.status);
  const connectText = authState.isLoading
    ? "Connecting"
    : isConnected
    ? compressAddress(authState.data[0])
    : "Connect Wallet";

  const disconnect = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    await web3Modal.clearCachedProvider();
  };

  return (
    <Flex justify={["center", "space-between"]} align="center" wrap="wrap">
      <Flex width="145px" height="82px" align="baseline">
        <Image src="/assets/FURY.gif" />
      </Flex>
      <Flex direction="column" justify="center">
        <Text pr={2} fontSize="sm">
          BNB price
        </Text>
        <Skeleton isLoaded={!loading}>
          <Text pr={2} fontSize="sm">
            ${data?.USD}
          </Text>
        </Skeleton>
      </Flex>
      <Flex direction="column" justify="center" mb={3}>
        <Text pr={2} fontSize="sm">
          TOTAL INVESTED AMOUNT
        </Text>
        <Flex justify="center">
          <Skeleton isLoaded={!stakedLoading}>
            <Text pr={2} fontSize="sm">
              {Number(totalStaked).toFixed(4)}
            </Text>
          </Skeleton>
          <Image width="18px" src="/assets/avax.svg" />
        </Flex>
      </Flex>
      <Flex align="center">
        {isConnected && (
          <Flex pr={3} align="center">
            <Skeleton isLoaded={authState?.balance !== null}>
              <Text pr={2} fontSize="sm">
                {authState?.balance}
              </Text>
            </Skeleton>
            <Image width="18px" src="/assets/avax.svg" />
          </Flex>
        )}
        <Button
          colorScheme="teal"
          disabled={authState.isLoading}
          onClick={isConnected ? logoutOfWeb3Modal : loadWeb3Modal}
        >
          {connectText}
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;

import React, { useState } from "react";
import {
  Flex,
  useColorModeValue,
  Text,
  Heading,
  Image,
  Box,
  IconButton,
  Skeleton,
  useToast,
} from "@chakra-ui/react";

import { UnlockIcon, CopyIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useAuthContext } from "../context/auth/authContext";
import useGetTotalReferrer from "../hooks/useGetTotalReferrer";
import useGetUserReferralTotalBonus from "../hooks/useGetUserReferralTotalBonus";
import useGetUserReferralWithdrawn from "../hooks/useGetUserReferralWithdrawn";

export default function Referral({ isLocked }) {
  const { authState } = useAuthContext();
  const toast = useToast();
  const { loading: loadingReferrer, data: dataReferrer } =
    useGetTotalReferrer();
  const { loading: loadingTotalReferrerBonus, data: totalReferrerBonusData } =
    useGetUserReferralTotalBonus();

  const {
    loading: loadingTotalReferrerWithdrawn,
    data: totalWithdrawnBonusData,
  } = useGetUserReferralWithdrawn();

  function copyToClipboard() {
    navigator.clipboard.writeText(
      `https://furystaker.io/?ref=${authState?.data?.[0]}`
    );
    toast({ description: "Copied to your Clipboard" });
  }

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
    >
      <Box textAlign="left">
        <Text fontSize="sm">Your Referral Link</Text>
        <Flex>
          <Flex bg="gray.100" flex={1} align="center" rounded="lg">
            <Text pl={3} fontSize={["xs", "sm"]} wordBreak="break-all">
              https://furystaker.io/?ref={authState?.data?.[0]}
            </Text>
          </Flex>
          <IconButton
            ml={4}
            aria-label="Search database"
            onClick={copyToClipboard}
            icon={<CopyIcon />}
          />
        </Flex>
      </Box>
      <Flex
        justify="space-between"
        wrap="wrap"
        flexDirection={["column", "column", "row"]}
      >
        <Box textAlign="left" mt={8}>
          <Text fontSize="sm">Total Referral Earned</Text>
          <Skeleton isLoaded={!loadingTotalReferrerBonus}>
            <Text fontSize="2xl" fontWeight="bold">
              {totalReferrerBonusData}
            </Text>
          </Skeleton>
          <Text fontSize="sm" mt={6}>
            Users Invited by You
          </Text>
          <Skeleton isLoaded={!loadingReferrer}>
            <Text fontSize="2xl" fontWeight="bold">
              {dataReferrer}
            </Text>
          </Skeleton>
        </Box>
        <Box textAlign="left" mt={8}>
          <Text fontSize="sm">Total Referral Withdrawn</Text>
          <Skeleton isLoaded={!loadingTotalReferrerWithdrawn}>
            <Text fontSize="2xl" fontWeight="bold">
              {totalWithdrawnBonusData}
            </Text>
          </Skeleton>
        </Box>
        <Box textAlign="left" maxW={["100%", "30%"]} mt={8}>
          <Text fontSize="sm">Furystaker Referral Info</Text>
          <Text fontSize="sm">You will receive:</Text>
          <Text fontSize="sm">5% from each level 1 referral deposits</Text>
          <Text fontSize="sm">2.5% from each level 2 referral deposits</Text>
          <Text fontSize="sm">0.5% from each level 3 referral deposits</Text>
          <Text fontSize="sm">
            Note! You need to have at least 1 deposit to start receive earnings
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

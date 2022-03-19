import React from "react";
import {
  Alert,
  AlertIcon,
  VStack,
  useColorMode,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import ComingSoon from "./ComingSoon";
import { useAuthContext } from "../context/auth/authContext";

export default function AlertInfo({ primary, secondary }) {
  const { authState } = useAuthContext();
  return (
    authState.isWrongWallet && (
      <Alert status="error" mb={8}>
        <AlertIcon />
        Wrong network connected, BNB only!
      </Alert>
    )
  );
}

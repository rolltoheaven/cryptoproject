import { useState } from "react";
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
import { ArrowForwardIcon } from '@chakra-ui/icons'

import InvestmentOptions from "./InvestmentOptions";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

export default function MakeInvestment() {
  const [formState, setFormState] = useState({
    text: "",
    value: "",
    receiver: "",
  });
  const [transactionState, setTransactionState] = useState({
    state: "initial",
    data: null,
    error: null,
  });

  const { sendMessage } = useAvaxboxContext();

  const handleInputChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));

    if (transactionState.state === "success") {
      setTransactionState({
        state: "initial",
        data: null,
        error: null,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setTransactionState((prevTransactionState) => ({
      ...prevTransactionState,
      state: "loading",
    }));

    const onSuccess = (data) => {
      setTransactionState({
        state: "success",
        data,
        error: null,
      });

      setFormState({
        text: "",
        value: "",
        receiver: "",
      });
    };

    const onError = (error) => {
      setTransactionState({
        state: "error",
        data: null,
        error,
      });
    };

    sendMessage({ messageData: formState, onSuccess, onError });
  };

  return (
    <>
      <Center py={12} as="form" onSubmit={handleSubmit} w={["90%", "60%"]}>
        <Flex
          direction="column"
          role={"group"}
          w="100%"
          p={6}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          zIndex={1}
        >
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Stake
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500} mb={6}>
            One click away
          </Heading>
          <Flex
            justify="space-around"
            direction={["column", "column", "row"]}
            flexWrap="wrap"
          >
            <Box mb={6}>
              <Text color={"gray.500"} fontSize={"sm"} mb={1}>
                Plan
              </Text>
              <InvestmentOptions />
            </Box>
            <Box mb={6}>
              <Text color={"gray.500"} fontSize={"sm"} mb={1}>
                Enter Amount BNB
              </Text>
              <InputGroup>
                <InputLeftAddon children="AVAX" />
                <Input type="tel" placeholder="Enter The Amount" />
              </InputGroup>
            </Box>
            <Box>
              <Text color={"gray.500"} fontSize={"sm"} mb={1}>
                ROI in Return
              </Text>
              <Text
                fontSize={"xl"}
                d="flex"
                justifyContent="center"
              >
                {100} <Image width="20px" src="/assets/avax.svg" pl={1} />
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="flex-end" mt={6}>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              type="submit"
              isLoading={transactionState.state === "loading"}
            >
              Invest
            </Button>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}

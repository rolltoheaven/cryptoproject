import { useEffect, useState } from "react";
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

import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

export default function Investments() {
  const [messages, setMessages] = useState({
    state: "loading",
    data: [],
    error: null,
  });
  const { contractInterface, getNumOfMessages, getOwnMessages } =
    useAvaxboxContext();

  useEffect(() => {
    const onGetMessagesSuccess = (fetchedMessages) => {
      setMessages({
        state: "success",
        data: fetchedMessages,
        error: null,
      });
    };

    const onGetNumOfMessagesSuccess = (numOfMessages) => {
      getOwnMessages({
        startIndex: 0,
        count: numOfMessages > 5 ? 5 : numOfMessages,
        onSuccess: onGetMessagesSuccess,
      });
    };

    if (contractInterface) {
      getNumOfMessages({
        onSuccess: onGetNumOfMessagesSuccess,
      });
    }
  }, [contractInterface, getNumOfMessages, getOwnMessages]);

  const renderInvestments = () => {
    if (!messages.data.length) {
      return <p>No investments yet</p>;
    }

    return messages.data.map(({ id, date, sender, text, value }) => (
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
          Unlocked
        </Text>
        <Text fontSize={"md"} color="white">
          Invested 100 BNB
        </Text>
        <Text fontSize={"md"} color="white">
          3 Days
        </Text>
        <Text color={"white"} fontSize={"xl"} d="flex" justifyContent="center">
          {100} <Image width="22px" src="/assets/avax.svg" pl={1} />
        </Text>
      </Flex>
    ));
  };

  return (
    <Center py={12} w={["90%", "60%"]}>
      {renderInvestments()}
    </Center>
  );
}

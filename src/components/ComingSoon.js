import React, { useState, useEffect } from "react";
import { Flex, Button, Text, Heading, Image } from "@chakra-ui/react";
import { calculateCountdownFromNow } from "../utilities/countdown";

function ComingSoon({ countdownDate = 0, ...props }) {
  const [
    {
      expired,
      values: { days, hours, minutes, seconds },
    },
    setResult,
  ] = useState(() => calculateCountdownFromNow(countdownDate));

  useEffect(() => {
    if (expired) return undefined;
    const intervalId = setInterval(
      () => setResult(calculateCountdownFromNow(countdownDate)),
      1000
    );
    return () => {
      clearInterval(intervalId);
    };
  }, [expired]);
  return (
    <Text mt={8} fontSize="sm" {...props}>
      {days}d {hours}h {minutes}m {seconds}s
    </Text>
  );
}

export default ComingSoon;

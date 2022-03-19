import React, { useState, useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { ethers, utils } from "ethers";

import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

const WithdrawInvestmentButton = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { contractInterface } = useAvaxboxContext();

  async function makeWithdraw() {
    try {
      setLoading(true);
      await contractInterface.withdraw();
      toast({ description: "Withdraw was successful!", status: "success" });
    } catch (error) {
      console.log(error);
      toast({
        description: error?.message || "There was an error",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      rightIcon={<ArrowRightIcon />}
      colorScheme="green"
      type="submit"
      isLoading={loading}
      onClick={makeWithdraw}
    >
      Withdraw
    </Button>
  );
};

export default WithdrawInvestmentButton;

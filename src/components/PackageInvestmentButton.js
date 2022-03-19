import React, { useState, useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

import { ethers, utils } from "ethers";

import { useAuthContext } from "../context/auth/authContext";
import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

const PackageInvestmentButton = ({ deposit, plan, hasStarted }) => {
  const { authState } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { contractInterface, getNumOfMessages, getOwnMessages } =
    useAvaxboxContext();
  const router = useRouter();
  const { ref = "0xd53Fa131a0F67E98fc17B18156FeCA42338A0c57" } = router.query;

  async function makeDeposit() {
    try {
      setLoading(true);
      const options = {};
      if (deposit) {
        options.value = utils.parseEther(deposit);
      }
      await contractInterface.invest(ref, plan, options);
      toast({ description: "Deposit was successful!", status: "success" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({ description: "There was an error", status: "error" });
    }
  }

  return (
    <Button
      rightIcon={<ArrowForwardIcon />}
      colorScheme="green"
      type="submit"
      isLoading={loading}
      onClick={makeDeposit}
      disabled={authState.isWrongWallet}
    >
      Invest
    </Button>
  );
};

export default PackageInvestmentButton;

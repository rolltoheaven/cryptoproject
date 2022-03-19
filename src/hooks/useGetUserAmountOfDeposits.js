import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuthContext } from "../context/auth/authContext";
import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

const useGetUserAmountOfDeposits = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contractInterface, getNumOfMessages, getOwnMessages } =
    useAvaxboxContext();
  const { authState } = useAuthContext();

  async function getUserAmountOfDeposits() {
    try {
      setLoading(true);
      const tx = await contractInterface.getUserAmountOfDeposits(
        authState?.data?.[0]
      );
      setData(tx.toNumber());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (contractInterface) {
      getUserAmountOfDeposits();
    }
  }, [contractInterface, authState?.data]);

  return { data, loading, error };
};

export default useGetUserAmountOfDeposits;

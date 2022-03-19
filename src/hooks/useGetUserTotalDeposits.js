import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuthContext } from "../context/auth/authContext";
import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

const useGetUserTotalDeposits = () => {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contractInterface, getNumOfMessages, getOwnMessages } =
    useAvaxboxContext();
  const { authState } = useAuthContext();

  async function getUserTotalDeposits() {
    try {
      setLoading(true);
      const tx = await contractInterface.getUserTotalDeposits(
        authState?.data?.[0]
      );
      const balance =
        Math.round(ethers.utils.formatEther(tx) * 1e4) / 1e4;
      setData(balance);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (contractInterface) {
      getUserTotalDeposits();
    }
  }, [contractInterface, authState?.data]);

  return { data, loading, error };
};

export default useGetUserTotalDeposits;
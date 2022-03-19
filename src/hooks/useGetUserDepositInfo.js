import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuthContext } from "../context/auth/authContext";
import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

const useGetUserDepositInfo = (index) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contractInterface } = useAvaxboxContext();
  const { authState } = useAuthContext();

  async function getUserDepositInfo() {
    try {
      setLoading(true);
      const tx = await contractInterface.getUserDepositInfo(
        authState?.data?.[0],
        index
      );
      setData({
        amount: Math.round(ethers.utils.formatEther(tx.amount) * 1e4) / 1e4,
        profit: Math.round(ethers.utils.formatEther(tx.profit) * 1e4) / 1e4,
        plan: tx.plan,
        start: tx.start.toNumber(),
        finish: tx.finish.toNumber(),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (contractInterface) {
      getUserDepositInfo();
    }
  }, [contractInterface, index, authState?.data]);

  return { data, loading, error };
};

export default useGetUserDepositInfo;

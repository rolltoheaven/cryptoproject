import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuthContext } from "../context/auth/authContext";
import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

const useGetTotalReferrer = () => {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contractInterface, getNumOfMessages, getOwnMessages } =
    useAvaxboxContext();
  const { authState } = useAuthContext();

  async function getTotalReferrer() {
    try {
      setLoading(true);
      const tx = await contractInterface.getUserDownlineCount(
        authState?.data?.[0]
      );
      // setData(tx.map((item) => item.toNumber()));
      const sum = tx.reduce(
        (partialSum, item) => partialSum + item.toNumber(),
        0
      );
      console.log("sumsumsum", sum);
      setData(sum);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (contractInterface) {
      getTotalReferrer();
    }
  }, [contractInterface, authState?.data]);

  return { data, loading, error };
};

export default useGetTotalReferrer;

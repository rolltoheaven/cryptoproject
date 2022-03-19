import { useState, useEffect } from "react";
import { useAvaxboxContext } from "../context/avaxbox/avaxboxContext";

const useGetPercent = (plan) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contractInterface, getNumOfMessages, getOwnMessages } =
    useAvaxboxContext();

  async function getPercentData() {
    try {
      setLoading(true);
      const tx = await contractInterface.getPercent(plan);
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
      getPercentData();
    }
  }, [plan, contractInterface]);

  return { data, loading, error };
};

export default useGetPercent;

import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useContractBalance = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getContractBalance() {
    try {
      setLoading(true);
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      const providerAddress = process.env.NEXT_PUBLIC_PROVIDER_ADDRESS;
      const provider = new ethers.providers.JsonRpcProvider(providerAddress);
      const rawBalance = await provider.getBalance(contractAddress);
      const balance =
        Math.round(ethers.utils.formatEther(rawBalance) * 1e4) / 1e4;
      setData(balance);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContractBalance();
  }, []);

  return { data, loading };
};

export default useContractBalance;

import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import avaxboxContract from "../../artifacts/contracts/Furystaker.sol/Furystaker.json";

const useGetTotalStaked = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getTotalStaked() {
    try {
      setLoading(true);
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      const providerAddress = process.env.NEXT_PUBLIC_PROVIDER_ADDRESS;
      const provider = new ethers.providers.JsonRpcProvider(providerAddress);
      const contract = new ethers.Contract(
        contractAddress,
        avaxboxContract.abi,
        provider
      );
      const tx = await contract.totalStaked();
      const totalStaked = utils.formatEther(tx).toString();
      setData(totalStaked);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTotalStaked();
  }, []);

  return { data, loading };
};

export default useGetTotalStaked;

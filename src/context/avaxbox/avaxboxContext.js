import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers, utils } from "ethers";
import Web3Modal from "web3modal";

import { useAuthContext } from "../auth/authContext";
import avaxboxContract from "../../../artifacts/contracts/Furystaker.sol/Furystaker.json";

import { providerOptions } from "../../utilities/providerOptions";

const AvaxboxContext = createContext();

export const AvaxboxProvider = ({ children }) => {
  const { authState } = useAuthContext();
  // Create a state variable to hold an instance of the Avaxbox contract
  const [contractInterface, setContractInterface] = useState();

  useEffect(async () => {
    // If user is connected to site via MetaMask
    if (authState.data.length) {
      // Get the current provider (defaults to the currently selected network)
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
      });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      // Get the signer (defaults to the currently selected account)
      const signer = provider.getSigner();

      // This address will be different for every network
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      // Initialise the contract instance
      const contract = new ethers.Contract(
        contractAddress,
        avaxboxContract.abi,
        signer
      );

      // Store this instance in the state
      setContractInterface(contract);
    }
  }, [authState.data]);

  const sendMessage = useCallback(
    async ({ messageData, onSuccess, onError }) => {
      try {
        const { receiver, text, value } = messageData;
        const timestamp = Date.now();
        const overrides = {};

        // If user is sending some AVAX
        if (value) {
          overrides.value = utils.parseEther(value);
        }

        const tx = await contractInterface.sendMessage(
          receiver,
          text,
          timestamp,
          overrides
        );
        // We have to wait for the transaction to be mined and added to a block
        await tx.wait();

        if (onSuccess && typeof onSuccess === "function") onSuccess(tx);
      } catch (error) {
        if (onError && typeof onError === "function") onError(error);
      }
    },
    [contractInterface]
  );

  const getNumOfMessages = useCallback(
    async ({ onSuccess, onError }) => {
      try {
        const tx = await contractInterface.getNumOfMessages();
        const numOfMessages = tx?.toNumber();

        if (onSuccess && typeof onSuccess === "function")
          onSuccess(numOfMessages);
      } catch (error) {
        if (onError && typeof onError === "function") onError(error);
      }
    },
    [contractInterface]
  );

  const getTotalStakedAmount = useCallback(
    async ({ onSuccess, onError }) => {
      try {
        const tx = await contractInterface.totalStaked();
        const totalStaked = utils.formatEther(tx).toString();

        if (onSuccess && typeof onSuccess === "function") {
          onSuccess(totalStaked);
        }
      } catch (error) {
        if (onError && typeof onError === "function") {
          onError(error);
        }
      }
    },
    [contractInterface]
  );

  const getOwnMessages = useCallback(
    async ({ startIndex, count, onSuccess, onError }) => {
      try {
        const tx = await contractInterface.getOwnMessages(startIndex, count);

        const ownMessages = tx
          .map(({ id, timestamp, receiver, sender, text, valueInWei }) => {
            const date = new Date(timestamp.toNumber());

            const formattedValueInnAvax = valueInWei.toString();
            const parsedValueInAVAX = utils
              .formatEther(formattedValueInnAvax)
              .toString();

            return {
              id: id.toNumber(),
              date,
              receiver,
              sender,
              text,
              value: parsedValueInAVAX,
            };
          })
          .sort((txA, txB) => {
            if (txA.date < txB.date) return 1;
            if (txA.date > txB.date) return -1;
            return 0;
          });

        if (onSuccess && typeof onSuccess === "function")
          onSuccess(ownMessages);
      } catch (error) {
        if (onError && typeof onError === "function") onError(error);
      }
    },
    [contractInterface]
  );

  const contextData = {
    contractInterface,
    sendMessage,
    getNumOfMessages,
    getOwnMessages,
    getTotalStakedAmount,
  };

  return (
    <AvaxboxContext.Provider value={contextData}>
      {children}
    </AvaxboxContext.Provider>
  );
};

export const useAvaxboxContext = () => useContext(AvaxboxContext);

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {
  ACCOUNTS_CHANGED,
  ACCOUNTS_ERROR,
  ACCOUNTS_FETCHED,
  FETCHING_ACCOUNTS,
} from "./authReducer";

import { providerOptions } from "../../utilities/providerOptions";

export const errorStatuses = {
  NO_ETHEREUM_FOUND: "NO_ETHEREUM_FOUND",
  NO_ACCOUNTS_FOUND: "NO_ACCOUNTS_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
};

const handleAccount = async ({ dispatch, accounts, isChanged, balance, chainId }) => {
  try {
    if (accounts.length === 0) {
      dispatch({
        type: ACCOUNTS_ERROR,
        payload: errorStatuses.NO_ACCOUNTS_FOUND,
      });
    } else {
      dispatch({
        type: isChanged ? ACCOUNTS_CHANGED : ACCOUNTS_FETCHED,
        payload: {
          accounts,
          balance,
          chainId,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: ACCOUNTS_ERROR,
      payload: error,
    });
  }
};

export const getAccountsAction = async ({
  method,
  dispatch,
  contract,
  shouldReload = true,
}) => {
  const { ethereum } = window;

  if (shouldReload) {
    dispatch({ type: FETCHING_ACCOUNTS });
  }

  if (ethereum) {
    try {
      const accounts = await ethereum.request({ method });
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
      });
      const connection = await web3Modal.connect();
      if (accounts.length) {
        const provider = new ethers.providers.Web3Provider(connection);
        const rawBalance = await provider.getBalance(accounts[0]);
        const balance =
          Math.round(ethers.utils.formatEther(rawBalance) * 1e4) / 1e4;

        handleAccount({
          accounts,
          dispatch,
          contract,
          balance,
          chainId: provider?._network?.chainId,
        });
      } else {
        dispatch({
          type: ACCOUNTS_ERROR,
          payload: errorStatuses.NO_ACCOUNTS_FOUND,
        });
      }
    } catch (error) {
      dispatch({
        type: ACCOUNTS_ERROR,
        payload: error.code,
      });
    }
  } else {
    dispatch({
      type: ACCOUNTS_ERROR,
      payload: errorStatuses.NO_ETHEREUM_FOUND,
    });
  }
};

export const accountsChangedAction = async ({
  dispatch,
  accounts,
  onSuccess,
}) => {
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const rawBalance = await provider.getBalance(accounts[0]);
  const balance = Math.round(ethers.utils.formatEther(rawBalance) * 1e4) / 1e4;
  await handleAccount({
    accounts,
    dispatch,
    isChanged: true,
    balance,
    chainId: provider?._network?.chainId,
  });

  if (onSuccess && typeof onSuccess === "function") {
    onSuccess();
  }
};

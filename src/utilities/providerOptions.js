import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Furystaker",
      rpc: {
        43114: "https://api.avax.network/ext/bc/C/rpc",
      },
      chainId: 43114
    }
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      rpc: {
        43114: "https://api.avax.network/ext/bc/C/rpc",
      },
      chainId: 43114
    }
  }
};

const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0x38',
  chainName: 'Binance Mainnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 8,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
}

const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Testnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
}

const AVALANCHE_LOCAL_PARAMS = {
  chainId: '0xA868',
  chainName: 'Avalanche Local C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://localhost:9650/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
}

export default function addAvalancheNetwork(network) {
  window.ethereum
    .request({
      method: 'wallet_addEthereumChain',
      params: [
        network === 'main'
          ? AVALANCHE_MAINNET_PARAMS
          : network === 'test'
          ? AVALANCHE_TESTNET_PARAMS
          : AVALANCHE_LOCAL_PARAMS,
      ],
    })
    .catch((error) => {
      console.log(error)
    })
}

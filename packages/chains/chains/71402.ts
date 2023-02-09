export default {
  "name": "Godwoken Mainnet",
  "chain": "GWT",
  "rpc": [
    "https://v1.mainnet.godwoken.io/rpc"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "pCKB",
    "symbol": "pCKB",
    "decimals": 18
  },
  "infoURL": "https://www.nervos.org",
  "shortName": "gw-mainnet-v1",
  "chainId": 71402,
  "networkId": 71402,
  "explorers": [
    {
      "name": "GWScout Explorer",
      "url": "https://gw-mainnet-explorer.nervosdao.community",
      "standard": "none"
    },
    {
      "name": "GWScan Block Explorer",
      "url": "https://v1.gwscan.com",
      "standard": "none"
    }
  ],
  "testnet": false,
  "slug": "godwoken"
} as const;
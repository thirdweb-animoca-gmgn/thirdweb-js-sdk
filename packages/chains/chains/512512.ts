export default {
  "name": "CMP-Testnet",
  "chain": "CMP",
  "rpc": [
    "https://galaxy.block.caduceus.foundation",
    "wss://galaxy.block.caduceus.foundation"
  ],
  "faucets": [
    "https://dev.caduceus.foundation/testNetwork"
  ],
  "nativeCurrency": {
    "name": "Caduceus Testnet Token",
    "symbol": "CMP",
    "decimals": 18
  },
  "infoURL": "https://caduceus.foundation/",
  "shortName": "cmp",
  "chainId": 512512,
  "networkId": 512512,
  "explorers": [
    {
      "name": "Galaxy Scan",
      "url": "https://galaxy.scan.caduceus.foundation",
      "standard": "none"
    }
  ],
  "testnet": true,
  "slug": "cmp-testnet"
} as const;
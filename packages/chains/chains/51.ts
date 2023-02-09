export default {
  "name": "XDC Apothem Network",
  "chain": "XDC",
  "rpc": [
    "https://rpc.apothem.network",
    "https://erpc.apothem.network"
  ],
  "faucets": [
    "https://faucet.apothem.network"
  ],
  "nativeCurrency": {
    "name": "XinFin",
    "symbol": "TXDC",
    "decimals": 18
  },
  "infoURL": "https://xinfin.org",
  "shortName": "txdc",
  "chainId": 51,
  "networkId": 51,
  "icon": {
    "url": "ipfs://QmeRq7pabiJE2n1xU3Y5Mb4TZSX9kQ74x7a3P2Z4PqcMRX",
    "width": 1450,
    "height": 1450,
    "format": "png"
  },
  "explorers": [
    {
      "name": "xdcscan",
      "url": "https://apothem.xinfinscan.com",
      "icon": "blocksscan",
      "standard": "EIP3091"
    },
    {
      "name": "blocksscan",
      "url": "https://apothem.blocksscan.io",
      "icon": "blocksscan",
      "standard": "EIP3091"
    }
  ],
  "testnet": false,
  "slug": "xdc-apothem-network"
} as const;
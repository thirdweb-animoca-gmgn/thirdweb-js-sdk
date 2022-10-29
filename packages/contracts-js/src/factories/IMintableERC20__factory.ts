/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IMintableERC20,
  IMintableERC20Interface,
} from "../IMintableERC20";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "mintedTo",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantityMinted",
        type: "uint256",
      },
    ],
    name: "TokensMinted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IMintableERC20__factory {
  static readonly abi = _abi;
  static createInterface(): IMintableERC20Interface {
    return new utils.Interface(_abi) as IMintableERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMintableERC20 {
    return new Contract(address, _abi, signerOrProvider) as IMintableERC20;
  }
}
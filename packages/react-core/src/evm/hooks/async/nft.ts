import {
  requiredParamInvariant,
  RequiredParam,
} from "../../../core/query-utils/required-param";
import { useSDKChainId } from "../../providers/thirdweb-sdk-provider";
import {
  AirdropNFTParams,
  BurnNFTParams,
  MintNFTParams,
  MintNFTReturnType,
  MintNFTSupplyParams,
  TransferNFTParams,
  WalletAddress,
  NFTContract,
  getErcs,
} from "../../types";
import {
  cacheKeys,
  invalidateContractAndBalances,
} from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Erc1155, QueryAllParams, NFT } from "@thirdweb-dev/sdk";
import { BigNumber, BigNumberish } from "ethers";
import invariant from "tiny-invariant";

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get an individual NFT token of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nft, isLoading, error } = useNFT(contract, <tokenId>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param tokenId - the tokenId to look up
 * @returns a response object that includes the metadata for the given tokenId
 * @beta
 * @twfeature ERC721 | ERC1155
 */
export function useNFT<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
  tokenId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();
  const { erc721, erc1155 } = getErcs(contract);

  return useQueryWithNetwork<NFT>(
    cacheKeys.contract.nft.get(contractAddress, tokenId),
    async () => {
      requiredParamInvariant(contract, "No Contract instance provided");

      if (erc1155) {
        invariant(erc1155.get, "Contract instance does not support get");
        return await erc1155.get(BigNumber.from(tokenId || 0));
      }
      if (erc721) {
        invariant(erc721.get, "Contract instance does not support get");
        return await erc721.get(BigNumber.from(tokenId || 0));
      }
      invariant(false, "Unknown NFT type");
    },
    {
      enabled: !!erc721 || (!!erc1155 && tokenId !== undefined),
    },
  );
}

/**
 * Use this to get a list of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @twfeature ERC721Supply | ERC1155Enumerable
 * @beta
 */
export function useNFTs<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
  queryParams?: QueryAllParams,
) {
  const contractAddress = contract?.getAddress();
  const { erc721, erc1155 } = getErcs(contract);

  return useQueryWithNetwork<NFT[]>(
    cacheKeys.contract.nft.query.all(contractAddress, queryParams),
    async () => {
      requiredParamInvariant(contract, "No Contract instance provided");

      if (erc721) {
        invariant(erc721.getAll, "Contract instance does not support getAll");
        return await erc721.getAll(queryParams);
      }
      if (erc1155) {
        invariant(erc1155.getAll, "Contract instance does not support getAll");
        return await erc1155.getAll(queryParams);
      }
      invariant(false, "Unknown NFT type");
    },
    {
      enabled: !!erc721 || !!erc1155,
    },
  );
}

/**
 * Use this to get the total count of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: count, isLoading, error } = useTotalCount(contract);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that includes the total count of NFTs
 * @beta
 * @twfeature ERC721Supply | ERC1155Enumerable
 */
export function useTotalCount<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
) {
  const contractAddress = contract?.getAddress();
  const { erc721, erc1155 } = getErcs(contract);

  return useQueryWithNetwork<BigNumber>(
    cacheKeys.contract.nft.query.totalCount(contractAddress),
    async () => {
      requiredParamInvariant(contract, "No Contract instance provided");

      if (erc1155) {
        invariant(
          erc1155.totalCount,
          "Contract instance does not support totalCount",
        );
        return await erc1155.totalCount();
      }
      if (erc721) {
        invariant(
          erc721.totalCount,
          "Contract instance does not support totalCount",
        );
        return await erc721.totalCount();
      }
      invariant(false, "Unknown NFT type");
    },
    {
      enabled: !!erc721 || !!erc1155,
    },
  );
}

/**
 * Use this to get a the total (minted) supply of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalCirculatingSupply, isLoading, error } = useTotalCirculatingSupply(contract);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that incudes the total minted supply
 * @beta
 * @twfeature ERC721Supply | ERC1155Enumerable
 */
export function useTotalCirculatingSupply(
  contract: RequiredParam<NFTContract>,
  tokenId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();
  const { erc721, erc1155 } = getErcs(contract);

  return useQueryWithNetwork<BigNumber>(
    cacheKeys.contract.nft.query.totalCirculatingSupply(contractAddress),
    async () => {
      requiredParamInvariant(contract, "No Contract instance provided");

      if (erc1155) {
        invariant(
          erc1155.totalCirculatingSupply,
          "Contract instance does not support totalCirculatingSupply",
        );
        requiredParamInvariant(tokenId, "No tokenId provided");
        return await erc1155.totalCirculatingSupply(tokenId);
      }
      if (erc721) {
        invariant(
          erc721.totalCirculatingSupply,
          "Contract instance does not support totalCirculatingSupply",
        );
        return await erc721.totalCirculatingSupply();
      }
      invariant(false, "Unknown NFT type");
    },
    {
      enabled: !!erc721 || (!!erc1155 && tokenId !== undefined),
    },
  );
}

/**
 * Use this to get a the owned NFTs for a specific {@link Erc721OrErc1155} and wallet address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to get owned tokens for
 * @returns a response object that includes the list of owned tokens
 * @beta
 * @twfeature ERC721Enumerable | ERC1155Enumerable
 */
export function useOwnedNFTs<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
  ownerWalletAddress: RequiredParam<WalletAddress>,
) {
  const contractAddress = contract?.getAddress();
  const { erc721, erc1155 } = getErcs(contract);

  return useQueryWithNetwork<NFT[]>(
    cacheKeys.contract.nft.query.owned.all(contractAddress, ownerWalletAddress),
    async () => {
      requiredParamInvariant(contract, "No Contract instance provided");
      invariant(ownerWalletAddress, "No wallet address provided");
      if (erc721) {
        return await erc721.getOwned(ownerWalletAddress);
      }
      if (erc1155) {
        return await erc1155.getOwned(ownerWalletAddress);
      }
      invariant(false, "Unknown NFT type");
    },
    {
      enabled: !!erc721 || (!!erc1155 && !!ownerWalletAddress),
    },
  );
}

/**
 * Use this to get a the total balance of a {@link NFTContract} and wallet address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(contract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to check the balance of
 * @returns a response object that includes the total balance of the owner
 * @twfeature ERC721 | ERC1155
 * @beta
 */
export function useNFTBalance(
  contract: RequiredParam<NFTContract>,
  ownerWalletAddress: RequiredParam<WalletAddress>,
  tokenId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();
  const { erc721, erc1155 } = getErcs(contract);
  return useQueryWithNetwork(
    cacheKeys.contract.nft.balanceOf(
      contractAddress,
      ownerWalletAddress,
      tokenId,
    ),
    () => {
      requiredParamInvariant(contract, "No Contract instance provided");

      invariant(ownerWalletAddress, "No owner wallet address provided");
      if (erc1155) {
        requiredParamInvariant(tokenId, "No tokenId provided");
        invariant(
          erc1155.balanceOf,
          "Contract instance does not support balanceOf",
        );
        return erc1155.balanceOf(ownerWalletAddress, tokenId);
      }
      if (erc721) {
        invariant(
          erc721.balanceOf,
          "Contract instance does not support balanceOf",
        );
        return erc721.balanceOf(ownerWalletAddress);
      }
      invariant(false, "Unknown NFT type");
    },
    {
      enabled: !!erc721 || (!!erc1155 && !!ownerWalletAddress),
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint a new NFT on your {@link Erc721OrErc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 * @twfeature ERC721Mintable | ERC1155Mintable
 */
export function useMintNFT<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  const { erc1155, erc721 } = getErcs(contract);

  return useMutation(
    async (data: MintNFTParams) => {
      invariant(data.to, 'No "to" address provided');
      requiredParamInvariant(contract, "contract is undefined");
      if (erc1155) {
        invariant("supply" in data, "supply not provided");
        const { to, metadata, supply } = data;
        return (await erc1155.mintTo(to, {
          metadata,
          supply: BigNumber.from(supply || 1),
        })) as MintNFTReturnType<TContract>;
      }
      if (erc721) {
        return (await erc721.mintTo(
          data.to,
          data.metadata,
        )) as MintNFTReturnType<TContract>;
      }
      invariant(false, "Unknown NFT type");
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

/**
 * Use this to mint a new NFT on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNftSupply,
 *     isLoading,
 *     error,
 *   } = useMintNFTSupply(contract);
 *
 *   if (error) {
 *     console.error("failed to mint additional supply", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNftSupply({ tokenId: 0, additionalSupply: 100, to: "0x..."})}
 *     >
 *       Mint Additional Supply!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to mint a more supply of a token id to the provided wallet
 * @beta
 * @twfeature ERC1155Mintable
 */
export function useMintNFTSupply(contract: Erc1155) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (data: MintNFTSupplyParams) => {
      invariant(data.to, 'No "to" address provided');
      requiredParamInvariant(contract, "contract is undefined");

      requiredParamInvariant(data.tokenId, "tokenId not provided");
      invariant("additionalSupply" in data, "additionalSupply not provided");
      const { to, tokenId, additionalSupply } = data;
      return await contract.mintAdditionalSupplyTo(
        to,
        tokenId,
        additionalSupply,
      );
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

/**
 * Use this to transfer tokens on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferNFT,
 *     isLoading,
 *     error,
 *   } = useTransferNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferNFT({ to: "0x...", tokenId: 2 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to transfer NFTs
 * @beta
 * @twfeature ERC721 | ERC1155
 */
export function useTransferNFT<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  const { erc1155, erc721 } = getErcs(contract);

  return useMutation(
    (data: TransferNFTParams) => {
      invariant("to" in data, "to not provided");
      if (erc1155) {
        invariant(erc1155.transfer, "contract does not support transfer");
        requiredParamInvariant(data.tokenId, "tokenId not provided");
        invariant("amount" in data, "amount not provided");
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return erc1155.transfer(data.to, data.tokenId, data.amount!);
      }
      if (erc721) {
        return erc721.transfer(data.to, data.tokenId);
      }
      invariant(false, "Unknown NFT type");
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

/**
 * Use this to transfer tokens on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const editionDrop = useContract(<ContractAddress>, "edition-drop");
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(editionDrop);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to transfer batch NFTs
 * @twfeature ERC1155
 * @beta
 */
export function useAirdropNFT(contract: Erc1155) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    ({ tokenId, addresses }: AirdropNFTParams) => {
      requiredParamInvariant(contract, "contract is undefined");
      invariant(contract.airdrop, "contract does not support airdrop");

      return contract.airdrop(tokenId, addresses);
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to burn an NFT on your {@link Erc721OrErc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to burn an NFT token from the connected wallet
 * @twfeature ERC721Burnable | ERC1155Burnable
 * @beta
 */
export function useBurnNFT<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  const { erc1155, erc721 } = getErcs(contract);

  return useMutation(
    async (data: BurnNFTParams) => {
      requiredParamInvariant(data.tokenId, "No tokenId provided");
      requiredParamInvariant(contract, "contract is undefined");
      if (erc1155) {
        invariant("amount" in data, "amount not provided");
        const { tokenId, amount } = data;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return await erc1155.burn(tokenId, amount!);
      }
      if (erc721) {
        const { tokenId } = data;
        return await erc721.burn(tokenId);
      }
      invariant(false, "Unknown NFT type");
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

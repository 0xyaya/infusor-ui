import { DAS } from 'helius-sdk';
import { PublicKey } from '@solana/web3.js';

export interface NftItem {
  title: string;
}

export interface NftItemWithMetadata extends NftItem {
  nftMint: string;
  imageUri: string;
  amount: number;
  loaded: boolean;
}

export const loadMetadata = (
  inputs: DAS.GetAssetResponse[]
): Promise<NftItemWithMetadata[]> => {
  const outputs = Promise.all(
    inputs.map(async (input) => {
      if (!input?.content) {
        return {
          nftMint: input.id.toString(),
          title: '',
          imageUri: '',
          amount: 0,
          loaded: false,
        } as NftItemWithMetadata;
      }

      const result = await fetch(input.content?.json_uri);
      const metadata = await result.json();

      if (!metadata) {
        return {
          nftMint: input.id.toString(),
          title: '',
          imageUri: '',
          amount: 0,
          loaded: false,
        };
      }

      return {
        nftMint: input.id.toString(),
        title: metadata.name,
        imageUri: metadata.image,
        amount: 0,
        loaded: true,
      } as NftItemWithMetadata;
    })
  );

  return outputs;
};

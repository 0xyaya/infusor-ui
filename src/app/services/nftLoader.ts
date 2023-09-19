import {WalletContextState} from '@solana/wallet-adapter-react';
import {Helius} from 'helius-sdk';

export interface NftItem {
    title: string;
    imageUri: string;
    amount: number;
}

export const fetchNftFromWallet = async (
    wallet: WalletContextState
): Promise<NftItem[]> => {
    const helius = new Helius('0fe5333d-4590-437f-9a0e-4c3250aff8de', 'devnet');
    let mapped: NftItem[] = [];

    if (!wallet.publicKey) return mapped;

    const nfts = await helius.rpc.getAssetsByOwner({
        ownerAddress: wallet.publicKey.toString(),
        page: 1,
        limit: 100
    });

    nfts.items.forEach(async (nft) => {
        if (!nft.content) return;
        const result = await fetch(nft.content.json_uri);
        const metadata = await result.json();
        mapped.push({
            title: metadata.name,
            imageUri: metadata.image,
            amount: 0
        });
    });
    console.log('Mapped: ', mapped);

    return mapped;
};

export const fetchThings = async (wallet: WalletContextState) => {
    const helius = new Helius('0fe5333d-4590-437f-9a0e-4c3250aff8de', 'devnet');

    if (!wallet.publicKey) return;

    const nfts = await helius.rpc.getAssetsByOwner({
        ownerAddress: wallet.publicKey.toString(),
        page: 1,
        limit: 100
    });

    let mapped: NftItem[] = [];
    for (let i = 0; i < nfts.items.length; i++) {
        const nft = nfts.items[i];
        if (!nft?.content) return;
        const result = await fetch(nft.content.json_uri);
        const metadata = await result.json();
        mapped.push({
            title: metadata.name,
            imageUri: metadata.image,
            amount: 0
        });
    }

    return mapped;
};

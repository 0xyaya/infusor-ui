import {PublicKey} from '@solana/web3.js';
import NftGrid, {GridSizeDisplay} from './NftGrid';
import NftCard from './NftCard';
import {NftItemWithMetadata, loadMetadata} from '../hooks/metadataLoader';
import {useEffect, useMemo, useState} from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const CollectionDisplay = ({
    collection,
    display,
    onInfuse
}: {
    collection: PublicKey;
    display: GridSizeDisplay;
    onInfuse: (nftMint: string) => void;
}) => {
    const {error, isLoaded, items, newItems} = useInfiniteScroll(
        collection,
        display === GridSizeDisplay.BIG ? 20 : 24
    );
    const [fulldata, setFulldata] = useState<NftItemWithMetadata[]>([]);

    const infuseHandler = (nftMint: string) => {
        onInfuse(nftMint);
    };

    useEffect(() => {
        const load = async () => {
            console.log(newItems);
            const loadedData = await loadMetadata(newItems);
            setFulldata((prevItems) => [...prevItems, ...loadedData]);
        };

        load();
    }, [newItems]);

    return (
        <>
            <NftGrid display={display}>
                {fulldata &&
                    fulldata.map((d) => (
                        <NftCard
                            key={d.title}
                            nft={d}
                            gridSizeDisplay={display}
                            onInfuse={infuseHandler}></NftCard>
                    ))}
            </NftGrid>
        </>
    );
};

export default CollectionDisplay;

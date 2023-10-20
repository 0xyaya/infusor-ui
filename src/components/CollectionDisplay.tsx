import {PublicKey} from '@solana/web3.js';
import useFetchCollectionItems from '../hooks/useFetchCollectionItems';
import NftGrid, {GridSizeDisplay} from './NftGrid';
import NftCard from './NftCard';
import {
    NftItemWithMetadata,
    loadMetadata,
    preloadData
} from '../hooks/metadataLoader';
import {useEffect, useState} from 'react';
import {Button, HStack} from '@chakra-ui/react';

const CollectionDisplay = ({
    collection,
    display,
    onInfuse
}: {
    collection: PublicKey;
    display: GridSizeDisplay;
    onInfuse: (nftMint: string) => void;
}) => {
    const [page, setPage] = useState<number>(1);
    const {error, isLoaded, data, reload} = useFetchCollectionItems(
        collection,
        page,
        display === GridSizeDisplay.BIG ? 20 : 24
    );
    const [fulldata, setFulldata] = useState<NftItemWithMetadata[]>([]);

    const infuseHandler = (nftMint: string) => {
        onInfuse(nftMint);
    };

    useEffect(() => {
        const load = async () => {
            const loadedData = await loadMetadata(data);
            setFulldata(loadedData);
        };

        load();
    }, [data]);

    useEffect(() => {
        const reloadData = async () => {};
        reloadData();
    }, [page]);

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
            <HStack>
                <Button
                    onClick={() =>
                        reload(1, display === GridSizeDisplay.BIG ? 20 : 24)
                    }>
                    1
                </Button>
                <Button
                    onClick={() =>
                        reload(2, display === GridSizeDisplay.BIG ? 20 : 24)
                    }>
                    2
                </Button>
            </HStack>
        </>
    );
};

export default CollectionDisplay;

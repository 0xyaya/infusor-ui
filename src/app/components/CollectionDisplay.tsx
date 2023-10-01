import { PublicKey } from '@solana/web3.js';
import useFetchCollectionItems from '../hooks/useFetchCollectionItems';
import NftGrid, { GridSizeDisplay } from './NftGrid';
import NftCard from './NftCard';
import {
  NftItemWithMetadata,
  loadMetadata,
  preloadData,
} from '../hooks/metadataLoader';
import { useEffect, useState } from 'react';

const CollectionDisplay = ({
  collection,
  display,
  onInfuse,
}: {
  collection: PublicKey;
  display: GridSizeDisplay;
  onInfuse: (nftMint: string) => void;
}) => {
  const { error, isLoaded, data } =
    useFetchCollectionItems(collection);
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

  return (
    <NftGrid display={display}>
      {fulldata &&
        fulldata.map((d) => (
          <NftCard
            key={d.title}
            nft={d}
            gridSizeDisplay={display}
            onInfuse={infuseHandler}
          ></NftCard>
        ))}
    </NftGrid>
  );
};

export default CollectionDisplay;

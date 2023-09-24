import { PublicKey } from '@solana/web3.js';
import useFetchCollectionItems from '../hooks/useFetchCollectionItems';
import NftGrid, { GridSizeDisplay } from './NftGrid';
import NftWallet from './NftCard';
import {
  NftItemWithMetadata,
  loadMetadata,
} from '../hooks/metadataLoader';
import { useEffect, useState } from 'react';

const CollectionDisplay = ({
  collection,
  display,
}: {
  collection: PublicKey;
  display: GridSizeDisplay;
}) => {
  const { error, isLoaded, data } =
    useFetchCollectionItems(collection);
  const [fulldata, setFulldata] = useState<NftItemWithMetadata[]>([]);

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
          <NftWallet
            key={d.title}
            nft={d}
            gridSizeDisplay={display}
          ></NftWallet>
        ))}
    </NftGrid>
  );
};

export default CollectionDisplay;

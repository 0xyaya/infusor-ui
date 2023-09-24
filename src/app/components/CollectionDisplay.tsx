import { PublicKey } from '@solana/web3.js';
import useFetchCollectionItems from '../hooks/useFetchCollectionItems';
import NftGrid from './NftGrid';
import NftWallet from './NftCard';
import {
  NftItemWithMetadata,
  loadMetadata,
} from '../hooks/nftLoader';
import { useEffect, useState } from 'react';

const CollectionDisplay = ({
  collection,
}: {
  collection: PublicKey;
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
    <NftGrid>
      {fulldata &&
        fulldata.map((d) => (
          <NftWallet key={d.title} nft={d}></NftWallet>
        ))}
    </NftGrid>
  );
};

export default CollectionDisplay;

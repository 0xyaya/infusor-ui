import { PublicKey } from '@solana/web3.js';
import useFetchAssetsByCollection from '../hooks/useFetchAssetsByCollection';
import GridNftWallet from './GridNftWallet';
import NftWallet from './NftWallet';
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
    useFetchAssetsByCollection(collection);
  const [fulldata, setFulldata] = useState<NftItemWithMetadata[]>([]);

  useEffect(() => {
    const load = async () => {
      const loadedData = await loadMetadata(data);
      setFulldata(loadedData);
    };

    load();
  }, [data]);

  return (
    <GridNftWallet>
      {fulldata &&
        fulldata.map((d) => (
          <NftWallet key={d.title} nft={d}></NftWallet>
        ))}
    </GridNftWallet>
  );
};

export default CollectionDisplay;

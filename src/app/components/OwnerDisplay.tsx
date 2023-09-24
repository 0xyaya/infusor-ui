import { PublicKey } from '@solana/web3.js';
import NftGrid from './NftGrid';
import NftWallet from './NftCard';
import {
  NftItemWithMetadata,
  loadMetadata,
} from '../hooks/nftLoader';
import useFetchOwnerItems from '../hooks/useFetchOwnerItems';
import { useEffect, useState } from 'react';

const OwnerDisplay = ({ wallet }: { wallet: PublicKey }) => {
  const { isLoaded, error, data } = useFetchOwnerItems(wallet);
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
        fulldata.map((i) => <NftWallet key={i.title} nft={i} />)}
    </NftGrid>
  );
};

export default OwnerDisplay;

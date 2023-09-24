import { PublicKey } from '@solana/web3.js';
import GridNftWallet from './GridNftWallet';
import NftWallet from './NftWallet';
import {
  NftItemWithMetadata,
  loadMetadata,
} from '../hooks/nftLoader';
import useFetchAssetsByOwner from '../hooks/useFetchAssetsByOwner';
import { useEffect, useState } from 'react';

const MainDisplay = ({ wallet }: { wallet: PublicKey }) => {
  const { isLoaded, error, data } = useFetchAssetsByOwner(wallet);
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
        fulldata.map((i) => <NftWallet key={i.title} nft={i} />)}
    </GridNftWallet>
  );
};

export default MainDisplay;

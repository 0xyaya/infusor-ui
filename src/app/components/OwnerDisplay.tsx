import { PublicKey } from '@solana/web3.js';
import NftGrid, { GridSizeDisplay } from './NftGrid';
import NftWallet from './NftCard';
import {
  NftItemWithMetadata,
  loadMetadata,
} from '../hooks/nftLoader';
import useFetchOwnerItems from '../hooks/useFetchOwnerItems';
import { useEffect, useState } from 'react';

const OwnerDisplay = ({
  wallet,
  display,
}: {
  wallet: PublicKey;
  display: GridSizeDisplay;
}) => {
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
    <NftGrid display={display}>
      {fulldata &&
        fulldata.map((i) => (
          <NftWallet
            key={i.title}
            nft={i}
            gridSizeDisplay={display}
          />
        ))}
    </NftGrid>
  );
};

export default OwnerDisplay;

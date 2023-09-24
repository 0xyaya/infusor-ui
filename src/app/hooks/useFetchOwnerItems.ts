import { DAS, Helius } from 'helius-sdk';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';

const helius = new Helius(
  '0fe5333d-4590-437f-9a0e-4c3250aff8de',
  'mainnet-beta'
);

const useFetchOwnerItems = (owner: PublicKey) => {
  const [data, setData] = useState<DAS.GetAssetResponse[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      helius.rpc
        .getAssetsByOwner({
          ownerAddress: owner.toString(),
          page: 1,
          limit: 20,
        })
        .then((response) => {
          setIsLoaded(true);
          setData(response.items);
        })
        .catch((error) => {
          setError(error);
        });
    };

    fetchData();
  }, [owner]);

  return { error, isLoaded, data };
};

export default useFetchOwnerItems;

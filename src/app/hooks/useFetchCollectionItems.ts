import { DAS, Helius } from 'helius-sdk';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';

const helius = new Helius(
  `${process.env.API_KEY_SECRET}`,
  'mainnet-beta'
);

const useFetchCollectionItems = (collection: PublicKey) => {
  const [data, setData] = useState<DAS.GetAssetResponse[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      helius.rpc
        .getAssetsByGroup({
          groupKey: 'collection',
          groupValue: collection.toString(),
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
  }, [collection]);

  return { error, isLoaded, data };
};

export default useFetchCollectionItems;

import {DAS, Helius} from 'helius-sdk';
import {PublicKey} from '@solana/web3.js';
import {useCallback, useEffect, useMemo, useState} from 'react';

const helius = new Helius(
    `${process.env.NEXT_PUBLIC_API_KEY_SECRET}`,
    'mainnet-beta'
);

const useInfiniteScroll = (collection: PublicKey, limit: number) => {
    const [items, setItems] = useState<DAS.GetAssetResponse[]>([]);
    const [newItems, setNewItems] = useState<DAS.GetAssetResponse[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const fetch = async () => {
        helius.rpc
            .getAssetsByGroup({
                groupKey: 'collection',
                groupValue: collection.toString(),
                page: page,
                limit: limit
            })
            .then((response) => {
                setIsLoaded(true);
                setNewItems(response.items);
                setItems((prevItems) => [...prevItems, ...response.items]);
                setPage((prevPage) => prevPage + 1);
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            !isLoaded
        ) {
            return;
        }
        fetch();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoaded]);

    useEffect(() => {
        fetch();
    }, []);

    return {error, isLoaded, items, newItems, fetch};
};

export default useInfiniteScroll;

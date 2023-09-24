'use client';

import Image from 'next/image';
import styles from './page.module.css';
import {
  Box,
  VStack,
  Text,
  useDisclosure,
  Input,
  HStack,
} from '@chakra-ui/react';
import {
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import {
  NftItem,
  fetchNftFromWallet,
  fetchThings,
  fetchThingsByWallet,
} from './hooks/nftLoader';
import GridNftWallet, {
  GridSizeDisplay,
} from './components/GridNftWallet';
import NftWallet from './components/NftWallet';
import { PublicKey } from '@solana/web3.js';
import useFetchByOwner from './hooks/useFetchAssetsByOwner';
import fromAsset from './hooks/useFormattedAssetsByOwner.ts';
import MainDisplay from './components/MainDisplay';

const walletPublicKey =
  '3EqUrFrjgABCWAnqMYjZ36GcktiwDtFdkNYwY6C6cDzy';

export default function Home() {
  const [nft, setNft] = useState<NftItem[]>([]);
  const wallet = useWallet();
  const [gridSizeDisplay, setGridSizeDisplay] =
    useState<GridSizeDisplay>(GridSizeDisplay.LITTLE);
  const connection = useConnection();
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [searchWallet, setSearchWallet] = useState<string>();

  const onInfusedHandler = () => {
    console.log('Infused!');
  };

  useEffect(() => {
    const syncWallet = async () => {
      if (wallet.publicKey)
        setSearchWallet(wallet.publicKey.toString());
    };
    syncWallet();
  }, [wallet, connection, searchTrigger]);

  const testHandler = () => {
    console.log('TEST BIS');
  };

  return (
    <Box
      maxW='7xl'
      mx='auto'
      minHeight='100vh'
      px={{ base: '4', md: '8', lg: '10' }}
      py={{ base: '6', md: '8', lg: '10' }}
    >
      <VStack>
        <Text>Infuse your NFTs</Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTrigger(true);
          }}
        >
          <Input
            value={searchWallet}
            onChange={(e) => setSearchWallet(e.currentTarget.value)}
          />
        </form>

        {searchWallet && (
          <MainDisplay wallet={new PublicKey(searchWallet)} />
        )}
      </VStack>
    </Box>
  );
}

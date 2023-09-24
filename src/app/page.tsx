'use client';

import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  Spacer,
} from '@chakra-ui/react';
import {
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { NftItem } from './hooks/metadataLoader';
import { GridSizeDisplay } from './components/NftGrid';
import { PublicKey } from '@solana/web3.js';
import OwnerDisplay from './components/OwnerDisplay';
import CollectionDisplay from './components/CollectionDisplay';
import ToolsBar from './components/ToolsBar';

const walletPublicKey =
  '3EqUrFrjgABCWAnqMYjZ36GcktiwDtFdkNYwY6C6cDzy';

export default function Home() {
  const wallet = useWallet();
  const connection = useConnection();
  const [searchWallet, setSearchWallet] = useState<string>();
  const [searchingMode, setSearchingMode] = useState<number>(0);
  const [collection, setCollection] = useState<string>('');
  const [gridSizeDisplay, setGridSizeDisplay] =
    useState<GridSizeDisplay>(GridSizeDisplay.LITTLE);

  useEffect(() => {
    const syncWallet = async () => {
      if (wallet.publicKey && !searchWallet)
        setSearchWallet(wallet.publicKey.toString());
    };
    syncWallet();
  }, [wallet, connection, searchingMode]);

  const searchCollectionHandler = (collection: string) => {
    setCollection(collection);
    setSearchingMode(1);
  };

  const searchOwnerHandler = (owner: string) => {
    setSearchWallet(owner);
    setSearchingMode(0);
  };

  const gridChangedHandler = (newSizeDisplay: GridSizeDisplay) => {
    if (newSizeDisplay !== gridSizeDisplay) {
      setGridSizeDisplay(newSizeDisplay);
    }
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
        <Text>
          Infuse your NFTs with some burnt carbon credits to make it
          cool and green
        </Text>
        <Spacer />
        <ToolsBar
          onGridChange={gridChangedHandler}
          onSearchCollection={searchCollectionHandler}
          onSearchOwner={searchOwnerHandler}
        />

        {searchWallet && searchingMode === 0 && (
          <OwnerDisplay
            wallet={new PublicKey(searchWallet)}
            display={gridSizeDisplay}
          />
        )}
        {searchingMode === 1 && (
          <CollectionDisplay
            collection={new PublicKey(collection)}
            display={gridSizeDisplay}
          />
        )}
      </VStack>
    </Box>
  );
}

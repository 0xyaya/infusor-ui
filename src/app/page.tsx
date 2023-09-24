'use client';

import { Box, VStack, Text, Input, Button } from '@chakra-ui/react';
import {
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { NftItem } from './hooks/nftLoader';
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

  const searchByCollectionHandler = () => {
    // Heist 6d9pvGuM6iG9GVuxRzSVHEQCdy44arm6oyqu6aUzrzLo
    // Fox BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac
    console.log('search by collection');
    setCollection('6d9pvGuM6iG9GVuxRzSVHEQCdy44arm6oyqu6aUzrzLo');
    setSearchingMode(1);
  };

  const searchFoxHandler = () => {
    setCollection('BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac');
    setSearchingMode(1);
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
        <Text>Infuse your NFTs</Text>
        <ToolsBar onGridChange={gridChangedHandler} />
        <Button onClick={searchByCollectionHandler}>The Heist</Button>
        <Button onClick={searchFoxHandler}>
          Famous Fox Foundation
        </Button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchingMode(0);
          }}
        >
          <Input
            value={searchWallet}
            onChange={(e) => setSearchWallet(e.currentTarget.value)}
          />
        </form>

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

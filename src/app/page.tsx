'use client';

import {
  Box,
  VStack,
  Text,
  Spacer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Icon,
  CloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { GridSizeDisplay } from './components/NftGrid';
import { PublicKey } from '@solana/web3.js';
import OwnerDisplay from './components/OwnerDisplay';
import CollectionDisplay from './components/CollectionDisplay';
import ToolsBar from './components/ToolsBar';
import { FaHeart, FaIcons, FaSeedling, FaStar } from 'react-icons/fa';

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
  const {
    isOpen: isVisible,
    onClose: onAlertClose,
    onOpen: onAlertOpen,
  } = useDisclosure({ defaultIsOpen: false });

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
        {isVisible && (
          <Alert status='success'>
            <AlertIcon />
            <Box width='100%'>
              <AlertTitle>
                infused with love <Icon as={FaHeart} />
              </AlertTitle>
              <AlertDescription>
                <Text>but nothing happened!</Text>
              </AlertDescription>
            </Box>
            <CloseButton
              position='relative'
              right={-1}
              top={-1}
              onClick={onAlertClose}
            />
          </Alert>
        )}
        {searchWallet && searchingMode === 0 && (
          <OwnerDisplay
            wallet={new PublicKey(searchWallet)}
            display={gridSizeDisplay}
            onInfuse={onAlertOpen}
          />
        )}
        {searchingMode === 1 && (
          <CollectionDisplay
            collection={new PublicKey(collection)}
            display={gridSizeDisplay}
            onInfuse={onAlertOpen}
          />
        )}
      </VStack>
    </Box>
  );
}

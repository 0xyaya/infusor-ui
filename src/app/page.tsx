'use client';

import {
  Box,
  VStack,
  Text,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import {
  useAnchorWallet,
  useWallet,
} from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { GridSizeDisplay } from './components/NftGrid';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import OwnerDisplay from './components/OwnerDisplay';
import CollectionDisplay from './components/CollectionDisplay';
import ToolsBar from './components/ToolsBar';
import { useWorkspace } from './providers/ContextProvider';
import { BN, utils } from '@coral-xyz/anchor';
import { infuse } from './infusedCarbonRegistry/client';
import InfuseModal from './components/infuseModal';
import InfusedAlert from './components/InfusedAlert';

export default function Home() {
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const [searchWallet, setSearchWallet] = useState<string>();
  const [searchingMode, setSearchingMode] = useState<number>(1);
  const [nftToInfuse, setNftToInfuse] = useState<string>();
  const { program, provider, connection } = useWorkspace();
  const [state, setState] = useState<PublicKey>();
  const {
    isOpen: isInfusedModalOpen,
    onOpen: onInfusedModalOpen,
    onClose: onInfusedModalClose,
  } = useDisclosure();
  const [collection, setCollection] = useState<string>(
    'BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac'
  );
  const [gridSizeDisplay, setGridSizeDisplay] =
    useState<GridSizeDisplay>(GridSizeDisplay.LITTLE);

  const {
    isOpen: isAlertVisible,
    onClose: onAlertClose,
    onOpen: onAlertOpen,
  } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    if (!program) return;
    const [statePda] = PublicKey.findProgramAddressSync(
      [utils.bytes.utf8.encode('global-registry')],
      program.programId
    );
    setState(statePda);
  }, [program]);

  useEffect(() => {
    const syncWallet = async () => {
      if (wallet.publicKey && !searchWallet)
        setSearchWallet(wallet.publicKey.toString());
    };
    syncWallet();
  }, [wallet, connection, searchingMode]);

  useEffect(() => {
    if (!program) return;
    const [statePda] = PublicKey.findProgramAddressSync(
      [utils.bytes.utf8.encode('global-registry')],
      program.programId
    );
    setState(statePda);
  }, [program]);

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

  const infuseHandler = (nftMint: string) => {
    setNftToInfuse(nftMint);
    onInfusedModalOpen();
  };

  const infuseNft = async (amount: number) => {
    if (!state) return;
    if (!program) return;
    if (!provider) return;
    if (!connection) return;
    if (!anchorWallet) return;
    if (!nftToInfuse) return;

    await infuse(program, new BN(amount), new PublicKey(nftToInfuse));
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
          Infuse any NFT with carbon credits to tranform it in a
          eco-friendly version.
        </Text>
        <Spacer />
        <ToolsBar
          onGridChange={gridChangedHandler}
          onSearchCollection={searchCollectionHandler}
          onSearchOwner={searchOwnerHandler}
        />
        <InfuseModal
          isOpen={isInfusedModalOpen}
          onClose={onInfusedModalClose}
          onInfuse={infuseNft}
        />
        {isAlertVisible && <InfusedAlert onClose={onAlertClose} />}

        {searchWallet && searchingMode === 0 && (
          <OwnerDisplay
            wallet={new PublicKey(searchWallet)}
            display={gridSizeDisplay}
            onInfuse={infuseHandler}
          />
        )}
        {searchingMode === 1 && (
          <CollectionDisplay
            collection={new PublicKey(collection)}
            display={gridSizeDisplay}
            onInfuse={infuseHandler}
          />
        )}
      </VStack>
    </Box>
  );
}

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalFooter,
  Button,
  ModalBody,
} from '@chakra-ui/react';
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { GridSizeDisplay } from './components/NftGrid';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import OwnerDisplay from './components/OwnerDisplay';
import CollectionDisplay from './components/CollectionDisplay';
import ToolsBar from './components/ToolsBar';
import { FaHeart, FaIcons, FaSeedling, FaStar } from 'react-icons/fa';
import { useWorkspace } from './providers/ContextProvider';
import { BN, utils } from '@coral-xyz/anchor';
import { infuse, send } from './infusedCarbonRegistry/client';

const walletPublicKey =
  '3EqUrFrjgABCWAnqMYjZ36GcktiwDtFdkNYwY6C6cDzy';

export default function Home() {
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const connection = useConnection();
  const [searchWallet, setSearchWallet] = useState<string>();
  const [searchingMode, setSearchingMode] = useState<number>(1);
  const [infuseAmount, setInfuseAmount] = useState<number>();
  const [nftToInfuse, setNftToInfuse] = useState<string>();
  const workspace = useWorkspace();
  const program = workspace.program;
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

  const holdingAccount = new PublicKey(
    '3bQhuVsa1sU5mZYJYmpWAN9jLNCM5xxk2RNtrqehfYuh'
  );
  const feesAccount = new PublicKey(
    '735WcMTFNG3qXQat7VP2uxMpSvts969xg5vnKPiDpsp9'
  );

  const {
    isOpen: isVisible,
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
  }, [workspace]);

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

  const infuseHandler = (nftMint: string) => {
    setNftToInfuse(nftMint);
    onInfusedModalOpen();
  };

  const infuseNft = async (nftMint: PublicKey) => {
    console.log('Infusing ...');
    if (!state) return;
    if (!program) return;
    if (!anchorWallet) return;
    if (!workspace.provider) return;
    if (!workspace.provider.publicKey) return;

    // const [infusedAccount] = PublicKey.findProgramAddressSync(
    //   [utils.bytes.utf8.encode('infused-account'), nftMint.toBytes()],
    //   program.programId
    // );

    // const nctUsdPriceFeed = new PublicKey(
    //   '4YL36VBtFkD2zfNGWdGFSc5suvskjrHnx3Asuksyek1J'
    // );
    // const solUsdPriceFeed = new PublicKey(
    //   'GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR'
    // );

    // const switchboard = await SwitchboardProgram.fromProvider(
    //   workspace.provider
    // );

    // const aggregatorAccount = new AggregatorAccount(
    //   switchboard,
    //   solUsdPriceFeed
    // );

    // const aggregatorAccountNctUsd = new AggregatorAccount(
    //   switchboard,
    //   nctUsdPriceFeed
    // );
    // const tx = await program?.methods
    //   .infuse(bn)
    //   .accounts({
    //     globalRegistry: state,
    //     feesAccount,
    //     holdingAccount,
    //     nftMint,
    //     infusedAccount,
    //   })
    //   .rpc();
    // const tx = await program?.methods
    //   .sendSol(amount)
    //   .accounts({
    //     from: workspace.provider.publicKey,
    //     to: holdingAccount,
    //   })
    //   .rpc();
    await infuse(
      anchorWallet,
      connection,
      new BN(infuseAmount),
      nftMint
    );
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
        <Modal
          isOpen={isInfusedModalOpen}
          onClose={onInfusedModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Infusing</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form
                id='new-form'
                onSubmit={(event) => {
                  event.preventDefault();
                  onInfusedModalClose();
                  if (nftToInfuse)
                    infuseNft(new PublicKey(nftToInfuse));
                }}
              >
                <FormControl>
                  <FormLabel>
                    How much carbon credits in tons?
                  </FormLabel>
                  <Input
                    type='number'
                    variant='outline'
                    placeholder='amount'
                    value={infuseAmount}
                    onChange={(e) =>
                      setInfuseAmount(Number(e.currentTarget.value))
                    }
                  />
                  <FormHelperText>
                    1 carbon credit cost ~1.40$
                  </FormHelperText>
                </FormControl>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onInfusedModalClose}>
                Close
              </Button>
              <Button
                colorScheme='aquamarine'
                type='submit'
                form='new-form'
              >
                Infuse Now
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
            onInfuse={infuseHandler}
          />
        )}
      </VStack>
    </Box>
  );
}

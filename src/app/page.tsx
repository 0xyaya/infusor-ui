'use client';

import {Box, VStack, Text, Spacer, useDisclosure} from '@chakra-ui/react';
import {useAnchorWallet, useWallet} from '@solana/wallet-adapter-react';
import {useEffect, useState} from 'react';
import {GridSizeDisplay} from './components/NftGrid';
import {PublicKey, LAMPORTS_PER_SOL} from '@solana/web3.js';
import OwnerDisplay from './components/OwnerDisplay';
import CollectionDisplay from './components/CollectionDisplay';
import ToolsBar from './components/ToolsBar';
import {useWorkspace} from './providers/ContextProvider';
import {BN, utils} from '@coral-xyz/anchor';
import {infuse} from './infusedCarbonRegistry/client';
import InfuseModal from './components/infuseModal';
import InfusedAlert from './components/InfusedAlert';

export default function Home() {
    const wallet = useWallet();
    const anchorWallet = useAnchorWallet();
    const [searchWallet, setSearchWallet] = useState<string>();
    const [searchingMode, setSearchingMode] = useState<number>(1);
    const {program, provider, connection} = useWorkspace();
    const [collection, setCollection] = useState<string>(
        'BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac'
    );
    const [gridSizeDisplay, setGridSizeDisplay] = useState<GridSizeDisplay>(
        GridSizeDisplay.LITTLE
    );

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
            maxW="7xl"
            mx="auto"
            minHeight="100vh"
            px={{base: '4', md: '8', lg: '10'}}
            py={{base: '6', md: '8', lg: '10'}}>
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
                <Text>List</Text>
            </VStack>
        </Box>
    );
}

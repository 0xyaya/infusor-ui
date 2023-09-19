'use client';

import Image from 'next/image';
import styles from './page.module.css';
import {Box, VStack, Text, useDisclosure} from '@chakra-ui/react';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {useEffect, useState} from 'react';
import {NftItem, fetchNftFromWallet, fetchThings} from './services/nftLoader';
import GridNftWallet, {GridSizeDisplay} from './components/GridNftWallet';
import NftWallet from './components/NftWallet';

const walletPublicKey = '3EqUrFrjgABCWAnqMYjZ36GcktiwDtFdkNYwY6C6cDzy';

export default function Home() {
    const [nft, setNft] = useState<NftItem[]>([]);
    const wallet = useWallet();
    const [gridSizeDisplay, setGridSizeDisplay] = useState<GridSizeDisplay>(
        GridSizeDisplay.LITTLE
    );
    const connection = useConnection();

    const onInfusedHandler = () => {
        console.log('Infused!');
    };

    useEffect(() => {
        const func = async () => {
            const items = await fetchThings(wallet);
            if (items) {
                setNft(items);
            }
        };
        func();
    }, [wallet, connection]);

    return (
        <Box
            maxW="7xl"
            mx="auto"
            minHeight="100vh"
            px={{base: '4', md: '8', lg: '10'}}
            py={{base: '6', md: '8', lg: '10'}}>
            <VStack>
                <Text>Infuse your NFTs</Text>
                <GridNftWallet display={gridSizeDisplay}>
                    {nft &&
                        nft.map((n) => (
                            <NftWallet
                                key={n.title}
                                gridSizeDisplay={gridSizeDisplay}
                                nft={n}
                                onInfuse={onInfusedHandler}
                            />
                        ))}
                </GridNftWallet>
            </VStack>
        </Box>
    );
}

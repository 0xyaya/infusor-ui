import {Box, VStack, Text, Spacer, Input} from '@chakra-ui/react';

import CollectionList from '../components/CollectionList';

async function loadCollections() {
    const res = await fetch('https://infusor.vercel.app/api/collections');
    const data = await res.json();
    const collectionsData = data.collections.map((c: any) => ({
        address: c.address,
        imageUri: c.metadata.image,
        supply: 10000,
        name: c.metadata.name,
        totalScore: 208,
        sevenDayInfused: 10,
        sevenDayVar: 5
    }));

    return collectionsData;
}

export default async function Home() {
    const collections = await loadCollections();

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
                <Text>Search NFTs by collection or by wallet address.</Text>
                <Spacer />
                <Input />
                <Spacer />
                <CollectionList collections={collections} />
            </VStack>
        </Box>
    );
}

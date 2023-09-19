import {SimpleGrid} from '@chakra-ui/react';

export enum GridSizeDisplay {
    LITTLE,
    BIG
}

export default function GridNftWallet({
    children,
    display
}: {
    children: React.ReactNode;
    display: GridSizeDisplay;
}) {
    return (
        <SimpleGrid
            columns={{
                base: 1,
                md: display === GridSizeDisplay.LITTLE ? 4 : 2
            }}
            columnGap={{base: '4', md: '6'}}
            rowGap={{base: '8', md: '10'}}>
            {children}
        </SimpleGrid>
    );
}

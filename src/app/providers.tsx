// app/providers.tsx
'use client';

import {CacheProvider} from '@chakra-ui/next-js';
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {WalletProvider, ConnectionProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';
import {useMemo} from 'react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    initialColorMode: 'dark',
    useSystemColorMode: false,
    colors: {
        aquamarine: {
            50: 'f7fafc',
            100: '#f7fafc',
            200: '#6AFFAE',
            450: '#6AFFAE',
            600: '#6AFFAE',
            // ...
            900: '#1a202c'
        }
    },

    styles: {
        global: () => ({
            body: {
                bg: 'gray.800'
            }
        })
    }
});

export function Providers({children}: {children: React.ReactNode}) {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter()
        ],
        []
    );

    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode="dark" />
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets}>
                        <WalletModalProvider>{children}</WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </ChakraProvider>
        </CacheProvider>
    );
}

'use client';
import { Box } from '@chakra-ui/react';
import DataTableBoard from './DataTableBoard';
import { useEffect, useState } from 'react';
import { LeaderBoardItem } from './InfusedAccount';
import {
  useAnchorWallet,
  useConnection,
} from '@solana/wallet-adapter-react';
import { getInfusedAccounts } from '../infusedCarbonRegistry/client';

// const data: InfusedAccount[] = [
//   {
//     name: 'SMB GEN2 #2901',
//     image:
//       'https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208',
//     collection: 'SMB GEN2',
//     carbonScore: 25.4,
//   },
//   {
//     name: 'SMB GEN2 #2901',
//     image:
//       'https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208',
//     collection: 'SMB GEN2',
//     carbonScore: 25.4,
//   },
//   {
//     name: 'SMB GEN2 #2901',
//     image:
//       'https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208',
//     collection: 'SMB GEN2',
//     carbonScore: 25.4,
//   },
// ];
export const Leaderboard = () => {
  const [items, setItems] = useState<LeaderBoardItem[]>([]);
  const connection = useConnection();
  const wallet = useAnchorWallet();

  useEffect(() => {
    const leaderboard = async () => {
      if (!wallet) return;
      const loadedItems = await getInfusedAccounts(
        wallet,
        connection
      );
      if (!loadedItems) return;
      setItems(loadedItems);
    };

    leaderboard();
  }, []);

  return (
    <Box
      maxW='7xl'
      mx='auto'
      minHeight='100vh'
      px={{ base: '4', md: '8', lg: '10' }}
      py={{ base: '6', md: '8', lg: '10' }}
    >
      {items && <DataTableBoard accounts={items} />}
      {/* <DataTable columns={columns} data={data} /> */}
    </Box>
  );
};

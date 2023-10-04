'use client';

import { Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import DataTableBoard from './DataTableBoard';
import fromInfusedAccount from './utils';
import { useEffect, useState } from 'react';
import { InfusedAccount, LeaderBoardItem } from './InfusedAccount';
import { useWorkspace } from '../providers/ContextProvider';
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { getInfusedAccounts } from '../infusedCarbonRegistry/client';

const infusedAccounts = [
  {
    nftMint: 'JEH7cJxAKdprFG5AvdsY2c4ZqojxLBjFmw19zADV6oK5',
    carbonScore: 1,
    owner: '98cçx87',
  },
  {
    nftMint: 'JEEqUNmR1EDmDrwZUL3L49cciBQUP264BrNAkyGS3Zoc',
    carbonScore: 12,
    owner: '98cçx87',
  },
  {
    nftMint: 'JECsxP3MYFV1NEHXtb4MVogQBMQqf17vcVrSyxdo6v7Q',
    carbonScore: 9,
    owner: '98cçx87',
  },
];
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
const Leaderboard = () => {
  const [items, setItems] = useState<LeaderBoardItem[]>([]);
  const connection = useConnection();
  const wallet = useAnchorWallet();
  const workspace = useWorkspace();

  useEffect(() => {
    const leaderboard = async () => {
      if (!wallet) return;
      if (!workspace.program) return;
      const loadedItems = await getInfusedAccounts(
        workspace.program,
        wallet,
        connection
      );
      if (!loadedItems) return;
      setItems(loadedItems);
    };

    leaderboard();
  }, [wallet, connection]);

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

export default Leaderboard;

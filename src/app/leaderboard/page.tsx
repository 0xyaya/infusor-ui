'use client';

import { Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import DataTableBoard from './DataTableBoard';

const Leaderboard = () => {
  type InfusedAccount = {
    name: string;
    image: string;
    carbonScore: number;
    collection?: string;
  };

  const data: InfusedAccount[] = [
    {
      name: 'SMB GEN2 #2901',
      image:
        'https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208',
      collection: 'SMB GEN2',
      carbonScore: 25.4,
    },
    {
      name: 'SMB GEN2 #2901',
      image:
        'https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208',
      collection: 'SMB GEN2',
      carbonScore: 25.4,
    },
    {
      name: 'SMB GEN2 #2901',
      image:
        'https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208',
      collection: 'SMB GEN2',
      carbonScore: 25.4,
    },
  ];

  const columnHelper = createColumnHelper<InfusedAccount>();

  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    columnHelper.accessor('image', {
      cell: (info) => info.getValue(),
      header: 'Image',
    }),
    columnHelper.accessor('collection', {
      cell: (info) => info.getValue(),
      header: 'Collection',
    }),
    columnHelper.accessor('carbonScore', {
      cell: (info) => info.getValue(),
      header: 'Carbon Score',
      meta: {
        isNumeric: true,
      },
    }),
  ];

  return (
    <Box
      maxW='7xl'
      mx='auto'
      minHeight='100vh'
      px={{ base: '4', md: '8', lg: '10' }}
      py={{ base: '6', md: '8', lg: '10' }}
    >
      <DataTableBoard />
      {/* <DataTable columns={columns} data={data} /> */}
    </Box>
  );
};

export default Leaderboard;

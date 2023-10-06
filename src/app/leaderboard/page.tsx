'use client';

import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState, lazy, Suspense } from 'react';
import { InfusedAccount, LeaderBoardItem } from './InfusedAccount';
import { useWorkspace } from '../providers/ContextProvider';

import { loadedInfusedAccount } from './utils';
const DataTableBoard = lazy(() => import('./DataTableBoard'));

const Leaderboard = () => {
  const [accounts, setAccouts] = useState<LeaderBoardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { program } = useWorkspace();

  useEffect(() => {
    const loadAccounts = async () => {
      if (program) {
        setIsLoading(true);
        const accounts = await program.account.infusedAccount.all();
        const mappedAccounts = accounts.map(
          (account) => account.account as InfusedAccount
        );
        const loadedAccounts = await Promise.all(
          mappedAccounts.map(
            async (account) => await loadedInfusedAccount(account)
          )
        );

        const filteredAccounts = loadedAccounts.reduce(
          (acc: LeaderBoardItem[], cur: LeaderBoardItem) => {
            if (
              !acc
                .map((a) => a.nftMint.toString())
                .includes(cur.nftMint.toString())
            ) {
              acc.push(cur);
            }
            return acc;
          },
          []
        );
        const sortedAccounts = filteredAccounts.sort(
          (accountA, accountB) =>
            accountB.carbonScore - accountA.carbonScore
        );
        setAccouts(sortedAccounts);
      }
    };

    loadAccounts();
  }, []);

  return (
    <Box
      maxW='7xl'
      mx='auto'
      minHeight='100vh'
      px={{ base: '4', md: '8', lg: '10' }}
      py={{ base: '6', md: '8', lg: '10' }}
    >
      {accounts && <DataTableBoard accounts={accounts} />}
      {/* {accounts && (
        <div>
          {Object.keys(accounts).map((key) => {
            const data = accounts[key as unknown as number];
            return <div key={key}>{data.nftMint.toString()}</div>;
          })}
        </div>
      )} */}
    </Box>
  );
};

export default Leaderboard;

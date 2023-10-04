import * as anchor from '@coral-xyz/anchor';
import {
  AnchorWallet,
  ConnectionContextState,
} from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { getProgramInstance } from './program';
import { InfusedAccount } from '../leaderboard/InfusedAccount';
import fromInfusedAccount from '../leaderboard/utils';
import { InfusedCarbonRegistry } from './types';

const programId = new PublicKey(
  '2XZBW8ADm7dqMqC8fehd154n1L3CRrmfp7ikFoSzAkcn'
);
const tokenMetadataPID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
);

// export const infuse = async (
//   wallet: AnchorWallet,
//   connection: ConnectionContextState,
//   amount: anchor.BN,
//   nftMint: PublicKey
// ) => {
//   const program = getProgramInstance(connection, wallet);

//   const holdingAccount = new PublicKey(
//     '3bQhuVsa1sU5mZYJYmpWAN9jLNCM5xxk2RNtrqehfYuh'
//   );
//   const feesAccount = new PublicKey(
//     '735WcMTFNG3qXQat7VP2uxMpSvts969xg5vnKPiDpsp9'
//   );
//   const [globalRegistry] = PublicKey.findProgramAddressSync(
//     [anchor.utils.bytes.utf8.encode('global-registry')],
//     program.programId
//   );
//   const [infusedAccount] = PublicKey.findProgramAddressSync(
//     [
//       anchor.utils.bytes.utf8.encode('infused-account'),
//       nftMint.toBytes(),
//     ],
//     program.programId
//   );

//   try {
//     const transactionSignature = await program.methods
//       .infuse(amount)
//       .accounts({
//         globalRegistry,
//         feesAccount,
//         holdingAccount,
//         nftMint,
//         infusedAccount,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .rpc();
//     console.log('tx: ', transactionSignature);
//   } catch (e) {
//     console.log(e);
//   }

export const infuse = async (
  program: anchor.Program<InfusedCarbonRegistry>,
  amount: anchor.BN,
  nftMint: PublicKey
) => {
  const holdingAccount = new PublicKey(
    '3bQhuVsa1sU5mZYJYmpWAN9jLNCM5xxk2RNtrqehfYuh'
  );
  const feesAccount = new PublicKey(
    '735WcMTFNG3qXQat7VP2uxMpSvts969xg5vnKPiDpsp9'
  );
  const [globalRegistry] = PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode('global-registry')],
    program.programId
  );
  const [infusedAccount] = PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('infused-account'),
      nftMint.toBytes(),
    ],
    program.programId
  );

  console.log('test');

  try {
    const transactionSignature = await program.methods
      .infuse(amount)
      .accounts({
        globalRegistry,
        feesAccount,
        holdingAccount,
        nftMint,
        infusedAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log('tx: ', transactionSignature);
  } catch (e) {
    console.log(e);
  }
};

// export const getInfusedAccounts = async (
//   wallet: AnchorWallet,
//   connection: ConnectionContextState
// ) => {
//   const program = getProgramInstance(connection, wallet);
//   const accounts = await program.account.infusedAccount.all();
//   const mappedAccounts = accounts.map(
//     (account) => account.account as InfusedAccount
//   );
//   console.log('accounts: ', accounts);
//   console.log('test: ', accounts[0].publicKey.toString());
//   console.log('test: ', accounts[0].account.nftMint.toString());
//   console.log(
//     'carbons: ',
//     accounts[0].account.carbonScore.toString()
//   );
//   if (!accounts) return;
//   const loadedItems = await Promise.all(
//     mappedAccounts.map((account) => fromInfusedAccount(account))
//   );

//   console.log('TEST');
//   console.log('infused Accounts: ', loadedItems);

//   return loadedItems;
// };

export const getInfusedAccounts = async (
  program: anchor.Program<InfusedCarbonRegistry>,
  wallet: AnchorWallet,
  connection: ConnectionContextState
) => {
  const accounts = await program.account.infusedAccount.all();
  const mappedAccounts = accounts.map(
    (account) => account.account as InfusedAccount
  );
  console.log('accounts: ', accounts);
  console.log('test: ', accounts[0].publicKey.toString());
  console.log('test: ', accounts[0].account.nftMint.toString());
  console.log(
    'carbons: ',
    accounts[0].account.carbonScore.toString()
  );
  if (!accounts) return;
  const loadedItems = await Promise.all(
    mappedAccounts.map((account) => fromInfusedAccount(account))
  );

  console.log('TEST');
  console.log('infused Accounts: ', loadedItems);

  return loadedItems;
};

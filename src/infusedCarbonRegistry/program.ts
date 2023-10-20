import * as anchor from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { InfusedCarbonRegistry } from './types';
import infusedCarbonRegistry from './infused_carbon_registry.json';
import {
  AnchorWallet,
  ConnectionContextState,
} from '@solana/wallet-adapter-react';
// This command makes an Lottery
export function getProgramInstance(
  connection: ConnectionContextState,
  wallet: AnchorWallet
): anchor.Program<InfusedCarbonRegistry> {
  if (!wallet.publicKey) throw new WalletNotConnectedError();

  const provider = new anchor.AnchorProvider(
    connection.connection,
    wallet,
    anchor.AnchorProvider.defaultOptions()
  );

  anchor.setProvider(provider);

  // Address of the deployed program.
  const programId = new PublicKey(
    'GfnsaGsBQ2bWBdoQ2WsgcwJQAKMUBNJdx9aakWtARMs7'
  );
  // Generate the program client from IDL.
  const program = new anchor.Program(
    infusedCarbonRegistry as unknown as InfusedCarbonRegistry,
    programId
  );

  return program;
}

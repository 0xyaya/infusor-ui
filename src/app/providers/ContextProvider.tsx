import { createContext, useContext } from 'react';
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import {
  useAnchorWallet,
  useConnection,
} from '@solana/wallet-adapter-react';
import IDL from '../infusedCarbonRegistry/infused_carbon_registry.json';
import { InfusedCarbonRegistry } from '../infusedCarbonRegistry/types';
import MockWallet from './mockWallet';
const WorkspaceContext = createContext({});
const programId = new PublicKey(
  '3g3YSqpjbWGYSSGTEVhP3jLavuLpH3toyE6zgMUrzzoC'
);

interface WorkSpace {
  connection?: Connection;
  provider?: AnchorProvider;
  program?: Program<InfusedCarbonRegistry>;
}

const WorkspaceProvider = ({ children }: any) => {
  const wallet = useAnchorWallet() || MockWallet;
  const { connection } = useConnection();
  if (!wallet) return;

  const provider = new AnchorProvider(connection, wallet, {});

  setProvider(provider);
  const program = new Program(IDL as Idl, programId);
  const workspace = {
    connection,
    provider,
    program,
  };

  return (
    <WorkspaceContext.Provider value={workspace}>
      {children}
    </WorkspaceContext.Provider>
  );
};

const useWorkspace = (): WorkSpace => {
  return useContext(WorkspaceContext);
};

export { WorkspaceProvider, useWorkspace };

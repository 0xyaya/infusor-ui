import * as anchor from '@coral-xyz/anchor';
import { Keypair, PublicKey, Transaction } from '@solana/web3.js';

export interface InfusedAccount {
  nftMint: PublicKey;
  // owner: string;
  carbonScore: number;
  lastInfusedTime: anchor.BN;
}

export interface LeaderBoardItem {
  nftMint: string;
  imageUri: string;
  name: string;
  collection: string;
  owner: string;
  carbonScore: string;
}

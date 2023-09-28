import { Helius } from 'helius-sdk';
import { InfusedAccount, LeaderBoardItem } from './InfusedAccount';
import { formatWithOptions } from 'util';

const helius = new Helius(
  `${process.env.NEXT_PUBLIC_API_KEY_SECRET}`,
  'mainnet-beta'
);

const fromInfusedAccount = async (account: InfusedAccount) => {
  const item = await helius.rpc.getAsset(account.nftMint);

  if (!item.content)
    return {
      nftMint: account.nftMint,
      imageUri: '',
      name: 'defaultName',
      collection: 'defaultCollection',
      owner: 'defaultOwner',
      carbonScore: 0,
    };

  const response = await fetch(item.content?.json_uri);
  const metadata = await response.json();

  const result = {
    nftMint: account.nftMint,
    imageUri: metadata.image,
    name: metadata.name,
    collection: metadata.collection.name,
    owner: item.ownership.owner.toString(),
    carbonScore: 1,
  };

  console.log('Result: ', result);

  return result;
};

export default fromInfusedAccount;

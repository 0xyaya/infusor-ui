import { Helius } from 'helius-sdk';
import { InfusedAccount, LeaderBoardItem } from './InfusedAccount';
import { formatWithOptions } from 'util';

const helius = new Helius(
  `${process.env.NEXT_PUBLIC_API_KEY_SECRET}`,
  'mainnet-beta'
);

const fromInfusedAccount = async (account: InfusedAccount) => {
  console.log('Starting helius request...');
  console.log('Input params: ', account.nftMint.toString());
  const item = await helius.rpc.getAsset(account.nftMint.toString());
  if (!item)
    return {
      nftMint: account.nftMint.toString(),
      imageUri: '',
      name: 'defaultName',
      collection: 'defaultCollection',
      owner: 'defaultOwner',
      carbonScore: '0',
    };
  console.log('Helius request result: ', item);
  if (!item.content)
    return {
      nftMint: account.nftMint.toString(),
      imageUri: '',
      name: 'defaultName',
      collection: 'defaultCollection',
      owner: 'defaultOwner',
      carbonScore: '0',
    };

  const response = await fetch(item.content?.json_uri);
  const metadata = await response.json();

  const result = {
    nftMint: account.nftMint.toString(),
    imageUri: metadata.image,
    name: metadata.name,
    collection: metadata.collection.name,
    owner: item.ownership.owner.toString(),
    carbonScore: account.carbonScore.toString(),
  };

  console.log('Result: ', result);

  return result;
};

export default fromInfusedAccount;

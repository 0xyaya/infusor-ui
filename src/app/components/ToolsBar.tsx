import {
  Text,
  Box,
  HStack,
  Button,
  Spacer,
  Input,
  Select,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { BsFillGridFill, BsFillGrid3X3GapFill } from 'react-icons/bs';

export enum GridSizeDisplay {
  LITTLE,
  BIG,
}

interface CardInfosProps {
  onGridChange: (newSizeDisplay: GridSizeDisplay) => void;
  onSearchCollection: (collection: string) => void;
  onSearchOwner: (wallet: string) => void;
}

const collections = [
  // {
  //   name: 'Carbon Tree',
  //   address: 'Gjd4f5JJy9ebKG9t3hbwPSPnS4LPbriXbpzuZ4rk542L',
  // },
  // {
  //   name: 'My NFT Collection',
  //   address: '6x6r4nPYP2yPmguMznFAnzkNrcVW2JYLzDEv2wChDBFH',
  // },
  {
    name: 'Famous Fox Federation',
    address: 'BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac',
  },
  {
    name: 'The Heist',
    address: '6d9pvGuM6iG9GVuxRzSVHEQCdy44arm6oyqu6aUzrzLo',
  },
  {
    name: 'Reavers',
    address: '6P9DSB6ifwTfSjAY6CpEvnHYfk6Sc2iYWSoM2qM4u31f',
  },
  {
    name: 'Meegos',
    address: 'HNv9G2NxgZEWLxmzFqSCWYk4moUYvNrWjbq6AY2AHJKF',
  },
  {
    name: 'SMB GEN2',
    address: 'SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W',
  },
  {
    name: 'Degenerate Ape Academy',
    address: 'DSwfRF1jhhu6HpSuzaig1G19kzP73PfLZBPLofkw6fLD',
  },
  {
    name: 'Smyths',
    address: 'CLBrjmoDCFvrW8ukxXtDrBXWkL7Yx8PKspKaBPFxhpmL',
  },
];

const ToolsBar = ({
  onGridChange,
  onSearchCollection,
  onSearchOwner,
}: CardInfosProps) => {
  const [searchOwner, setSearchOwner] = useState<string>();
  const [selectedCollection, setSelectedCollection] =
    useState<string>();
  const litleGridClickHandler = () => {
    onGridChange(GridSizeDisplay.LITTLE);
  };

  const bigGridClickHandler = () => {
    onGridChange(GridSizeDisplay.BIG);
  };

  const collectionChangeHandle = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onSearchCollection(event.target.value);
  };

  return (
    <Box position='relative' w='100%' p='8px'>
      <HStack justifyContent='space-between'>
        <Select
          w='30%'
          variant='outline'
          onChange={collectionChangeHandle}
          value={selectedCollection}
        >
          {collections.map((collection) => (
            <option
              value={collection.address}
              key={collection.address}
            >
              {collection.name}
            </option>
          ))}
        </Select>

        <Spacer />
        <Text>Owner Address:</Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!searchOwner) return;
            onSearchOwner(searchOwner);
          }}
        >
          <Input
            value={searchOwner}
            onChange={(e) => setSearchOwner(e.currentTarget.value)}
          />
        </form>
        <Spacer />
        <Button onClick={litleGridClickHandler}>
          <BsFillGrid3X3GapFill />
        </Button>
        <Button onClick={bigGridClickHandler}>
          <BsFillGridFill />
        </Button>
      </HStack>
    </Box>
  );
};

export default ToolsBar;

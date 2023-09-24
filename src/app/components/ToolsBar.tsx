import {
  Text,
  Box,
  HStack,
  Button,
  Spacer,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
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

const ToolsBar = ({
  onGridChange,
  onSearchCollection,
  onSearchOwner,
}: CardInfosProps) => {
  const [searchOwner, setSearchOwner] = useState<string>();

  const litleGridClickHandler = () => {
    onGridChange(GridSizeDisplay.LITTLE);
  };

  const bigGridClickHandler = () => {
    onGridChange(GridSizeDisplay.BIG);
  };

  const foxHandler = () => {
    onSearchCollection(
      'BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac'
    );
  };

  const heistHandler = () => {
    onSearchCollection(
      '6d9pvGuM6iG9GVuxRzSVHEQCdy44arm6oyqu6aUzrzLo'
    );
  };

  return (
    <Box position='relative' w='100%' p='8px'>
      <HStack justifyContent='space-between'>
        <Button onClick={foxHandler}>Famous Fox Foundation</Button>
        <Button onClick={heistHandler}>The Heist</Button>
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

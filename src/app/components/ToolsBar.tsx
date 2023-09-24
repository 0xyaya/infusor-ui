import {
  useColorModeValue,
  Box,
  HStack,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { BsFillGridFill, BsFillGrid3X3GapFill } from 'react-icons/bs';

export enum GridSizeDisplay {
  LITTLE,
  BIG,
}

interface CardInfosProps {
  onGridChange: (newSizeDisplay: GridSizeDisplay) => void;
}

const ToolsBar = ({ onGridChange }: CardInfosProps) => {
  const litleGridClickHandler = () => {
    onGridChange(GridSizeDisplay.LITTLE);
  };

  const bigGridClickHandler = () => {
    onGridChange(GridSizeDisplay.BIG);
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      position='relative'
      w='100%'
      p='8px'
    >
      <HStack justifyContent='space-between'>
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

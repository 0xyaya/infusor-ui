import {
  Flex,
  Circle,
  Box,
  Image,
  Button,
  HStack,
  Spacer,
  Text,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  useConnection,
  useAnchorWallet,
} from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { NftItemWithMetadata } from '../hooks/metadataLoader';

export enum GridSizeDisplay {
  LITTLE,
  BIG,
}

const NftCard = ({
  nft,
  onInfuse = (nftMint: PublicKey) => {},
  gridSizeDisplay,
}: {
  nft: NftItemWithMetadata;
  onInfuse?: (nftMint: PublicKey) => void;
  gridSizeDisplay?: GridSizeDisplay;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const wallet = useAnchorWallet();
  const connection = useConnection();
  const clickHandler = () => {};

  const mouseEnterHandler = () => {
    setIsHover(true);
  };

  const mouseLeaveHandler = () => {
    setIsHover(false);
  };

  return (
    <Box
      role='group'
      bg='gray.800'
      _hover={{
        borderColor: 'aquamarine',
        transition: '90ms',
      }}
      borderWidth='1px'
      rounded='lg'
      position='relative'
      onClick={clickHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Circle
        size='10px'
        position='absolute'
        top={2}
        right={2}
        bg='aquamarine'
      />
      <Image
        boxSize={
          gridSizeDisplay === GridSizeDisplay.LITTLE
            ? '200px'
            : '300px'
        }
        src={nft.imageUri}
        alt='Picture of something'
        roundedTop='lg'
        objectFit='cover'
      />
      <Flex justifyContent='space-between' alignContent='center'>
        <Flex
          justifyContent='space-between'
          w='100%'
          px={4}
          pt={2}
          pb={1}
        >
          <VStack w='100%'>
            <HStack justifyContent='space-between' w='100%'>
              <Text fontWeight={700} fontSize={'md'}>
                {nft.title}
              </Text>
              <Spacer />
              <Box borderWidth='1px' rounded='md' p='1'>
                <Tooltip label='Infuse your tree to get a higher carbon score.'>
                  <Text
                    fontWeight='thin'
                    letterSpacing='tighter'
                    fontSize={{
                      base: 'sm',
                      md: 'md',
                    }}
                  >
                    {nft.amount} tons
                  </Text>
                </Tooltip>
              </Box>
            </HStack>
          </VStack>
        </Flex>
      </Flex>
      <HStack
        _groupHover={{
          visibility: 'visible',
        }}
        visibility='hidden'
        justifyContent='space-evenly'
        spacing='0'
        w='100%'
      >
        <Button
          rounded='none'
          roundedBottomRight='md'
          m='0'
          w='100%'
          colorScheme='aquamarine'
        >
          Infuse
        </Button>
      </HStack>
    </Box>
  );
};

export default NftCard;

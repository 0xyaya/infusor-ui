import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
} from '@chakra-ui/react';
import { LeaderBoardItem } from './InfusedAccount';

const DataTableBoard = ({
  accounts,
}: {
  accounts: LeaderBoardItem[];
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Name</Th>
          <Th>Collection</Th>
          <Th>Owner</Th>
          <Th>CarbonScore</Th>
        </Tr>
      </Thead>
      <Tbody>
        {accounts &&
          accounts.map((account) => (
            <Tr key={account.nftMint.toString()}>
              <Td>
                <Image
                  boxSize='65px'
                  src={account.imageUri}
                  alt='Picture of something'
                  roundedTop='lg'
                  objectFit='cover'
                />
              </Td>
              <Td>{account.nftMint.toString().substring(0, 6)}...</Td>
              <Td>{account.collection}</Td>
              <Td>{account.owner.substring(0, 6)}...</Td>
              <Td>{account.carbonScore}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default DataTableBoard;

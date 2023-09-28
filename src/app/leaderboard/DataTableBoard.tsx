import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
} from '@chakra-ui/react';

const DataTableBoard = () => {
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
        <Tr>
          <Td>
            <Image
              boxSize='55px'
              src='https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208'
              alt='Picture of something'
              roundedTop='lg'
              objectFit='cover'
            />
          </Td>
          <Td>SMB G2 #2903</Td>
          <Td>SMB G2</Td>
          <Td>toly.sol</Td>
          <Td>45tons</Td>
        </Tr>
        <Tr>
          <Td>
            <Image
              boxSize='55px'
              src='https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208'
              alt='Picture of something'
              roundedTop='lg'
              objectFit='cover'
            />
          </Td>
          <Td>SMB G2 #2903</Td>
          <Td>SMB G2</Td>
          <Td>toly.sol</Td>
          <Td>45tons</Td>
        </Tr>
        <Tr>
          <Td>
            <Image
              boxSize='55px'
              src='https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208'
              alt='Picture of something'
              roundedTop='lg'
              objectFit='cover'
            />
          </Td>
          <Td>SMB G2 #2903</Td>
          <Td>SMB G2</Td>
          <Td>toly.sol</Td>
          <Td>45tons</Td>
        </Tr>
        <Tr>
          <Td>
            <Image
              boxSize='55px'
              src='https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208'
              alt='Picture of something'
              roundedTop='lg'
              objectFit='cover'
            />
          </Td>
          <Td>SMB G2 #2903</Td>
          <Td>SMB G2</Td>
          <Td>toly.sol</Td>
          <Td>45tons</Td>
        </Tr>
        <Tr>
          <Td>
            <Image
              boxSize='55px'
              src='https://n64bqgoqm7nbbjabdc23fefhqa5pepvlvuj6v3uxzn6qx7i43nhq.arweave.net/b7gYGdBn2hCkARi1spCngDryPqutE-rul8t9C_0c208'
              alt='Picture of something'
              roundedTop='lg'
              objectFit='cover'
            />
          </Td>
          <Td>SMB G2 #2903</Td>
          <Td>SMB G2</Td>
          <Td>toly.sol</Td>
          <Td>45tons</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default DataTableBoard;

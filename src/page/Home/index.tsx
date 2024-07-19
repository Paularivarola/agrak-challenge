import React from 'react';
import { Text } from '@chakra-ui/react';
import TableUsers from '../Users';

const Home: React.FC = () => {
  return (
    <div>
      <Text as="h1" fontSize="4xl" fontWeight="bold" textColor="black" m="2rem 6rem">
        UserManagePro
      </Text>
      <TableUsers />
    </div>
  );
};

export default Home;

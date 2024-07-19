import UserList from './components/UserList';
import { Box, Flex } from '@chakra-ui/react';
import ButtonCustom from '../../components/ButtonCustom';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../models/routes';

const Users = () => {
  const navigate = useNavigate();
  const handleAddUser = () => navigate(PublicRoutes.USER_CREATE);
  return (
    <Flex justifyContent="center" alignItems="center">
      <Box>
        <Flex justifyContent="end">
          <ButtonCustom text="Add user" onClick={handleAddUser} />
        </Flex>
        <UserList />
      </Box>
    </Flex>
  );
};

export default Users;

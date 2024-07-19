// @ts-nocheck
import { Table, Thead, Tbody, Tr, Th, Td, Avatar, Box, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { User } from '../../interfaces/user';
import { ParameterServices } from '../../services/users_services';
import Loading from '../../../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import ActionsList from '../ActionsList';
import { useSEOHeadData } from '../../../../hooks/useSEOHeadData';
import { StickyThead, StyledBox } from './styles';

const UserList: React.FC = () => {
  const { isError, data, isLoading } = useQuery<AxiosResponse<User[]>>({ queryKey: ['getUsers'], queryFn: ParameterServices.getUsers, refetchOnWindowFocus: true });
  useSEOHeadData({ title: isLoading ? 'Loading..' : 'Users List' });

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error fetching users
      </Alert>
    );
  }

  return (
    <StyledBox padding="2rem" marginTop="1rem">
      {isLoading && <Loading repeatSkeleton={5} />}
      {data?.length > 0 ? (
        <Box overflow="auto" maxHeight="80vh" minHeight="80vh">
          <Table textColor="black" variant="simple" width="100%">
            <StickyThead position="sticky" top={0} zIndex={1} bg="white">
              <Tr textColor="black">
                <Th textColor="black">Avatar</Th>
                <Th textColor="black">First Name</Th>
                <Th textColor="black">Second Name</Th>
                <Th textColor="black">Email</Th>
                <Th textColor="black">Actions</Th>
              </Tr>
            </StickyThead>

            <Tbody>
              {data?.map((user: User) => (
                <Tr key={user.id}>
                  <Td>
                    <Avatar src={user.avatar} />
                  </Td>
                  <Td>{user.first_name}</Td>
                  <Td>{user.second_name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <ActionsList {...user} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        !isLoading && !isError && <Text textAlign="center">No hay resultados</Text>
      )}
    </StyledBox>
  );
};

export default UserList;

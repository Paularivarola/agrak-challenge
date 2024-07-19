import { Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { FiTrash } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ParameterServices } from '../../services/users_services';
import { PublicRoutes } from '../../../../models/routes';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/user';

const ActionsList = ({ id }: User) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteUserMutation = useMutation({
    mutationFn: (id: User['id']) => ParameterServices.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
      toast({
        title: 'Éxito',
        description: 'Usuario eliminado correctamente.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `No se pudo eliminar el usuario: ${error.message}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleEditUser = (id: User['id']) => navigate(`${PublicRoutes.USER_CREATE}/${id}`);

  const handleDelete = (id: User['id']) => deleteUserMutation.mutate(id);

  return (
    <Menu placement="start-start">
      <MenuButton as={IconButton} aria-label="Options" variant="outline" icon={<FiMoreVertical />} />
      <MenuList>
        <MenuItem icon={<FiEdit2 />} onClick={() => handleEditUser(id)}>
          Edit
        </MenuItem>
        <MenuItem icon={<FiTrash />} onClick={() => handleDelete(id)}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ActionsList;

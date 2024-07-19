import { callApi } from '../../../services/utilServices';
import { User } from '../interfaces/user';

export const ParameterServices = (callService => {
  const getUsers = () => {
    return callService({
      url: '/users',
    });
  };

  const addNewUser = (data: User) => {
    return callService({
      url: '/users',
      method: 'post',
      data,
    });
  };
  const editUser = (data: User) => {
    return callService({
      url: `/users/${data.id}`,
      method: 'put',
      data,
    });
  };
  const getUserById = (userId: User['id']) => {
    return callService({
      url: `/users/${userId}`,
      method: 'get',
    });
  };
  const deleteUser = (userId: User['id']) => {
    return callService({
      url: `/users/${userId}`,
      method: 'delete',
    });
  };

  return {
    getUsers,
    addNewUser,
    editUser,
    getUserById,
    deleteUser,
  };
})(callApi);

import http from './http.service';

export const getUser = async id => {
  const { user } = await http.get(`/api/users/${id}`);
  return user;
};

export const saveUser = async user => {
  const { user: updatedUser } = await http.put(`/api/users/${user.id}`, user);
  return updatedUser;
};

import http from './http.service';

export const getUser = async id => {
  const { user } = await http.get(`/api/users/${id}`);
  return user;
};

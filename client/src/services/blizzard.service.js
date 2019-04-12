import http from './http.service';

export const getProfiles = async (id, token) =>
  await http.crossDomain_get(`https://us.api.blizzard.com/sc2/player/${id}?access_token=${token}`);

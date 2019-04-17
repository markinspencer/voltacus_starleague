import { flatten } from 'ramda';
import http from './http.service';

const BASE_URL = 'https://us.api.blizzard.com/sc2';
const SC2_PROFILE_URL = `${BASE_URL}/profile`;
const SC2_PLAYER_URL = `${BASE_URL}/player`;

export const regionLookup = {
  1: 'Americas',
  2: 'Europe',
  3: 'Korea and Taiwan',
  5: 'China'
};

export const raceLookup = {
  protoss: 'Protoss',
  terran: 'Terran',
  zerg: 'Zerg',
  random: 'Random'
};

const only1v1 = showCaseEntry => showCaseEntry.team.localizedGameMode === '1v1';

const getRegion = regionId => ({
  id: regionId,
  displayName: regionLookup[regionId]
});

const showCaseEntryToLadderInfo = async (showCaseEntry, params) => {
  const { ladderId, team, wins, losses, rank, leagueName: league } = showCaseEntry;
  const { regionId, realmId, profileId, token } = params;

  const raceName = team.members[0].favoriteRace;
  const race = raceLookup[raceName];

  const region = getRegion(regionId);

  const mmr = await getMMR(regionId, realmId, profileId, ladderId, token);

  return {
    region,
    realmId,
    profileId,
    ladderId,
    wins,
    losses,
    rank,
    league,
    race,
    mmr
  };
};

export const getAccountDetails = async (id, token) => {
  try {
    const { data: profiles } = await getProfiles(id, token);

    const loadedProfiles = profiles.map(async profile => {
      const { profileId, regionId, realmId, name, avatarUrl, profileUrl } = profile;
      const ladderInfo = await getLadderInfo(regionId, realmId, profileId, token);

      return ladderInfo.map(info => ({
        name,
        avatarUrl,
        profileUrl,
        ...info
      }));
    });

    const accountInfo = await Promise.all(loadedProfiles);

    return flatten(accountInfo);
  } catch (err) {
    console.error(err);
  }
};

export async function getProfiles(id, token) {
  const url = `${SC2_PLAYER_URL}/${id}?access_token=${token}`;
  return await http.crossDomain_get(url);
}

export async function getLadderInfo(regionId, realmId, profileId, token) {
  const url = `${SC2_PROFILE_URL}/${regionId}/${realmId}/${profileId}/ladder/summary?local=enUS&access_token=${token}`;
  const {
    data: { showCaseEntries }
  } = await http.crossDomain_get(url);

  const params = { regionId, realmId, profileId, token };
  const info = showCaseEntries
    .filter(only1v1)
    .map(showCaseEntry => showCaseEntryToLadderInfo(showCaseEntry, params));

  return await Promise.all(info);
}

export const getMMR = async (regionId, realmId, profileId, ladderId, token) => {
  const url = `${SC2_PROFILE_URL}/${regionId}/${realmId}/${profileId}/ladder/${ladderId}?local=enUS&access_token=${token}`;
  const {
    data: {
      ranksAndPools: [{ mmr }]
    }
  } = await http.crossDomain_get(url);

  return mmr;
};

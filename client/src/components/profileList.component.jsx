import React, { Component } from 'react';

import { getProfiles } from './../services/blizzard.service';
import { getCurrentUser } from '../services/auth.service';

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
  }

  async componentWillMount() {
    const { id, token } = getCurrentUser();
    const { data: profiles } = await getProfiles(id, token);
    this.setState({ profiles });
  }

  render() {
    return (
      <ul>
        {this.state.profiles.map(profile => (
          <li key={profile.profileId}> {profile.name} </li>
        ))}
      </ul>
    );
  }
}

export default ProfileList;

import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { getAccountDetails } from '../../services/blizzard.service';
import { getCurrentUser } from '../../services/auth.service';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { filter, pipe, map, uniq } from 'ramda';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 0
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { region: '', ladderId: '' },
      profiles: [],
      selectedProfile: {},
      isLoading: true
    };
  }

  async componentWillMount() {
    const user = getCurrentUser();
    const profiles = await getAccountDetails(user.id, user.token);

    const updatedUser = {
      ...this.state.user,
      ...user
    };

    updatedUser.region = '';

    this.setState({
      user: updatedUser,
      profiles,
      isLoading: false
    });
  }

  handleRegionChange = async e => {
    const regionId = e.target.value;
    const { user } = this.state;

    const updatedUser = {
      ...user,
      region: regionId
    };

    this.setState({ user: updatedUser });
  };

  handleRaceChange = async e => {
    const ladderId = e.target.value;
    const { user, profiles } = this.state;

    const updatedUser = {
      ...user,
      ladderId
    };
    const [selectedProfile] = profiles.filter(
      profile => profile.region.id === user.region && profile.ladderId === ladderId
    );

    this.setState({ user: updatedUser, selectedProfile });
  };

  renderRegionOptions(profiles) {
    const profileToRegion = ({ region }) => region;
    const regionToOption = ({ id, displayName }) => (
      <MenuItem key={id} value={id}>
        {displayName}
      </MenuItem>
    );

    return pipe(
      map(profileToRegion),
      uniq,
      map(regionToOption)
    )(profiles);
  }

  renderRaceOptions(profiles) {
    const currentRegionOnly = profile => profile.region.id === this.state.user.region;
    const profileToOption = ({ ladderId, race }) => (
      <MenuItem key={ladderId} value={ladderId}>
        {race}
      </MenuItem>
    );

    return pipe(
      filter(currentRegionOnly),
      map(profileToOption)
    )(profiles);
  }

  render() {
    const { selectedProfile: profile, profiles, user, isLoading } = this.state;
    const { classes } = this.props;

    const regionOptions = this.renderRegionOptions(profiles);
    const raceOptions = this.renderRaceOptions(profiles);

    if (isLoading) return <div> Loading User Data </div>;

    return (
      <React.Fragment>
        <FormControl className={classes.formControl}>
          <Select
            value={user.region}
            onChange={this.handleRegionChange}
            name="region"
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select Region
            </MenuItem>
            {regionOptions}
          </Select>
          <FormHelperText> Region </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            value={user.ladderId}
            onChange={this.handleRaceChange}
            name="ladderId"
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select Race
            </MenuItem>
            {raceOptions}
          </Select>
          <FormHelperText> Race </FormHelperText>
        </FormControl>

        {profile.profileId && (
          <React.Fragment>
            <h5> {profile.name} </h5>
            <div>
              <Avatar
                style={{ marginRight: '15px', display: 'inline-block' }}
                alt={profile.name}
                src={profile.avatarUrl}
                className={classes.avatar}
              />
              <ul
                style={{
                  display: 'inline-block',
                  marginBlockStart: 0,
                  marginBlockEnd: 0,
                  verticalAlign: 'top'
                }}
              >
                <li>League: {profile.league} </li>
                <li>MMR: {profile.mmr}</li>
                <li>Win: {profile.wins}</li>
                <li>Loss: {profile.losses}</li>
              </ul>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Profile);

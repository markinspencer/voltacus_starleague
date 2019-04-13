import { Component } from 'react';
import queryString from 'query-string';
import { getCurrentUser, setCurrentUser, logout } from '../../services/auth.service';

class Login extends Component {
  componentWillMount = () => {
    const { token } = queryString.parse(this.props.location.search);
    setCurrentUser(token);

    const user = getCurrentUser();

    if (!user) logout();
    window.location = '/';
  };

  render = () => null;
}

export default Login;

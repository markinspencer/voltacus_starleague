import React, { Component } from 'react';
import NavBar from './components/navBar.component';
import Login from './components/common/login.component';
import Logout from './components/common/logout.component';
import Profile from './components/profile/profile.component';
import { Route, Switch } from 'react-router-dom';
import { getCurrentUser } from './services/auth.service';

class App extends Component {
  render() {
    const user = getCurrentUser();
    return (
      <React.Fragment>
        <div className="App">
          <NavBar user={user} />
          <main role="main" className="container">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

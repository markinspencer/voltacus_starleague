import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav class="light-blue lighten-1" role="navigation">
          <div class="nav-wrapper container">
            <a id="logo-container" href="#" class="brand-logo">
              Voltucus StarLeague
            </a>
            <ul class="right hide-on-med-and-down">
              <li>
                <a href="#">Sign in</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default App;

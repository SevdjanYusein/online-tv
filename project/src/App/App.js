import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Login from '../containers/Login/Login';
import Live from '../containers/Live/Live';
import OnRecord from '../containers/OnRecord/OnRecord';
import Subscriptions from '../containers/Subscriptions/Subscription';
import '../styles/app.scss';

import * as loginActions from '../actions/loginActions';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={this.props.isUserAuthenticated ? Live : Login} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/channels' component={Live} authenticated={this.props.isUserAuthenticated} />
        <PrivateRoute path='/on-record' component={OnRecord} authenticated={this.props.isUserAuthenticated} />
        <PrivateRoute
          exact path={'/order/subscriptions'}
          component={Subscriptions}
          authenticated={this.props.isUserAuthenticated}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.isUserAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(loginActions.authCheckState()),
    onLogin: (email, password, rememberme) => dispatch(loginActions.login(email, password, rememberme)),
    onLogout: () => dispatch(loginActions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import 'react-bootstrap-table/css/react-bootstrap-table-all.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import UserBar from './UserBar';

class App extends Component {// eslint-disable-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Fruandes OMS</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <UserBar />
        </Navbar>
        <div>
        </div>


        <div style={{marginTop: '1.5em'}}>   {localStorage.getItem('authUser_oms') > 0 ? this.props.children : null}</div>
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {usuariosReducer} = state;
  const {
    authUser,
  } = usuariosReducer;
  return {
    authUser,
  };
}

export default connect(mapStateToProps)(App);

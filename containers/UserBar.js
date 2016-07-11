/**
 * Created by enriq on 5/07/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {
  loadUsuarios,
  destroyUsuario,
  createUsuario,
  updateUsuario,
  stopAddingUsuario,
  startAddingUsuario,
  loginUsuario,
  logoutUsuario
} from '../actions/usuarioActions';
import {browserHistory} from 'react-router';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import {Grid, Accordion, Panel, Col, Row, Well, Breadcrumb, Button, FormGroup, FormControl} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

import moment from 'moment';

class UserBar extends Component {

  constructor(props) {
    super(props);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    this.props.loadUsuarios();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateUsuarios) {
      this.props.loadUsuarios();
    }
  }

  onSubmitLogin() {
    let email_usuario = this.state.email_usuario;
    let pwd = this.state.pwd;
    this.props.loginUsuario({email_usuario, pwd});
  }

  onLogout() {
    this.props.logoutUsuario();
  }

  renderLoginForm() {
    return ( <Nav pullRight>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Email"
            onChange={(e) => {
              this.setState({email_usuario: e.target.value});
            }}/>
          {' '}
          <FormControl
            type="password"
            placeholder="Contrasena"
            onChange={(e) => {
              this.setState({pwd: e.target.value});
            }}
          />
        </FormGroup>
                   {' '}
        <Button
          type="submit"
          onClick={this.onSubmitLogin}>Entrar</Button>
      </Navbar.Form>
    </Nav>)
  }

  renderNav() {
    let authUser_oms = localStorage.getItem('authUser_oms');
    let authUser;
    if (this.props.usuarios.length > 0) {
      authUser = this.props.usuarios.filter(user => user.id == authUser_oms);
    }
    return (
      <div>
        <Nav activeKey={1}>
          <IndexLinkContainer to="/">
            <NavItem eventKey={1}>Home</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/taskspage/1/0/0/0">
            <NavItem eventKey={2}>Areas</NavItem>
          </LinkContainer>
          <LinkContainer to="/taskspage/2/0/0/0">
            <NavItem eventKey={2}>Proyectos</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={3} title={authUser ? authUser[0].nombre_usuario : ''} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} href="/users">Cambiar contrasena</MenuItem>
            {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
            {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
            <MenuItem divider/>
            <MenuItem eventKey={3.3} onClick={this.onLogout}>Logout</MenuItem>
          </NavDropdown>
             {/*<NavItem eventKey={1} href="#">Link Right</NavItem>*/}
             {/*<NavItem eventKey={2} href="#">Link Right</NavItem>*/}
        </Nav>
      </div>
    );
  }

  render() {
    console.error('localStorage', localStorage.getItem('authUser_oms'))
    return (<Navbar.Collapse>
      {localStorage.getItem('authUser_oms') > 0 ? this.renderNav() : this.renderLoginForm()}
    </Navbar.Collapse>);
  }
}

UserBar.propTypes = {
  isAddingUsuario: PropTypes.bool.isRequired,
  shouldUpdateUsuarios: PropTypes.bool.isRequired,
  usuarios: PropTypes.array.isRequired,
  authUser: PropTypes.number.isRequired,
  loadUsuarios: PropTypes.func,
  destroyUsuario: PropTypes.func,
  createUsuario: PropTypes.func,
  updateUsuario: PropTypes.func,
  stopAddingUsuario: PropTypes.func,
  startAddingUsuario: PropTypes.func,
  loginUsuario: PropTypes.func,
  logoutUsuario: PropTypes.func,
};

function mapStateToProps(state) {
  const {usuariosReducer} = state;
  const {
    usuarios,
    authUser,
    isAddingUsuario,
    shouldUpdateUsuarios
  } = usuariosReducer;
  return {
    usuarios,
    authUser,
    isAddingUsuario,
    shouldUpdateUsuarios
  };
}

export default connect(mapStateToProps, {
  loadUsuarios,
  destroyUsuario,
  createUsuario,
  updateUsuario,
  stopAddingUsuario,
  startAddingUsuario,
  loginUsuario,
  logoutUsuario
})(UserBar);

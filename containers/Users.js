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
} from '../actions/usuarioActions';
import {browserHistory} from 'react-router';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import {Grid, Accordion, Panel, Col, Row, Well, Breadcrumb, Button, FormGroup, FormControl} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import UsuarioForm from '../components/UsuarioForm'
import moment from 'moment';

class UsuarioBar extends Component {

  constructor(props) {
    super(props);
    this.handleUsuarioSubmit = this.handleUsuarioSubmit.bind(this);
    this.usuarioRemove = this.usuarioRemove.bind(this);
    this.usuarioAdd = this.usuarioAdd.bind(this);
    this.usuarioCancel = this.usuarioCancel.bind(this);
    this.usuarioAfterSave = this.usuarioAfterSave.bind(this);

  }

  componentDidMount() {
    this.props.loadUsuarios();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateUsuarios) {
      this.props.loadUsuarios();
    }
  }

  usuarioRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyUsuario(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  usuarioCancel() {
    this.props.stopAddingUsuario();
  }

  usuarioAdd() {
    if (!this.props.isAddingUsuario) {
      this.props.startAddingUsuario();
    }
  }

  usuarioAfterSave(row) {
    if (row.id) {
      // this.props.updateUsuario(row);
      if (row.nombre_usuario) {
        if (row.email_usuario) {
          if (row.pwd && row.pwd == row.pwd2) {
            this.props.createUsuario(row);
            this.props.stopAddingUsuario();
          } else {
            toastr.warning('Cuidado', 'Verifique su contrasena');
          }
        } else {
          toastr.warning('Cuidado', 'Email del usuario requerido');
        }
      } else {
        toastr.warning('Cuidado', 'Nombre del usuario requerido');
      }
    } else {
      toastr.error('Error', 'Usuario no existe');
    }
  }


  renderUsuariosTable(usuarios) {
    return (
      <UsuariosTable
        usuarios={usuarios}
        usuarioRemove={this.usuarioRemove}
        usuarioAdd={this.usuarioAdd}
        usuarioCancel={this.usuarioCancel}
        usuarioAfterSave={this.usuarioAfterSave}
        isAddingUsuario={this.props.isAddingUsuario}
      />
    );
  }

  handleUsuarioSubmit(usuario) {
    debugger
    this.usuarioAfterSave(usuario)
  }

  renderUsuarioForm() {
    let initialValues = this.props.usuarios.filter(usuario => usuario.id == localStorage.getItem('authUser_oms'));
    return (
      <Well>
        <UsuarioForm
          onSubmit={this.handleUsuarioSubmit}
          initialValues={initialValues[0]}
        />
      </Well>
    );
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              {this.renderUsuarioForm()}
            </Col>
          </Row>
          {/*<Row>*/}
          {/*<Col md={12}>*/}
          {/*{this.renderUsuariosTable(usuariosData)}*/}
          {/*</Col>*/}
          {/*</Row>*/}
        </Grid>
      </div>
    );
  }
}

UsuarioBar.propTypes = {
  isAddingUsuario: PropTypes.bool.isRequired,
  shouldUpdateUsuarios: PropTypes.bool.isRequired,
  usuarios: PropTypes.array.isRequired,
  authUsuario: PropTypes.number.isRequired,
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
    authUsuario,
    isAddingUsuario,
    shouldUpdateUsuarios
  } = usuariosReducer;
  return {
    usuarios,
    authUsuario,
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
})(UsuarioBar);

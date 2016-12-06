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
import UsuarioTable from '../components/UsuarioTable'
import Permisos from './Permisos';
import moment from 'moment';

class Usuario extends Component {

  constructor(props) {
    super(props);
    this.handleUsuarioSubmit = this.handleUsuarioSubmit.bind(this);
    this.usuarioRemove = this.usuarioRemove.bind(this);
    this.usuarioAdd = this.usuarioAdd.bind(this);
    this.usuarioCancel = this.usuarioCancel.bind(this);
    this.usuarioAfterSave = this.usuarioAfterSave.bind(this);
    this.usuarioAfterSaveAdmin = this.usuarioAfterSaveAdmin.bind(this);
    this.usuarioChangeStatus = this.usuarioChangeStatus.bind(this);

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
    if (row.nombre_usuario) {
      if (row.email_usuario) {
        if (row.pwd && row.pwd == row.pwd2) {
          if (row.id) {
            this.props.updateUsuario(row);
          } else {
            this.props.createUsuario(row);
          }
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
  }

  usuarioAfterSaveAdmin(row) {
    if (row.nombre_usuario) {
      if (row.email_usuario) {
        if (row.pwd == '') {
          delete row.pwd;
        }
        if (row.id) {
          this.props.updateUsuario(row);
        } else {
          if (row.pwd) {
            this.props.createUsuario(row);
            this.props.stopAddingUsuario();
          } else {
            toastr.warning('Cuidado', 'Password del usuario requerido');
          }
        }
      } else {
        toastr.warning('Cuidado', 'Email del usuario requerido');
      }
    } else {
      toastr.warning('Cuidado', 'Nombre del usuario requerido');
    }
  }

  usuarioChangeStatus(row, value) {
    Object.assign(row, {
      perfil: value,
    });
    debugger;
    this.props.updateUsuario(row);
  }

  renderUsuariosTable() {
    let userFilter = this.props.usuarios.filter(usuario => usuario.id == localStorage.getItem('authUser_oms'));
    let user = userFilter[0];
    if (user) {
      if (user.perfil == "666") {
        return (
          <div>
            <UsuarioTable
              usuarios={this.props.usuarios}
              usuarioRemove={this.usuarioRemove}
              usuarioAdd={this.usuarioAdd}
              usuarioCancel={this.usuarioCancel}
              usuarioAfterSave={this.usuarioAfterSaveAdmin}
              usuarioChangeStatus={this.usuarioChangeStatus}
              isAddingUsuario={this.props.isAddingUsuario}
            />
            <Permisos />
          </div>
        );
      }
      if (user.perfil == "333") {
        return (
          <Permisos />
        );
      }
    }
  }

  handleUsuarioSubmit(usuario) {
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
    let renderBreadcrumb = '';
    if (this.props.params.admin == 0) {
      renderBreadcrumb = (
        <Breadcrumb.Item active>
          Usuario
        </Breadcrumb.Item>)
    }else if (this.props.params.admin == 1) {
      renderBreadcrumb = (
        <Breadcrumb.Item active>
          Administracion
        </Breadcrumb.Item>)
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item
            href="/">
            Home
          </Breadcrumb.Item>
          {renderBreadcrumb}
        </Breadcrumb>
        <Grid>
          <Row>
            <Col md={12}>
              {this.props.params.admin == 0
                ? this.renderUsuarioForm()
                : ''}
              {this.props.params.admin == 1
                ? this.renderUsuariosTable()
                : ''}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Usuario.propTypes = {
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
})(Usuario);

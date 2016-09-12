/**
 * Created by enriq on 5/07/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {
  loadPermisos,
  destroyPermiso,
  createPermiso,
  updatePermiso,
  stopAddingPermiso,
  startAddingPermiso,
  updateRenderOptions
} from '../actions/permisoActions';
import {
  loadAreas,
} from '../actions/areaActions';
import {
  loadUsuarios,
} from '../actions/usuarioActions';
import {Grid, Glyphicon, Panel, Col, Row, ControlLabel, Button, FormGroup, FormControl} from 'react-bootstrap';

class Permisos extends Component {

  constructor(props) {
    super(props);
    this.permisoRemove = this.permisoRemove.bind(this);
    this.permisoAdd = this.permisoAdd.bind(this);
    this.permisoCancel = this.permisoCancel.bind(this);
    this.permisoAfterSave = this.permisoAfterSave.bind(this);
    this.permisoAfterSaveAdmin = this.permisoAfterSaveAdmin.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleUsuariosSinPermisoChange = this.handleUsuariosSinPermisoChange.bind(this);
    this.handleUsuariosConPermisoChange = this.handleUsuariosConPermisoChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.props.loadPermisos();
    this.props.loadAreas();
    this.props.loadUsuarios();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdatePermisos) {
      this.props.loadPermisos();
    }
    if (nextProps.shouldUpdateAreas) {
      this.props.loadAreas();
    }
    if (nextProps.shouldUpdateUsuarios) {
      this.props.loadUsuarios();
    }
  }

  permisoRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyPermiso(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  permisoCancel() {
    this.props.stopAddingPermiso();
  }

  permisoAdd() {
    if (!this.props.isAddingPermiso) {
      this.props.startAddingPermiso();
    }
  }

  permisoAfterSave(row) {
    if (row.nombre_permiso) {
      if (row.email_permiso) {
        if (row.pwd && row.pwd == row.pwd2) {
          if (row.id) {
            this.props.updatePermiso(row);
          } else {
            this.props.createPermiso(row);
          }
          this.props.stopAddingPermiso();
        } else {
          toastr.warning('Cuidado', 'Verifique su contrasena');
        }
      } else {
        toastr.warning('Cuidado', 'Email del permiso requerido');
      }
    } else {
      toastr.warning('Cuidado', 'Nombre del permiso requerido');
    }
  }

  permisoAfterSaveAdmin(row) {
    if (row.nombre_permiso) {
      if (row.email_permiso) {
        if (row.pwd == '') {
          delete row.pwd;
        }
        if (row.id) {
          this.props.updatePermiso(row);
        } else {
          if (row.pwd) {
            this.props.createPermiso(row);
            this.props.stopAddingPermiso();
          } else {
            toastr.warning('Cuidado', 'Password del permiso requerido');
          }
        }
      } else {
        toastr.warning('Cuidado', 'Email del permiso requerido');
      }
    } else {
      toastr.warning('Cuidado', 'Nombre del permiso requerido');
    }
  }

  handleAreaChange(e) {
    this.props.updateRenderOptions({area_id: e.target.value});
  }

  handleUsuariosSinPermisoChange(e) {
    this.props.updateRenderOptions(Object.assign(this.props.renderOptions,
      {selectedUsuariosSinPermiso: e.target.selectedOptions}));
  }

  handleUsuariosConPermisoChange(e) {
    this.props.updateRenderOptions(Object.assign(this.props.renderOptions,
      {selectedUsuariosConPermiso: e.target.selectedOptions}));
  }

  handleAdd() {
    let area_id = this.props.renderOptions.area_id;
    for (let user of this.props.renderOptions.selectedUsuariosSinPermiso) {
      this.props.createPermiso({area_id, usuario_id: user.value});
    }
  }

  handleRemove() {
    for (let permiso of this.props.renderOptions.selectedUsuariosConPermiso) {
      this.props.destroyPermiso({id: permiso.value})
    }
  }

  render() {
    let usuariosConPermiso = this.props.permisos.filter(permiso => permiso.area_id == this.props.renderOptions.area_id);
    usuariosConPermiso.map(permiso => {
      let user = this.props.usuarios.find(usuario => permiso.usuario_id == usuario.id)
      if (user) {
        permiso.nombre_usuario = user.nombre_usuario;
      }
    })
    let ids = usuariosConPermiso.map(permiso => (permiso.usuario_id));
    let usuariosSinPermiso = this.props.usuarios.filter(usuario => !ids.find(id => id == usuario.id));
    const title = (
      <h3>Miembros</h3>
    );
    return (
      <Panel header={title} bsStyle="primary" eventKey="1">
        <Row>
          <br />
          <Col md={5}>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Fruandes</ControlLabel>
              <FormControl
                componentClass="select"
                multiple
                onChange={this.handleUsuariosSinPermisoChange}
                size="13"
              >
                {usuariosSinPermiso.map(user =>
                  <option
                    value={user.id}
                    key={user.id}>
                    {user.nombre_usuario}
                  </option>)}
              </FormControl>
            </FormGroup>
          </Col>
          <Col md={2}>
            <br />
            <br />
            <br />
            <center>
              <Button
                bsSize="xsmall"
                onClick={() => this.handleRemove()}
              >
                <Glyphicon glyph="arrow-left"/>
              </Button>
              <Button
                bsSize="xsmall"
                onClick={() => this.handleAdd()}
              >
                <Glyphicon glyph="arrow-right"/>
              </Button>
            </center>
          </Col>
          <Col md={5}>
            <FormGroup
              controlId="formControlsSelect"
              bsSize="lg"
            >
              <ControlLabel>Area o proyecto</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.handleAreaChange}
              >
                <option value="">
                  Seleccione...
                </option>
                {this.props.areas.map(area =>
                  <option
                    value={area.id}
                    key={area.id}>
                    {area.nombre_area}
                  </option>)}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelectMultiple">
              <FormControl
                componentClass="select"
                multiple
                onChange={this.handleUsuariosConPermisoChange}
                size="10"
              >
                {usuariosConPermiso.map(permiso =>
                  <option
                    value={permiso.id}
                    key={permiso.id}>
                    {permiso.nombre_usuario}
                  </option>)}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Panel>
    );
  }
}

Permisos.propTypes = {
  isAddingPermiso: PropTypes.bool.isRequired,
  shouldUpdatePermisos: PropTypes.bool.isRequired,
  permisos: PropTypes.array.isRequired,
  authPermiso: PropTypes.number.isRequired,
  loadPermisos: PropTypes.func,
  destroyPermiso: PropTypes.func,
  createPermiso: PropTypes.func,
  updatePermiso: PropTypes.func,
  stopAddingPermiso: PropTypes.func,
  startAddingPermiso: PropTypes.func,
  loginPermiso: PropTypes.func,
  logoutPermiso: PropTypes.func,
};

function mapStateToProps(state) {
  const {usuariosReducer, areasReducer, permisosReducer} = state;
  const {
    usuarios,
    shouldUpdateUsuarios
  } = usuariosReducer;
  const {
    areas,
    shouldUpdateAreas
  } = areasReducer;
  const {
    permisos,
    shouldUpdatePermisos,
    renderOptions
  } = permisosReducer;
  return {
    areas,
    usuarios,
    permisos,
    shouldUpdatePermisos,
    shouldUpdateAreas,
    shouldUpdateUsuarios,
    renderOptions
  };
}

export default connect(mapStateToProps, {
  loadPermisos,
  destroyPermiso,
  createPermiso,
  updatePermiso,
  stopAddingPermiso,
  startAddingPermiso,
  loadAreas,
  loadUsuarios,
  updateRenderOptions
})(Permisos);

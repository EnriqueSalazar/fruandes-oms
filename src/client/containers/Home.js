import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {
  loadPermisos
} from '../actions/permisoActions';
import {
  loadAreas,
  destroyArea,
  createArea,
  updateArea,
  stopAddingArea,
  startAddingArea,
  updateRenderOptions,
  startModalArea,
  stopModalArea
} from '../actions/areaActions';
import {
  loadClientes,
  destroyClientes,
  createClientes,
  updateClientes,
  stopAddingClientes,
  startAddingClientes,
  //updateRenderOptions,
  startModalClientes,
  stopModalClientes
} from '../actions/clientesActions';
import {
  loadCustom,
  destroyCustom,
  createCustom,
  updateCustom,
  stopAddingCustom,
  startAddingCustom,
  startModalCustom,
  stopModalCustom
} from '../actions/customActions';
import {
  loadTareas,
  destroyTarea,
  createTarea,
  updateTarea,
  stopAddingTarea,
  startAddingTarea,
  startModalTarea,
  stopModalTarea
} from '../actions/tareaActions';
import {
  loadActiveRecurrentes,
  updateRecurrente,
  doneRecurrente
} from '../actions/recurrenteActions';
import {
  loadMetas,
  destroyMeta,
  createMeta,
  updateMeta,
  stopAddingMeta,
  startAddingMeta,
  startModalMeta,
  stopModalMeta
} from '../actions/metaActions';
import {
  loadComentariosAreas,
  destroyComentariosArea,
  createComentariosArea,
  updateComentariosArea
} from '../actions/comentariosAreaActions';
import HomeTable from '../components/HomeTable';
import RecurrentesHomeTable from '../components/RecurrentesHomeTable';
import HomeButtons from '../components/HomeButtons';
import {browserHistory} from 'react-router';
import {Grid, Col, Row, Well, Breadcrumb, Jumbotron} from 'react-bootstrap';
import moment from 'moment';


class Home extends Component {

  constructor(props) {
    super(props);
    this.tareaChangeStatus = this.tareaChangeStatus.bind(this);
    this.recurrenteDone = this.recurrenteDone.bind(this);
  }

  componentDidMount() {
    console.error('componentDidMount');
    this.props.loadAreas();
    this.props.loadTareas();
    this.props.loadPermisos();
    this.props.loadClientes();
    this.props.loadCustom();
    if (localStorage.getItem('authUser_oms')) {
      this.props.loadActiveRecurrentes({id_responsable_recurrente: localStorage.getItem('authUser_oms')});
    }

  }

  componentWillReceiveProps(nextProps) {
    console.error('componentWillReceiveProps');
    if (nextProps.shouldUpdateAreas) {
      this.props.loadPermisos();
      this.props.loadAreas();
    }
    if (nextProps.shouldUpdateTareas) {
      this.props.loadTareas();
    }
    if (nextProps.shouldUpdateClientes) {
      this.props.loadClientes();
    }
    if (nextProps.shouldUpdateRecurrentes) {
      if (localStorage.getItem('authUser_oms')) {
        this.props.loadActiveRecurrentes({id_responsable_recurrente: localStorage.getItem('authUser_oms')});
      }
    }
  }

  areaDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.id + '/0/0');
  }

  tareaDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.area_id + '/' + row.meta_id + '/' + row.id);
  }

  tareaChangeStatus(row) {
console.error('tareaChangeStatus');
    (row.estado_tarea) ?
      Object.assign(row, {
        estado_tarea: false,
        done_tarea: null
      }) :
      Object.assign(row, {
        estado_tarea: true,
        done_tarea: moment()
      });
    this.props.updateTarea(row);
  }

  recurrenteDone(row) {
    console.error('recurrenteDone');
    const toastrConfirmOptions = {
      onOk: () => this.props.doneRecurrente({recurrente_id:row.id})
    };
    toastr.confirm('Confirmar realizacion de tarea recurrente', toastrConfirmOptions);
  }

  render() {
    let localUserId = localStorage.getItem('authUser_oms');
    let permisos = this.props.permisos.filter(permiso => permiso.usuario_id == localUserId);
    let adminValue = 666;
    let isAdmin = this.props.usuarios.find(usuario => usuario.id == localUserId && usuario.perfil == adminValue) ? true : false;
    let areasFiltered = this.props.areas.filter(area => permisos.find(permiso => permiso.area_id == area.id) || isAdmin);
    this.props.tareas.map((tarea) => {
      if (tarea.metas_table) {
        tarea.nombre_meta = tarea.metas_table.nombre_meta;
        if (tarea.metas_table.areas_table.nombre_area) {
          tarea.nombre_area = tarea.metas_table.areas_table.nombre_area;
          tarea.area_id = tarea.metas_table.areas_table.id;
        }
      }
    });
    let tareasFiltered = this.props.tareas.filter(tarea => permisos.find(permiso => permiso.area_id == tarea.area_id) || isAdmin);
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Jumbotron>
              <h1>Fruandes OMS</h1>
              <p>Organizational Management System</p>
              {/*<Link to="about" className="btn btn-primary btn-lg">Learn more</Link>*/}
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <HomeButtons
              type={1}
              areas={areasFiltered}
              bsStyle="primary"/>
          </Col>
          <Col md={2}>
            <HomeButtons
              type={2}
              areas={areasFiltered}
              bsStyle="success"/>
          </Col>
          <Col md={8}>
            {/*<RecurrentesHomeTable*/}
              {/*recurrentes={this.props.active}*/}
              {/*recurrenteDone={this.recurrenteDone}*/}
            {/*/>*/}
            <HomeTable
              tareas={tareasFiltered}
              usuarios={this.props.usuarios}
              tareaChangeStatus={this.tareaChangeStatus}
            />

          </Col>
        </Row>
        <Row>
          <Col md={12}>

          </Col>
        </Row>
      </Grid>

    );
  }

}

Home.propTypes = {
  usuarios: PropTypes.array.isRequired,
  areas: PropTypes.array.isRequired,
  isAddingArea: PropTypes.bool.isRequired,
  shouldUpdateAreas: PropTypes.bool.isRequired,
  loadAreas: PropTypes.func,
  destroyArea: PropTypes.func,
  createArea: PropTypes.func,
  updateArea: PropTypes.func,
  clientes: PropTypes.array.isRequired,
  isAddingClientes: PropTypes.bool.isRequired,
  shouldUpdateClientes: PropTypes.bool.isRequired,
  loadClientes: PropTypes.func,
  comentariosAreas: PropTypes.array.isRequired,
  shouldUpdateComentariosAreas: PropTypes.bool.isRequired,
  loadComentariosAreas: PropTypes.func,
  destroyComentariosArea: PropTypes.func,
  createComentariosArea: PropTypes.func,
  updateComentariosArea: PropTypes.func,
  startAddingArea: PropTypes.func,
  stopAddingArea: PropTypes.func,
  renderOptions: PropTypes.object.isRequired,
  tareas: PropTypes.array.isRequired,
  isAddingTarea: PropTypes.bool.isRequired,
  shouldUpdateTareas: PropTypes.bool.isRequired,
  loadTareas: PropTypes.func,
  destroyTarea: PropTypes.func,
  createTarea: PropTypes.func,
  updateTarea: PropTypes.func,
  startAddingTarea: PropTypes.func,
  stopAddingTarea: PropTypes.func,
  startModalTarea: PropTypes.func,
  stopModalTarea: PropTypes.func,
  metas: PropTypes.array.isRequired,
  isAddingMeta: PropTypes.bool.isRequired,
  shouldUpdateMetas: PropTypes.bool.isRequired,
  loadMetas: PropTypes.func,
  destroyMeta: PropTypes.func,
  createMeta: PropTypes.func,
  updateMeta: PropTypes.func,
  startAddingMeta: PropTypes.func,
  stopAddingMeta: PropTypes.func,
  startModalMeta: PropTypes.func,
  stopModalMeta: PropTypes.func
};

function mapStateToProps(state) {
  const {
    areasReducer,
    clientesReducer,
    customReducer,
    tareasReducer,
    metasReducer,
    usuariosReducer,
    comentariosAreasReducer,
    permisosReducer,
    recurrentesReducer
  } = state;
  const {usuarios} = usuariosReducer;
  const {comentariosAreas, shouldUpdateComentariosAreas} = comentariosAreasReducer;
  const {areas, isAddingArea, shouldUpdateAreas, renderOptions, areaModalId} = areasReducer;
  const {tareas, isAddingTarea, shouldUpdateTareas, tareaModalId} = tareasReducer;
  const {metas, isAddingMeta, shouldUpdateMetas, metaModalId} = metasReducer;
  const {custom, isAddingCustom, shouldUpdateCustom, customModalId} = customReducer;
  const {clientes, isAddingClientes, shouldUpdateClientes, clientesModalId} = clientesReducer;
  const {recurrentes, shouldUpdateRecurrentes, active}  = recurrentesReducer;
  const {
    permisos
  } = permisosReducer;
  return {
    areas,
    isAddingArea,
    shouldUpdateAreas,
    renderOptions,
    areaModalId,
    clientes,
    isAddingClientes,
    shouldUpdateClientes,
    clientesModalId,
    tareas,
    isAddingTarea,
    shouldUpdateTareas,
    tareaModalId,
    metas,
    isAddingMeta,
    shouldUpdateMetas,
    metaModalId,
    usuarios,
    shouldUpdateComentariosAreas,
    comentariosAreas,
    permisos,
    recurrentes,
    shouldUpdateRecurrentes,
    active
  };
}

export default connect(mapStateToProps, {
  loadActiveRecurrentes,
  updateRecurrente,
  doneRecurrente,
  loadAreas,
  destroyArea,
  createArea,
  updateArea,
  startAddingArea,
  stopAddingArea,
  updateRenderOptions,
  startModalArea,
  stopModalArea,
  loadClientes,
  destroyClientes,
  createClientes,
  updateClientes,
  startAddingClientes,
  stopAddingClientes,
  startModalClientes,
  stopModalClientes,
  loadCustom,
  loadTareas,
  destroyTarea,
  createTarea,
  updateTarea,
  stopAddingTarea,
  startAddingTarea,
  startModalTarea,
  stopModalTarea,
  loadMetas,
  destroyMeta,
  createMeta,
  updateMeta,
  stopAddingMeta,
  startAddingMeta,
  startModalMeta,
  stopModalMeta,
  loadComentariosAreas,
  destroyComentariosArea,
  createComentariosArea,
  updateComentariosArea,
  loadPermisos
})(Home);

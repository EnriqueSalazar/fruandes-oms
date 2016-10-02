import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
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
  loadPermisos
} from '../actions/permisoActions';
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
import AreaForm from '../components/AreaForm';
import MetaForm from '../components/MetaForm';
import TareaForm from '../components/TareaForm';
import AreasTable from '../components/AreasTable';
import TareasTable from '../components/TareasTable';
import MetasTable from '../components/MetasTable';
import RecurrentesDoneTable from '../components/RecurrentesDoneTable';
import ComentariosAreasForm from '../components/ComentariosAreasForm';
import {browserHistory} from 'react-router';
import {Grid, Col, Row, Well, Breadcrumb} from 'react-bootstrap';
import moment from 'moment';

class Areas extends Component {

  constructor(props) {
    super(props);
    this.areaRemove = this.areaRemove.bind(this);
    this.areaAdd = this.areaAdd.bind(this);
    this.areaCancel = this.areaCancel.bind(this);
    this.areaDetail = this.areaDetail.bind(this);
    this.areaAfterSave = this.areaAfterSave.bind(this);
    this.tareaRemove = this.tareaRemove.bind(this);
    this.tareaAdd = this.tareaAdd.bind(this);
    this.tareaCancel = this.tareaCancel.bind(this);
    this.tareaDetail = this.tareaDetail.bind(this);
    this.tareaAfterSave = this.tareaAfterSave.bind(this);
    this.tareaChangeStatus = this.tareaChangeStatus.bind(this);
    this.tareaModalStart = this.tareaModalStart.bind(this);
    this.tareaModalStop = this.tareaModalStop.bind(this);
    this.metaRemove = this.metaRemove.bind(this);
    this.metaAdd = this.metaAdd.bind(this);
    this.metaCancel = this.metaCancel.bind(this);
    this.metaDetail = this.metaDetail.bind(this);
    this.metaAfterSave = this.metaAfterSave.bind(this);
    this.metaChangeStatus = this.metaChangeStatus.bind(this);
    this.metaModalStart = this.metaModalStart.bind(this);
    this.metaModalStop = this.metaModalStop.bind(this);
    this.areaModalStart = this.areaModalStart.bind(this);
    this.areaModalStop = this.areaModalStop.bind(this);
    this.handleAreaSubmit = this.handleAreaSubmit.bind(this);
    this.handleMetaSubmit = this.handleMetaSubmit.bind(this);
    this.handleTareaSubmit = this.handleTareaSubmit.bind(this);
  }

  componentDidMount() {
    let {type, selectedAreaId, selectedMetaId, selectedTareaId} = this.props.params;
    // let permisos=this.props.permisos.filter(permiso => permiso.usuario_id ==localStorage.getItem('authUser_oms'));
    this.props.updateRenderOptions({
      type,
      selectedAreaId,
      selectedMetaId,
      selectedTareaId,
    });
    this.props.loadAreas();
    this.props.loadTareas();
    this.props.loadMetas();
    this.props.loadComentariosAreas();
    this.props.loadPermisos();
  }

  componentWillReceiveProps(nextProps) {
    console.error('componentWillReceiveProps');
    let nextType = Number(nextProps.params.type);

    let nextAreaId = Number(nextProps.params.selectedAreaId);
    let nextMetaId = Number(nextProps.params.selectedMetaId);
    let nextTareaId = Number(nextProps.params.selectedTareaId);
    let type = Number(this.props.renderOptions.type);
    let selectedAreaId = Number(this.props.renderOptions.selectedAreaId);
    let selectedMetaId = Number(this.props.renderOptions.selectedMetaId);
    let selectedTareaId = Number(this.props.renderOptions.selectedTareaId);

    if ((nextType != type || nextAreaId != selectedAreaId || nextMetaId != selectedMetaId || nextTareaId != selectedTareaId)) {
      let nextRenderOptions = Object.assign(
        {}, nextProps.renderOptions,
        {
          type: nextType,
          selectedAreaId: nextAreaId,
          selectedMetaId: nextMetaId,
          selectedTareaId: nextTareaId,
        });
      this.props.updateRenderOptions(nextRenderOptions);
      this.props.loadAreas();
      this.props.loadTareas();
      this.props.loadMetas();
      this.props.loadComentariosAreas();
    }

    if (nextProps.shouldUpdateAreas) {
      console.error('shouldUpdateAreas', nextProps.shouldUpdateAreas);
      this.props.loadPermisos();
      this.props.loadAreas();
    }
    if (nextProps.shouldUpdateTareas) {
      console.error('shouldUpdateTareas', nextProps.shouldUpdateTareas);
      this.props.loadTareas();
    }
    if (nextProps.shouldUpdateMetas) {
      console.error('shouldUpdateMetas', nextProps.shouldUpdateMetas);
      this.props.loadMetas();
    }
    if (nextProps.shouldUpdateComentariosAreas) {
      console.error('shouldUpdateComentariosAreas', nextProps.shouldUpdateComentariosAreas);
      this.props.loadComentariosAreas();
    }
  }

  areaDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.id + '/0/0');
  }


  areaRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyArea(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  areaCancel() {
    this.props.stopAddingArea();
  }

  areaAdd() {
    if (!this.props.isAddingArea) {
      this.props.startAddingArea();
    }
  }

  areaAfterSave(row) {
    if (row.id) {
      this.props.updateArea(row);
    } else if (row.nombre_area) {
      row.type = this.props.renderOptions.type;
      this.props.createArea(row);
      this.props.stopAddingArea();
    } else {
      toastr.warning('Cuidado', 'Nombre del area requerido');
    }
  }

  tareaDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.area_id + '/' + row.meta_id + '/' + row.id);
  }

  tareaRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyTarea(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  tareaCancel() {
    this.props.stopAddingTarea();
  }

  tareaModalStart(tareaModalId) {
    this.props.startModalTarea(tareaModalId);
  }

  tareaModalStop() {
    this.props.stopModalTarea();
  }

  tareaChangeStatus(row) {
    const toastrConfirmOptions = {
      onOk: () => {
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
    };
    toastr.confirm('Seguro que desea actualizar el estado?', toastrConfirmOptions);

  }

  tareaAdd() {
    if (!this.props.isAddingTarea) {
      this.props.startAddingTarea();
    }
  }

  tareaAfterSave(row) {
    if (row.meta_id) {
      let newMetaFilter = this.props.metas.filter(meta => meta.id == row.meta_id);
      if (newMetaFilter[0]) {
        let newMeta = newMetaFilter[0];
        if (newMeta) {
          row.area_id = newMeta.area_id;
          if (newMeta.areas_table && newMeta.areas_table.type) {
            row.type = newMeta.areas_table.type;
          }
        }
      }
    }
    // debugger
    if (row.id) {
      if (row.estado_tarea == 1) {
        row.done_tarea = moment().format();
      } else {
        row.done_tarea = null;
      }
      if (row.is_recurrente && row.periodo) {
        //todo calcular deadline e injectar
      }
      if (!row.is_recurrente || (row.is_recurrente && row.periodo)) {
        this.props.updateTarea(row);
      } else {
        toastr.warning('Cuidado', 'Periodo requerido');
      }
    } else if (row.nombre_tarea) {
      let selectedMetaId = this.props.renderOptions.selectedMetaId;
      if (row.meta_id || selectedMetaId != 0) {
        row.meta_id = row.meta_id || selectedMetaId;
        this.props.createTarea(row);
        this.props.stopAddingTarea();
      } else {
        toastr.warning('Cuidado', 'Nombre de la meta requerido');
      }

    } else {
      toastr.warning('Cuidado', 'Nombre de la tarea requerido');
    }
  }


  metaDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.area_id + '/' + row.id + '/0');
  }

  metaRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyMeta(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  metaCancel() {
    this.props.stopAddingMeta();
  }

  metaModalStart(metaModalId) {
    this.props.startModalMeta(metaModalId);
  }

  metaModalStop() {
    this.props.stopModalMeta();
  }

  areaModalStart(areaModalId) {
    this.props.startModalArea(areaModalId);
  }

  areaModalStop() {
    this.props.stopModalArea();
  }

  metaChangeStatus(row) {
    (row.estado_meta) ?
      Object.assign(row, {
        estado_meta: false,
        done_meta: null
      }) :
      Object.assign(row, {
        estado_meta: true,
        done_meta: moment()
      });
    this.props.updateMeta(row);
  }

  metaAdd() {
    if (!this.props.isAddingMeta) {
      this.props.startAddingMeta();
    }
  }

  metaAfterSave(row) {
    if (!row.avance_meta || row.avance_meta <= 100) {
      if (row.id) {
        if (row.avance_meta == 100) {
          row.done_meta = moment().format();
        } else {
          row.done_meta = null;
        }
        this.props.updateMeta(row);
      } else if (row.nombre_meta) {
        let selectedAreaId = this.props.renderOptions.selectedAreaId;
        if (row.area_id || selectedAreaId != 0) {
          row.area_id = row.area_id || selectedAreaId;
          this.props.createMeta(row);
          this.props.stopAddingMeta();
        } else {
          toastr.warning('Cuidado', 'Nombre del area requerido');
        }
      } else {
        toastr.warning('Cuidado', 'Nombre de la meta requerido');
      }
    } else {
      this.props.loadMetas();
      toastr.warning('Cuidado', '% de avance incorrecto');
    }

  }

  renderAreasTable(areas, permisos, level) {
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    if (selectedAreaId == 0 && selectedMetaId == 0 && selectedTareaId == 0) {
      return (
        <AreasTable
          areas={areas}
          permisos={permisos}
          level={level}
          areaRemove={this.areaRemove}
          areaAdd={this.areaAdd}
          areaCancel={this.areaCancel}
          areaDetail={this.areaDetail}
          areaAfterSave={this.areaAfterSave}
          areaModalId={this.props.areaModalId}
          areaModalStart={this.areaModalStart}
          areaModalStop={this.areaModalStop}
          isAddingArea={this.props.isAddingArea}
          type={this.props.renderOptions.type}
        />
      );
    }
  }

  renderMetasTable(areas, metas, permisos, level) {
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    if (selectedMetaId == 0 && selectedTareaId == 0) {
      return (
        <MetasTable
          areas={areas}
          metas={metas}
          permisos={permisos}
          allPermisos={this.props.permisos}
          level={level}
          usuarios={this.props.usuarios}
          metaRemove={this.metaRemove}
          metaAdd={this.metaAdd}
          metaCancel={this.metaCancel}
          metaDetail={this.metaDetail}
          metaAfterSave={this.metaAfterSave}
          metaChangeStatus={this.metaChangeStatus}
          isAddingMeta={this.props.isAddingMeta}
          metaModalId={this.props.metaModalId}
          metaModalStart={this.metaModalStart}
          metaModalStop={this.metaModalStop}
          type={this.props.renderOptions.type}
          selectedAreaId={this.props.renderOptions.selectedAreaId}
        />
      );
    }
  }

  renderTareasTable(areas, metas, tareas, permisos, level) {
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    if (selectedTareaId == 0) {
      return (
        <TareasTable
          areas={areas}
          metas={metas}
          tareas={tareas}
          permisos={permisos}
          allPermisos={this.props.permisos}
          level={level}
          usuarios={this.props.usuarios}
          tareaRemove={this.tareaRemove}
          tareaAdd={this.tareaAdd}
          tareaCancel={this.tareaCancel}
          tareaDetail={this.tareaDetail}
          tareaAfterSave={this.tareaAfterSave}
          tareaChangeStatus={this.tareaChangeStatus}
          localUserId={localStorage.getItem('authUser_oms')}
          isAddingTarea={this.props.isAddingTarea}
          tareaModalId={this.props.tareaModalId}
          tareaModalStart={this.tareaModalStart}
          tareaModalStop={this.tareaModalStop}
          type={this.props.renderOptions.type}
          selectedAreaId={this.props.renderOptions.selectedAreaId}
          selectedMetaId={this.props.renderOptions.selectedMetaId}
        />
      );
    }
  }

  handleAreaSubmit(area) {
    debugger
    this.areaAfterSave(area)
  }

  renderAreaForm(level) {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    // if (!(level=="666")) return null;
    if (selectedAreaId != 0 && selectedMetaId == 0 && selectedTareaId == 0) {
      let initialValues = this.props.areas.filter(area => area.id == this.props.renderOptions.selectedAreaId);
      // debugger
      return (
        <Well>
          <AreaForm
            onSubmit={this.handleAreaSubmit}
            initialValues={initialValues[0]}
            type={this.props.renderOptions.type}
            level={level}
          />
        </Well>
      );
    }
  }

  handleMetaSubmit(meta) {
    this.metaAfterSave(meta);
  }

  renderMetaForm(areas, permisos, level) {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    // if (!(level=="666" || level=="333")) return null;
    if (selectedAreaId != 0 && selectedMetaId != 0 && selectedTareaId == 0) {
      let initialValues =
        this.props.metas.filter(meta => meta.id == this.props.renderOptions.selectedMetaId);
      return (
        <Well>
          <MetaForm
            usuarios={this.props.usuarios}
            selectedAreaId={selectedAreaId}
            areas={areas}
            permisos={permisos}
            allPermisos={this.props.permisos}
            level={level}
            onSubmit={this.handleMetaSubmit}
            initialValues={initialValues[0]}
            type={this.props.renderOptions.type}
            metaAfterSave={this.metaAfterSave}
            metaModalId={this.props.metaModalId}
            metaModalStart={this.metaModalStart}
            metaModalStop={this.metaModalStop}/>
        </Well>
      );
    }
  }

  handleTareaSubmit(tarea) {
    this.tareaAfterSave(tarea);
  }

  renderTareaForm(areas, metas, permisos, level) {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    console.info('Got to step 1');
    if (selectedAreaId != 0 && selectedMetaId != 0 && selectedTareaId != 0) {
      console.info('Got to step 2');
      let initialValues =
        this.props.tareas.filter(tarea => tarea.id == this.props.renderOptions.selectedTareaId);
      return (
        <Well>
          <TareaForm
            areas={areas}
            metas={metas}
            selectedAreaId={selectedAreaId}
            permisos={permisos}
            allPermisos={this.props.permisos}
            level={level}
            usuarios={this.props.usuarios}
            onSubmit={this.handleTareaSubmit}
            initialValues={initialValues[0]}
            type={this.props.renderOptions.type}
            localUserId={localStorage.getItem('authUser_oms')}
            tareaModalId={this.props.tareaModalId}
            tareaModalStart={this.tareaModalStart}
            tareaModalStop={this.tareaModalStop}
            tareaAfterSave={this.tareaAfterSave}
            tareaChangeStatus={this.tareaChangeStatus}
          />
        </Well>
      );
    }
  }

  renderRecurrentesDoneTable(){
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    if (selectedAreaId != 0 && selectedMetaId != 0 && selectedTareaId != 0) {
      let selectedTarea =
        this.props.tareas.filter(tarea => tarea.id == this.props.renderOptions.selectedTareaId);
      return (
        <Well>
          <RecurrentesDoneTable
            tarea={selectedTarea[0]}
          />
        </Well>
      );
    }
  }

  renderComentariosAreasForm() {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;

    if ((selectedAreaId != 0 && selectedMetaId == 0 && selectedTareaId == 0) ||
      (selectedAreaId != 0 && selectedMetaId != 0 && selectedTareaId == 0) ||
      (selectedAreaId != 0 && selectedMetaId != 0 && selectedTareaId != 0)) {
      let authUser_oms = localStorage.getItem('authUser_oms');
      let initialValues =
        this.props.comentariosAreas.filter(comentario =>
          comentario.area_id == selectedAreaId &&
          comentario.meta_id == selectedMetaId &&
          comentario.tarea_id == selectedTareaId
        );
      return (
        <ComentariosAreasForm
          comentariosAreas={initialValues}
          usuarios={this.props.usuarios}
          comentariosAreaUpdate={this.props.updateComentariosArea}
          comentariosAreaAdd={this.props.createComentariosArea}
          area_id={selectedAreaId}
          meta_id={selectedMetaId}
          tarea_id={selectedTareaId}
          usuario_id={authUser_oms}
        />
      );
    }
  }

  renderBreadcrumb(level) {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    let type = this.props.renderOptions.type;
    let areas = this.props.areas;
    let metas = this.props.metas;
    let tareas = this.props.tareas;
    let selectedArea = {};
    let selectedMeta = {};
    let selectedTarea = {};
    let isAreaId = typeof selectedAreaId !== "undefined";
    let isMetaId = typeof selectedMetaId !== "undefined";
    let isTareaId = typeof selectedTareaId !== "undefined";
    let rootString = '';
    if (type == 1) {
      rootString = 'Areas';
    } else if (type == 2) {
      rootString = 'Proyectos';
    }
    let level0;
    let level1;
    let level2;
    let level3;
    let level4;
    if (isAreaId && isMetaId && isTareaId) {
      level0 = (
        <Breadcrumb.Item
          href="/">
          Home
        </Breadcrumb.Item>);
      level1 = (selectedAreaId == 0) ?
        (<Breadcrumb.Item active>
          {rootString}
        </Breadcrumb.Item>) :
        (<Breadcrumb.Item
          href={"/taskspage/" + type + "/0/0/0"}>
          {rootString}
        </Breadcrumb.Item>);
      if (selectedAreaId != 0) {
        selectedArea = areas.filter(area => area.id == selectedAreaId);
        if (selectedArea.length > 0) {
          level2 = (selectedMetaId == 0) ?
            (<Breadcrumb.Item active>
              {selectedArea[0].nombre_area}
            </Breadcrumb.Item>) :
            (<Breadcrumb.Item
              href={"/taskspage/" + type + "/" + selectedAreaId + "/0/0"}>
              {selectedArea[0].nombre_area}
            </Breadcrumb.Item>);
        }
      }
      if (selectedMetaId != 0) {
        selectedMeta = metas.filter(meta => meta.id == selectedMetaId);
        if (selectedMeta.length > 0) {
          level3 = (selectedTareaId == 0) ?
            (<Breadcrumb.Item active>
              {selectedMeta[0].nombre_meta}
            </Breadcrumb.Item>) :
            (<Breadcrumb.Item
              href={"/taskspage/" + type + "/" + selectedAreaId + "/" + selectedMetaId + "/0"}>
              {selectedMeta[0].nombre_meta}
            </Breadcrumb.Item>);
        }
      }
      if (selectedTareaId != 0) {
        selectedTarea = tareas.filter(tarea => tarea.id == selectedTareaId);
        if (selectedTarea.length > 0) {
          level4 =
            (<Breadcrumb.Item active>
              {selectedTarea[0].nombre_tarea}
            </Breadcrumb.Item>);
        }
      }
      return (<Breadcrumb>{level0}{level1}{level2}{level3}{level4}</Breadcrumb>);
    }
  }

  render() {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let isAreaId = typeof selectedAreaId !== "undefined";
    let isMetaId = typeof selectedMetaId !== "undefined";
    let localUserId = localStorage.getItem('authUser_oms');
    let permisos = this.props.permisos.filter(permiso => permiso.usuario_id == localUserId);
    let usuario = this.props.usuarios.find(usuario => usuario.id == localUserId);
    let isUsuario = typeof usuario !== "undefined";
    if (isAreaId && isMetaId && isUsuario) {
      let type = this.props.renderOptions.type;
      let areasData = this.props.areas.filter(area => area.type == type);
      let metasData = this.props.metas.filter(meta => {
        if (meta.areas_table && meta.areas_table.type) {
          return (meta.areas_table.type == type);
        }
      });
      let tareasData = this.props.tareas.filter(tarea => {
        if (tarea.metas_table && tarea.metas_table.areas_table && tarea.metas_table.areas_table.type) {
          return (tarea.metas_table.areas_table.type == type);
        }
      });
      return (
        <div>
          {this.renderBreadcrumb(usuario.perfil)}
          <Grid>
            <Row>
              <Col md={12}>
                {this.renderAreaForm(usuario.perfil)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderMetaForm(areasData, permisos, usuario.perfil)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderTareaForm(areasData, metasData, permisos, usuario.perfil)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderComentariosAreasForm()}
              </Col>
            </Row>
             <Row>
              <Col md={12}>
                {this.renderRecurrentesDoneTable()}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderAreasTable(areasData, permisos, usuario.perfil)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderMetasTable(areasData, metasData, permisos, usuario.perfil)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderTareasTable(areasData, metasData, tareasData, permisos, usuario.perfil)}
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else return null;


  }
}

Areas.propTypes = {
  usuarios: PropTypes.array.isRequired,
  areas: PropTypes.array.isRequired,
  isAddingArea: PropTypes.bool.isRequired,
  shouldUpdateAreas: PropTypes.bool.isRequired,
  loadAreas: PropTypes.func,
  destroyArea: PropTypes.func,
  createArea: PropTypes.func,
  updateArea: PropTypes.func,
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
    tareasReducer,
    metasReducer,
    usuariosReducer,
    comentariosAreasReducer,
    permisosReducer
  } = state;
  const {usuarios} = usuariosReducer;
  const {comentariosAreas, shouldUpdateComentariosAreas} = comentariosAreasReducer;
  const {areas, isAddingArea, shouldUpdateAreas, renderOptions, areaModalId} = areasReducer;
  const {tareas, isAddingTarea, shouldUpdateTareas, tareaModalId} = tareasReducer;
  const {metas, isAddingMeta, shouldUpdateMetas, metaModalId} = metasReducer;
  const {
    permisos,
    onePermisos
  } = permisosReducer;
  return {
    areas,
    isAddingArea,
    shouldUpdateAreas,
    renderOptions,
    areaModalId,
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
    permisos
  };
}

export default connect(mapStateToProps, {
  loadAreas,
  destroyArea,
  createArea,
  updateArea,
  startAddingArea,
  stopAddingArea,
  updateRenderOptions,
  startModalArea,
  stopModalArea,
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
})(Areas);

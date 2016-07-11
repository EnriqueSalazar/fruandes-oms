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
    console.error('componentDidMount');
    let {type, selectedAreaId, selectedMetaId, selectedTareaId} = this.props.params;
    this.props.updateRenderOptions({
      type,
      selectedAreaId,
      selectedMetaId,
      selectedTareaId
    });
    this.props.loadAreas();
    this.props.loadTareas();
    this.props.loadMetas();
    this.props.loadComentariosAreas();
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
      console.error('props changed');

      let nextRenderOptions = Object.assign(
        {}, nextProps.renderOptions,
        {
          type: nextType,
          selectedAreaId: nextAreaId,
          selectedMetaId: nextMetaId,
          selectedTareaId: nextTareaId
        });
      this.props.updateRenderOptions(nextRenderOptions);
      this.props.loadAreas();
      this.props.loadTareas();
      this.props.loadMetas();
      this.props.loadComentariosAreas();
    }

    if (nextProps.shouldUpdateAreas) {
      console.error('shouldUpdateAreas', nextProps.shouldUpdateAreas);
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

  tareaAdd() {
    if (!this.props.isAddingTarea) {
      this.props.startAddingTarea();
    }
  }

  tareaAfterSave(row) {
    if (row.meta_id) {
      let newMeta = this.props.metas.filter(meta => meta.id == row.meta_id)
      if (newMeta[0]) {
        row.area_id = newMeta[0].area_id;
      }
    }
    if (row.id) {
      if (row.estado_tarea == 1) {
        row.done_tarea = moment().format();
      } else {
        row.done_tarea = null;
      }
      this.props.updateTarea(row);
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

  renderAreasTable(areas) {
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    if (selectedAreaId == 0 && selectedMetaId == 0 && selectedTareaId == 0) {
      return (
        <AreasTable
          areas={areas}
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

  renderMetasTable(areas, metas) {
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    if (selectedMetaId == 0 && selectedTareaId == 0) {
      return (
        <MetasTable
          areas={areas}
          metas={metas}
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

  renderTareasTable(areas, metas, tareas) {
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    if (selectedTareaId == 0) {
      return (
        <TareasTable
          areas={areas}
          metas={metas}
          tareas={tareas}
          usuarios={this.props.usuarios}
          tareaRemove={this.tareaRemove}
          tareaAdd={this.tareaAdd}
          tareaCancel={this.tareaCancel}
          tareaDetail={this.tareaDetail}
          tareaAfterSave={this.tareaAfterSave}
          tareaChangeStatus={this.tareaChangeStatus}
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
    this.areaAfterSave(area)
  }

  renderAreaForm() {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    if (selectedAreaId != 0 && selectedMetaId == 0 && selectedTareaId == 0) {
      let initialValues = this.props.areas.filter(area => area.id == this.props.renderOptions.selectedAreaId);
      return (
        <Well>
          <AreaForm
            onSubmit={this.handleAreaSubmit}
            initialValues={initialValues[0]}
          />
        </Well>
      );
    }
  }

  handleMetaSubmit(meta) {
    this.metaAfterSave(meta);
  }

  renderMetaForm(areas) {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    if (selectedAreaId != 0 && selectedMetaId != 0 && selectedTareaId == 0) {
      let initialValues =
        this.props.metas.filter(meta => meta.id == this.props.renderOptions.selectedMetaId);
      return (
        <Well>
          <MetaForm
            usuarios={this.props.usuarios}
            areas={areas}
            onSubmit={this.handleMetaSubmit}
            initialValues={initialValues[0]}
          />
        </Well>
      );
    }
  }

  handleTareaSubmit(tarea) {
    this.tareaAfterSave(tarea);
  }

  renderTareaForm(areas, metas) {
    let selectedAreaId = this.props.renderOptions.selectedTareaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let selectedTareaId = this.props.renderOptions.selectedTareaId;
    if (selectedAreaId != 0 && selectedMetaId != 0 && selectedTareaId != 0) {
      let initialValues =
        this.props.tareas.filter(tarea => tarea.id == this.props.renderOptions.selectedTareaId);
      return (
        <Well>
          <TareaForm
            areas={areas}
            metas={metas}
            usuarios={this.props.usuarios}
            onSubmit={this.handleTareaSubmit}
            initialValues={initialValues[0]}
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

  renderBreadcrumb() {
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
    // debugger
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
        level2 = (selectedMetaId == 0) ?
          (<Breadcrumb.Item active>
            {selectedArea[0].nombre_area}
          </Breadcrumb.Item>) :
          (<Breadcrumb.Item
            href={"/taskspage/" + type + "/" + selectedAreaId + "/0/0"}>
            {selectedArea[0].nombre_area}
          </Breadcrumb.Item>);
      }
      if (selectedMetaId != 0) {
        selectedMeta = metas.filter(meta => meta.id == selectedMetaId);
        level3 = (selectedTareaId == 0) ?
          (<Breadcrumb.Item active>
            {selectedMeta[0].nombre_meta}
          </Breadcrumb.Item>) :
          (<Breadcrumb.Item
            href={"/taskspage/" + type + "/" + selectedAreaId + "/" + selectedMetaId + "/0"}>
            {selectedMeta[0].nombre_meta}
          </Breadcrumb.Item>);

      }
      if (selectedTareaId != 0) {
        selectedTarea = tareas.filter(tarea => tarea.id == selectedTareaId);
        level4 =
          (<Breadcrumb.Item active>
            {selectedTarea[0].nombre_tarea}
          </Breadcrumb.Item>);
      }
      return (<Breadcrumb>{level0}{level1}{level2}{level3}{level4}</Breadcrumb>);
    }
  }

  render() {
    let selectedAreaId = this.props.renderOptions.selectedAreaId;
    let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let isAreaId = typeof selectedAreaId !== "undefined";
    let isMetaId = typeof selectedMetaId !== "undefined";
    let areasLength = this.props.areas.length;
    let tareasLength = this.props.tareas.length;
    let metasLength = this.props.metas.length;

    if (isAreaId && isMetaId && areasLength > 0 && metasLength > 0 && tareasLength > 0) {
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
          {this.renderBreadcrumb()}
          <Grid>
            <Row>
              <Col md={12}>
                {this.renderAreaForm()}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderMetaForm(areasData)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderTareaForm(areasData, metasData)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderComentariosAreasForm()}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderAreasTable(areasData)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderMetasTable(areasData, metasData)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderTareasTable(areasData, metasData, tareasData)}
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
    comentariosAreasReducer
  } = state;
  const {usuarios} = usuariosReducer;
  const {comentariosAreas, shouldUpdateComentariosAreas} = comentariosAreasReducer;
  const {areas, isAddingArea, shouldUpdateAreas, renderOptions, areaModalId} = areasReducer;
  const {tareas, isAddingTarea, shouldUpdateTareas, tareaModalId} = tareasReducer;
  const {metas, isAddingMeta, shouldUpdateMetas, metaModalId} = metasReducer;
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
    comentariosAreas
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
  updateComentariosArea
})(Areas);

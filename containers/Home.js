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
import HomeTable from '../components/HomeTable';
import HomeButtons from '../components/HomeButtons';
import {browserHistory} from 'react-router';
import {Grid, Col, Row, Well, Breadcrumb, Jumbotron} from 'react-bootstrap';
import moment from 'moment';


class Home extends Component {

  constructor(props) {
    super(props);
    this.tareaChangeStatus = this.tareaChangeStatus.bind(this);
  }

  componentDidMount() {
    console.error('componentDidMount');
    this.props.loadAreas();
    this.props.loadTareas();
  }

  componentWillReceiveProps(nextProps) {
    console.error('componentWillReceiveProps');

    if (nextProps.shouldUpdateAreas) {
      console.error('shouldUpdateAreas', nextProps.shouldUpdateAreas);
      this.props.loadAreas();
    }
    if (nextProps.shouldUpdateTareas) {
      console.error('shouldUpdateTareas', nextProps.shouldUpdateTareas);
      this.props.loadTareas();
    }
  }

  areaDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.id + '/0/0');
  }

  tareaDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.area_id + '/' + row.meta_id + '/' + row.id);
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

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Jumbotron>
              <h1>Fruandes OMS</h1>
              <p>Operations Management System</p>
              {/*<Link to="about" className="btn btn-primary btn-lg">Learn more</Link>*/}
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <HomeButtons
              type={1}
              areas={this.props.areas}
              bsStyle="primary"/>
          </Col>
          <Col md={2}>
            <HomeButtons
              type={2}
              areas={this.props.areas}
              bsStyle="success"/>
          </Col>
          <Col md={8}>
            <HomeTable
              tareas={this.props.tareas}
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
})(Home);

/**
 * Created by enriq on 5/07/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {
  loadRecurrentes,
  destroyRecurrente,
  createRecurrente,
  updateRecurrente,
  stopAddingRecurrente,
  startAddingRecurrente,
  loadDoneRecurrentes
} from '../actions/recurrenteActions';
import {
  loadUsuarios
} from '../actions/usuarioActions';
// import {browserHistory} from 'react-router';
// import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import {Grid, Accordion, Panel, Col, Row, Well, Breadcrumb, Button, FormGroup, FormControl} from 'react-bootstrap';
// import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import RecurrenteForm from '../components/RecurrenteForm'
import RecurrentesTable from '../components/RecurrentesTable'
import RecurrentesDoneTable from '../components/RecurrentesDoneTable'
import moment from 'moment';

class Recurrente extends Component {

  constructor(props) {
    super(props);
    this.handleRecurrenteSubmit = this.handleRecurrenteSubmit.bind(this);
    this.recurrenteRemove = this.recurrenteRemove.bind(this);
    this.recurrenteAdd = this.recurrenteAdd.bind(this);
    this.recurrenteCancel = this.recurrenteCancel.bind(this);
    this.recurrenteAfterSave = this.recurrenteAfterSave.bind(this);
    this.recurrenteChangeStatus = this.recurrenteChangeStatus.bind(this);

  }

  componentDidMount() {
    this.props.loadRecurrentes();
    this.props.loadDoneRecurrentes();
    this.props.loadUsuarios();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateRecurrentes) {
      this.props.loadRecurrentes();
      this.props.loadUsuarios();
      this.props.loadDoneRecurrentes();
    }
  }

  recurrenteRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyRecurrente(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  recurrenteCancel() {
    this.props.stopAddingRecurrente();
  }

  recurrenteAdd() {
    if (!this.props.isAddingRecurrente) {
      this.props.startAddingRecurrente();
    }
  }

  recurrenteAfterSave(row) {
    if (row.nombre_recurrente) {
          if (row.id) {
            this.props.updateRecurrente(row);
          } else {
            this.props.createRecurrente(row);
          }
          this.props.stopAddingRecurrente();
    } else {
      toastr.warning('Cuidado', 'Nombre del recurrente requerido');
    }
  }


  recurrenteChangeStatus(row) {
    (row.perfil == 666) ?
      Object.assign(row, {
        perfil: 0,
      }) :
      Object.assign(row, {
        perfil: 666,
      });
    this.props.updateRecurrente(row);
  }

  renderRecurrentesTable() {
    let userFilter = this.props.usuarios.filter(usuario => usuario.id == localStorage.getItem('authUser_oms'));
    let user = userFilter[0];
    if (user && this.props.recurrentes){
      if (user.perfil == "666" && this.props.recurrentes.length >0) {
        return (
          <RecurrentesTable
            usuarios={this.props.usuarios}
            recurrentes={this.props.recurrentes}
            recurrenteRemove={this.recurrenteRemove}
            recurrenteAdd={this.recurrenteAdd}
            recurrenteCancel={this.recurrenteCancel}
            recurrenteAfterSave={this.recurrenteAfterSave}
            recurrenteChangeStatus={this.recurrenteChangeStatus}
            isAddingRecurrente={this.props.isAddingRecurrente}
          />
        );
      }
    }
  }

  renderRecurrentesDoneTable() {
    let userFilter = this.props.usuarios.filter(usuario => usuario.id == localStorage.getItem('authUser_oms'));
    let user = userFilter[0];
    if (user && this.props.done){
      if (user.perfil == "666" && this.props.done.length >0) {
        return (
          <RecurrentesDoneTable
            usuarios={this.props.usuarios}
            recurrentes={this.props.recurrentes}
            done={this.props.done}
          />
        );
      }
    }
  }

  handleRecurrenteSubmit(recurrente) {
    this.recurrenteAfterSave(recurrente)
  }

  renderRecurrenteForm() {
    let initialValues = this.props.recurrentes.filter(recurrente => recurrente.id == localStorage.getItem('authUser_oms'));
    return (
      <Well>
        <RecurrenteForm
          onSubmit={this.handleRecurrenteSubmit}
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
              {this.renderRecurrentesTable()}
              {this.renderRecurrentesDoneTable()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Recurrente.propTypes = {
  isAddingRecurrente: PropTypes.bool.isRequired,
  shouldUpdateRecurrentes: PropTypes.bool.isRequired,
  recurrentes: PropTypes.array.isRequired,
  authRecurrente: PropTypes.number.isRequired,
  loadRecurrentes: PropTypes.func,
  destroyRecurrente: PropTypes.func,
  createRecurrente: PropTypes.func,
  updateRecurrente: PropTypes.func,
  stopAddingRecurrente: PropTypes.func,
  startAddingRecurrente: PropTypes.func,
  loginRecurrente: PropTypes.func,
  logoutRecurrente: PropTypes.func,
};

function mapStateToProps(state) {
  const {recurrentesReducer, usuariosReducer} = state;
  const {usuarios} = usuariosReducer;
  const {
    recurrentes,
    authRecurrente,
    isAddingRecurrente,
    shouldUpdateRecurrentes,
    done
  } = recurrentesReducer;
  return {
    usuarios,
    recurrentes,
    authRecurrente,
    isAddingRecurrente,
    shouldUpdateRecurrentes,
    done
  };
}

export default connect(mapStateToProps, {
  loadDoneRecurrentes,
  loadUsuarios,
  loadRecurrentes,
  destroyRecurrente,
  createRecurrente,
  updateRecurrente,
  stopAddingRecurrente,
  startAddingRecurrente,
})(Recurrente);

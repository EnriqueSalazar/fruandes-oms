import React, {Component, PropTypes} from 'react'
import {createStore} from 'redux'
import createFragment from 'react-addons-create-fragment' 
import {connect, Provider} from 'react-redux';

import {toastr} from 'react-redux-toastr';
import {
  loadClientes,
  destroyClientes,
  createClientes,
  updateClientes,
  stopAddingClientes,
  startAddingClientes,
  updateRenderOptions,
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
  loadPermisos
} from '../actions/permisoActions';
import {
  loadTareas
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
  loadAreas,
  destroyArea,
  createArea,
  updateArea,
  stopAddingArea,
  startAddingArea,
  startModalArea,
  stopModalArea
} from '../actions/areaActions';
// import {
//  loadCustom,
//  destroyCustom,
//  createCustom,
//  updateCustom
// } from '../actions/customActions';
import ClientesForm from '../components/ClientesForm';
import ClientesForms from '../components/ClientesForms';
import SortableComponent from '../components/SortableComponent';
import ClientesTareaTable from '../components/ClientesTareaTable';
import CustomListGroupItem from '../components/CustomListGroupItem';
import MetaForm from '../components/MetaForm';
import TareaForm from '../components/TareaForm';
import ClientesTable from '../components/ClientesTable';
import TareasTable from '../components/TareasTable';
import MetasTable from '../components/MetasTable';
import RecurrentesDoneTable from '../components/RecurrentesDoneTable';
//import CustomForm from '../components/CustomForm';
import {browserHistory} from 'react-router';
import {Grid, Col, Row, Panel, Well, Breadcrumb, Button, Collapse, Buttom, Glyphicon, ListGroupItem, ListGroup, FieldArray} from 'react-bootstrap';
import moment from 'moment';
import Form from "react-jsonschema-form";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const formData= {
    jsonCustom:['']};



function onSortEnd (oldIndex, newIndex) {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });};


 




 const log = (type) => console.log.bind(console, type);

const title = '<h3>Agregar Campos Personalizados</h3>';

function onChange(formData) {
  console.log("here");
  
};

const FormDataChange = ({formData}) => this.state = {...props.formData};

 


class Clientes extends Component {

  constructor(props) {
    super(props);
    this.clientesRemove = this.clientesRemove.bind(this);
    this.clientesAdd = this.clientesAdd.bind(this);
    this.clientesCancel = this.clientesCancel.bind(this);
    this.clientesDetail = this.clientesDetail.bind(this);
    this.clientesAfterSave = this.clientesAfterSave.bind(this);
    this.clientesModalStart = this.clientesModalStart.bind(this);
    this.clientesModalStop = this.clientesModalStop.bind(this);
    this.handleClientesSubmit = this.handleClientesSubmit.bind(this);
    this.customRemove = this.customRemove.bind(this);
    this.customAdd = this.customAdd.bind(this);
    this.customCancel = this.customCancel.bind(this);
    this.tareaDetail = this.tareaDetail.bind(this);
    this.customAfterSave = this.customAfterSave.bind(this);
    this.customModalStart = this.customModalStart.bind(this);
    this.customModalStop = this.customModalStop.bind(this);
    this.handleCustom = this.handleCustom.bind(this);
    this.state = {
      customList: [],
      formData:[],
      items: [],
      camposcus:[]
    }
 


  }



  componentDidMount() {
    let {type, selectedClientesId} = this.props.params;
    // let permisos=this.props.permisos.filter(permiso => permiso.usuario_id ==localStorage.getItem('authUser_oms'));
    this.props.updateRenderOptions({
      type,
      selectedClientesId,
      // selectedMetaId,
      // selectedTareaId,
    });
    this.props.loadCustom();
    this.props.loadClientes();

    this.props.loadTareas();
    this.props.loadAreas();
    this.props.loadMetas();

    //this.props.loadCustom();
    this.props.loadPermisos();

       
  }

  componentWillReceiveProps(nextProps) {
    console.error('componentWillReceiveProps');
    let nextType = Number(nextProps.params.type);

    let nextClientesId = Number(nextProps.params.selectedClientesId);
    // let nextMetaId = Number(nextProps.params.selectedMetaId);
    // let nextTareaId = Number(nextProps.params.selectedTareaId);
    let type = Number(this.props.renderOptions.type);
    let selectedClientesId = Number(this.props.renderOptions.selectedClientesId);
    // let selectedMetaId = Number(this.props.renderOptions.selectedMetaId);
    // let selectedTareaId = Number(this.props.renderOptions.selectedTareaId);

    if ((nextType != type || nextClientesId != selectedClientesId)) {
      let nextRenderOptions = Object.assign(
        {}, nextProps.renderOptions,
        {
          type: nextType,
          selectedClientesId: nextClientesId,
          //selectedMetaId: nextMetaId,
          //selectedTareaId: nextTareaId,
        });
      
      this.props.loadCustom();
      this.props.loadClientes();
      this.props.loadTareas();
this.props.updateRenderOptions(nextRenderOptions);
      this.props.loadAreas();
      this.props.loadMetas();

      //this.props.loadMetas();
     // this.props.loadCustom();
    }

    if (nextProps.shouldUpdateClientes) {
      console.error('shouldUpdateClientes', nextProps.shouldUpdateClientes);
      this.props.loadPermisos();
      this.props.loadClientes();
     }
  }



  clientesDetail(row) {
    browserHistory.push('/clientespage/' + this.props.renderOptions.type + '/' + row.id + '');
  }

  tareaDetail(row) {
    browserHistory.push('/taskspage/1/' + row.area_id + '/' + row.meta_id + '/' + row.id);
  }

  clientesRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyClientes(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  clientesCancel() {
    this.props.stopAddingClientes();
  }

  clientesAdd() {
    if (!this.props.isAddingClientes) {
      this.props.startAddingClientes();
    }
  }

  clientesAfterSave(row) {
    if (row.id) {
      this.props.updateClientes(row);
    } else if (row.nombre_clientes) {
      row.type = this.props.renderOptions.type;
      this.props.createClientes(row);
      this.props.stopAddingClientes();
    } else {
      toastr.warning('Cuidado', 'Nombre del cliente requerido');
    }
    
  }
  clientesModalStart(clientesModalId) {
    this.props.startModalClientes(clientesModalId);
  }

  clientesModalStop() {
    this.props.stopModalClientes();
  }


  customDetail(row) {
    browserHistory.push('/custompage/' + this.props.renderOptions.type + '/' + row.id + '');
  }


  customRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyCustom(row.id)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  customCancel() {
    this.props.stopAddingCustom();
  }

  customAdd() {
    if (!this.props.isAddingCustom) {
      this.props.startAddingCustom();
    }
  }

  customAfterSave(row) {
    
    if (row.id) {
      this.props.updateCustom(row);
    } else {
      toastr.warning('Cuidado', 'Nombre del campo requerido');
    }
  }
  customModalStart(customModalId) {
    this.props.startModalCustom(customModalId);
  }

  customModalStop() {
    this.props.stopModalCustom();
  }


  renderClientesTable(clientes, permisos, level) {
   // let selectedTareaId = this.props.renderOptions.selectedTareaId;
    let selectedClientesId = this.props.renderOptions.selectedClientesId;
   //let selectedMetaId = this.props.renderOptions.selectedMetaId;
    if (selectedClientesId == 0) {
      return (
        <ClientesTable
          clientes={clientes}
          permisos={permisos}
          allPermisos={this.props.permisos}
          level={level}
          clientesRemove={this.clientesRemove}
          clientesAdd={this.clientesAdd}
          clientesCancel={this.clientesCancel}
          clientesDetail={this.clientesDetail}
          clientesAfterSave={this.clientesAfterSave}
          clientesModalId={this.props.clientesModalId}
          clientesModalStart={this.clientesModalStart}
          clientesModalStop={this.clientesModalStop}
          isAddingClientes={this.props.isAddingClientes}
          type={this.props.renderOptions.type}
        />
      );
    }
  }



  handleClientesSubmit(clientes) {
      console.log("Finally",clientes);
    let client = {};
    let obje ={};
    debugger;
    client.id = clientes.id;
    client.nombre_clientes = clientes.nombre_clientes;
    client.email_clientes = clientes.email_clientes; 
    client.telefono_clientes = clientes.telefono_clientes;
    client.jsonCustom = JSON.stringify(clientes.jsonCustom);
     console.log("Finally",client.jsonCustom);
        debugger;
    this.clientesAfterSave(client)
  }

  renderClientesForm(level) {
    let selectedClientesId = this.props.renderOptions.selectedClientesId;
    //let selectedMetaId = this.props.renderOptions.selectedMetaId;
    //let selectedTareaId = this.props.renderOptions.selectedTareaId;
    if (!(level=="666")) return null;
    if (selectedClientesId != 0 ) {
      let initialValues = this.props.clientes.filter(cliente => cliente.id == this.props.renderOptions.selectedClientesId);
      let initialValor = {};
      initialValor.id = initialValues[0].id;
      initialValor.nombre_clientes = initialValues[0].nombre_clientes;
      initialValor.email_clientes = initialValues[0].email_clientes;
      initialValor.telefono_clientes = initialValues[0].telefono_clientes;
      initialValor.jsonCustom = JSON.parse(initialValues[0].jsonCustom);
      console.log(initialValor); 
      let campo = this.props.custom.find(cust => cust.type == this.props.renderOptions.type);
      //let fields =campo;

      let fields = JSON.parse(campo.jsonCustoms);
      //let campos = JSON.parse(campo.jsonCustoms);
        console.log("Finally",fields);
      debugger
      return (
        <Well>
          <ClientesForm
            onSubmit={this.handleClientesSubmit}
            initialValues={initialValor}
            type={this.props.renderOptions.type}
            level={level}
            fields={fields}
          />


        </Well>

      
      );
    }
  }


handleCustom(custom) {
  console.log("Finally",custom.formData);
debugger
let customs = {};
let ites= this.props.custom.find(cust => cust.type == this.props.renderOptions.type);
let initialarray = JSON.parse(ites.jsonCustoms);
console.log("Finally",initialarray);
let data = JSON.stringify(custom.formData.jsonCustom);
let datas = JSON.parse(data);
let finalarray = initialarray.concat(datas);
console.log("Finally",finalarray);

customs.id = custom.formData.id;
debugger
customs.jsonCustoms = JSON.stringify(finalarray);
console.log("Finally",customs);

   this.customAfterSave(customs); 
  
}

destroCustom(itemx) {
  console.log("Finally",itemx);
debugger
let customs = {};
let ites= this.props.custom.find(cust => cust.type == this.props.renderOptions.type);
let initialarray = JSON.parse(ites.jsonCustoms);
console.log("Finally",initialarray);
let toRemove = JSON.stringify(itemx);
let index = initialarray.indexOf(itemx);
initialarray.splice(index, 1);
let finalarray = initialarray;
console.log("Finally",finalarray);

customs.id = JSON.parse(ites.id);
debugger
customs.jsonCustoms = JSON.stringify(finalarray);
console.log("Finally",customs);
this.customAfterSave(customs); 
  
}

  customRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.destroCustom(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  renderCustomClientes(custom, campos) {
let selectedClientesId = this.props.renderOptions.selectedClientesId;


 
 let valor = formData.formData;
 //const fromJson = (json) => JSON.parse(json);
 const toJson = (val) => JSON.stringify(val, null, 2);


const uiSchema =  {
  id: {"ui:widget": "hidden"}
  };


let id = Number(this.props.renderOptions.type);
//console.log(custom.jsonCustoms);



const schema = {
    type: "object",
    properties: {
      id:{
        type:"number",
        title:"id",
        default:id

      },
      jsonCustom: {
        type: "array",
        title: "",          
        items: {
          type: "string",
          default: ""
        }
      }
    }
  };

  

  let ites= this.props.custom.find(cust => cust.type == this.props.renderOptions.type);
  let itens = JSON.parse(ites.jsonCustoms);

  const SortableItem = SortableElement(({value}) => <ListGroupItem>{value}</ListGroupItem>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) =>
              <Row>
              <Col md={10}>
                <SortableItem key={`item-${index}`} index={index} value={value} />
               </Col>
               <Col md={2}>
                <Button
                className="remove"
                bsSize="xsmall"
                  onClick={() => {
                  this.customRemove(value);
                }}
                bsStyle="danger">
                <Glyphicon glyph="remove"/>
                </Button>
                </Col>
                </Row>
            )}
        </ul>
    );
});



if (selectedClientesId == 0){
  debugger
    return (
      <Panel header="Agregar Campos Personalizados" bsStyle="primary" eventKey="1">
        <Row>
          <br />
          <Col md={6}>          
            <Panel collapsible defaultExpanded header="Nombre del campo">
                <ClientesForms
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onChange={onChange}
                onSubmit={this.handleCustom}
               // level={level}
                onError={log("errors")}
                type={this.props.renderOptions.type}/> 
            </Panel> 
          </Col>
          
          <Col md={6}>
            <Panel collapsible defaultExpanded header="Campos creados">
       <ListGroup fill>

        <SortableList items={itens} onSortEnd={this.onSortEnd} />

       </ListGroup>
         </Panel>
          </Col>
        </Row>
      </Panel>
    );
    debugger
    }
  }
  
   renderClientesTareaTable(tareas, areas, metas){
    let selectedClientesId = this.props.renderOptions.selectedClientesId;
    if (selectedClientesId != 0) {
      return (
        <Well>
          <ClientesTareaTable
          tareas={tareas}
          areas={areas}
          metas={metas}
          usuarios={this.props.usuarios}
          tareaDetail={this.tareaDetail}
          type={this.props.renderOptions.type}
          clienteid={this.props.renderOptions.selectedClientesId}
          />
        </Well>
      );
    }
  }

 


  renderBreadcrumb(level) {
    let selectedClientesId = this.props.renderOptions.selectedClientesId;
    // let selectedMetaId = this.props.renderOptions.selectedMetaId;
    // let selectedTareaId = this.props.renderOptions.selectedTareaId;
    let type = this.props.renderOptions.type;
    let clientes = this.props.clientes;
    // let metas = this.props.metas;
    // let tareas = this.props.tareas;
    let selectedClientes = {};
    // let selectedMeta = {};
    // let selectedTarea = {};
    let isClientesId = typeof selectedClientesId !== "undefined";
    // let isMetaId = typeof selectedMetaId !== "undefined";
    // let isTareaId = typeof selectedTareaId !== "undefined";
    let rootString = '';
    if (type == 1) {
      rootString = 'Clientes Nacionales';
    } else if (type == 2) {
      rootString = 'Clientes Internacionales';
    }
    else if (type == 3) {
      rootString = 'Organizaciones';
    }
    let level0;
    let level1;
    let level2;
    //let level3;
    //let level4;
    if (isClientesId) {
      level0 = (
        <Breadcrumb.Item
          href="/">
          Home
        </Breadcrumb.Item>);
      level1 = (selectedClientesId == 0) ?
        (<Breadcrumb.Item active>
          {rootString}
        </Breadcrumb.Item>) :
        (<Breadcrumb.Item
          href={"/clientespage/" + type + "/0"}>
          {rootString}
        </Breadcrumb.Item>);
      if (selectedClientesId != 0) {
        selectedClientes = clientes.filter(cliente => cliente.id == selectedClientesId);
        if (selectedClientes.length > 0) {
          level2 = (selectedClientes != 0) ?
            (<Breadcrumb.Item active>
              {selectedClientes[0].nombre_clientes}
            </Breadcrumb.Item>) :
            (<Breadcrumb.Item
              href={"/clientespage/" + type + "/" + selectedClientesId}>
              {selectedClientes[0].nombre_clientes}
            </Breadcrumb.Item>);
        }
       }
     
      return (<Breadcrumb>{level0}{level1}{level2}</Breadcrumb>);
    }
  }

  render() {
    let selectedClientesId = this.props.renderOptions.selectedClientesId;
    // let selectedMetaId = this.props.renderOptions.selectedMetaId;
    let isClientesId = typeof selectedClientesId !== "undefined";
    // let isMetaId = typeof selectedMetaId !== "undefined";
    let localUserId = localStorage.getItem('authUser_oms');
    let permisos = this.props.permisos.filter(permiso => permiso.usuario_id == localUserId);
    let usuario = this.props.usuarios.find(usuario => usuario.id == localUserId);
    let isUsuario = typeof usuario !== "undefined";
    if (isClientesId) {
      let type = this.props.renderOptions.type;
      let clientesData = this.props.clientes.filter(cliente => cliente.type == type);
      let customData = this.props.custom.filter(cus => cus.type == type);
      let tareasData = this.props.tareas.filter(tareas => tareas.id !=0);
      let areasData = this.props.areas.filter(areas => areas.id !=0);
      let metasData = this.props.metas.filter(metas => metas.id !=0);
      let campos = this.props.custom.find(cust => cust.type == this.props.renderOptions.type);
      // let tareasData = this.props.tareas.filter(tarea => {
      //   if (tarea.metas_table && tarea.metas_table.clientes_table && tarea.metas_table.clientes_table.type) {
      //     return (tarea.metas_table.clientes_table.type == type);
      //   }
      // });
      return (
        <div>
         {this.renderBreadcrumb(666)}
          <Grid>
            <Row>
              <Col md={12}>
              {this.renderClientesForm(666)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
              {this.renderClientesTareaTable(tareasData, areasData, metasData)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
               
              </Col>
            </Row>
             <Row>
              <Col md={12}>
               
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {this.renderClientesTable(clientesData, permisos, 666)}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                 {this.renderCustomClientes(formData, campos, permisos, 666)}

              </Col>
            </Row>
            <Row>
              <Col md={12}>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else return null;


  }
}

Clientes.propTypes = {
    clientes: PropTypes.array.isRequired,  
  usuarios: PropTypes.array.isRequired,
  tareas: PropTypes.array.isRequired,
  areas: PropTypes.array.isRequired,
  metas: PropTypes.array.isRequired,

  custom: PropTypes.array.isRequired,
  isAddingClientes: PropTypes.bool.isRequired,
  shouldUpdateClientes: PropTypes.bool.isRequired,
  loadClientes: PropTypes.func,
  destroyClientes: PropTypes.func,
  createClientes: PropTypes.func,
  updateClientes: PropTypes.func,
  startAddingClientes: PropTypes.func,
  stopAddingClientes: PropTypes.func,
  //customList: PropTypes.array.isRequired,
  isAddingCustom: PropTypes.bool.isRequired,
  shouldUpdateCustom: PropTypes.bool.isRequired,
  loadCustom: PropTypes.func,
  destroyCustom: PropTypes.func,
  createCustom: PropTypes.func,
  updateCustom: PropTypes.func,
  shouldUpdateCustom: PropTypes.bool.isRequired,
  updateCustom: PropTypes.func,
  startAddingCustom: PropTypes.func,
  stopAddingCustom: PropTypes.func,
  renderOptions: PropTypes.object.isRequired,
  // tareas: PropTypes.array.isRequired,
  // isAddingTarea: PropTypes.bool.isRequired,
  // shouldUpdateTareas: PropTypes.bool.isRequired,
  loadTareas: PropTypes.func,
  // destroyTarea: PropTypes.func,
  // createTarea: PropTypes.func,
  // updateTarea: PropTypes.func,
  // startAddingTarea: PropTypes.func,
  // stopAddingTarea: PropTypes.func,
  // startModalTarea: PropTypes.func,
  // stopModalTarea: PropTypes.func,
  // metas: PropTypes.array.isRequired,
  // isAddingMeta: PropTypes.bool.isRequired,
  // shouldUpdateMetas: PropTypes.bool.isRequired,
  // loadMetas: PropTypes.func,
  // destroyMeta: PropTypes.func,
  // createMeta: PropTypes.func,
  // updateMeta: PropTypes.func,
  // startAddingMeta: PropTypes.func,
  // stopAddingMeta: PropTypes.func,
  // startModalMeta: PropTypes.func,
  onSortEnd: PropTypes.func
};

function mapStateToProps(state) {
  const {
    clientesReducer,
    tareasReducer,
    areasReducer,
    metasReducer,
    usuariosReducer,
    customReducer,
    permisosReducer
  } = state;
  const {usuarios} = usuariosReducer;
    const {clientes, isAddingClientes, shouldUpdateClientes, renderOptions, clientesModalId} = clientesReducer;

  const {tareas} = tareasReducer;
  const {custom, isAddingCustom, shouldUpdateCustom, customModalId} = customReducer;
  const {areas} = areasReducer;
  const {metas} = metasReducer;
  const {
    permisos,
    onePermisos
  } = permisosReducer;
  return {
    clientes,
    tareas,
    areas,
    metas,
    isAddingClientes,
    shouldUpdateClientes,
    renderOptions,
    clientesModalId,
    custom,
    isAddingCustom,
    shouldUpdateCustom,
    renderOptions,
    customModalId,
    // tareas,
    // isAddingTarea,
    // shouldUpdateTareas,
    // tareaModalId,
    // metas,
    // isAddingMeta,
    // shouldUpdateMetas,
    // metaModalId,
    usuarios,
    shouldUpdateCustom,
    custom,
    permisos
  };
}
 
export default connect(mapStateToProps, {
  loadClientes,
  loadCustom,
  loadAreas,
  loadMetas,
  destroyClientes,
  createClientes,
  updateClientes,
  startAddingClientes,
  stopAddingClientes,
  updateRenderOptions,
  startModalClientes,
  stopModalClientes,
  loadTareas,
  // destroyTarea,
  // createTarea,
  // updateTarea,
  // stopAddingTarea,
  // startAddingTarea,
  // startModalTarea,
  // stopModalTarea,
  // loadMetas,
  // destroyMeta,
  // createMeta,
  // updateMeta,
  // stopAddingMeta,
  // startAddingMeta,
  // startModalMeta,
  // stopModalMeta,
  destroyCustom,
  createCustom,
  updateCustom,
  startAddingCustom,
  stopAddingCustom,
  updateRenderOptions,
  startModalCustom,
  stopModalCustom,
  loadPermisos
})(Clientes);

// import React from 'react';
// import {
//   BootstrapTable,
//   TableHeaderColumn
// } from 'react-bootstrap-table';
// import moment from 'moment';

// const ClientesTareaTable  = ({
//   tareas,
//   clienteid,
//   type
// }) => {




 
//     let tareasFiltered=tareas.filter(tarea => tarea.cliente_id == clienteid);
//   return (
//     // <BootstrapTable
//     //   data={tareasFiltered}
//     //   pagination
//     //   striped
//     //   hover
//     // >
//     //   <TableHeaderColumn
//     //     dataField="id"
//     //     isKey
//     //     dataAlign="center"
//     //     hidden
//     //   >ID
//     //   </TableHeaderColumn>
//     //   <TableHeaderColumn
//     //     dataField="nombre_tarea"
//     //     headerAlign="center"
//     //     editable={false}
//     //   >
//     //     Tareas
      
//     //   </TableHeaderColumn>
//     // </BootstrapTable>
//    s
//   );
// };

// ClientesTareaTable.propTypes = {
//   tareas: React.PropTypes.array.isRequired,
//   clienteid:  React.PropTypes.number,
//   type:  React.PropTypes.number
  
// };

// export default ClientesTareaTable;
import React from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
import {
  Button,
  Panel,
  Glyphicon,
  Popover,
  OverlayTrigger,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import {MultiMonthView} from 'react-date-picker'
import 'react-date-picker/index.css'

const ClientesTareaTable = ({
  tareas,
  areas,
  metas,
  usuarios,
  clienteid,
  tareaRemove,
  tareaAdd,
  tareaCancel,
  tareaDetail,
  tareaAfterSave,
  isAddingTarea,
  tareaChangeStatus,
  tareaModalId,
  tareaModalStart,
  tareaModalStop,
  selectedMetaId,
  selectedAreaId,
  type,
  permisos,
  isAdmin,
  allPermisos,
  localUserId
}) => {
  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              tareaRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
          <Button
            className="play"
            onClick={() => {
              tareaDetail(row);
            }}
            bsSize="xsmall"
            bsStyle="info"
          >
            <Glyphicon glyph="play"/>
          </Button>
        </div>);
    } else {
      return (
        <div>
          <Button
            className="cancel"
            onClick={() => {
              tareaCancel();
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
        </div>);
    }
  };
  const infoFormatter = (cell, row) => {
    if (row.id) {
      let textPiece = (subtitle, text) => {
        if (text)
          return (<p><strong>{subtitle}</strong><br/>{text}</p>);
      }
      let metaLabel = type == 1 ? 'Nombre de la meta' : 'Nombre del hito';
      let areaLabel = type == 1 ? 'Nombre del area' : 'Nombre del proyecto';
      return (
        <OverlayTrigger
          trigger="focus"
          placement="right"
          overlay={
            <Popover id={row.id} title='Detalle'>
              {textPiece('Nombre de la tarea', row.nombre_tarea)}
              {textPiece(metaLabel, row.nombre_meta)}
              {textPiece(areaLabel, row.nombre_area)}
              {textPiece('Responsable', row.id_responsable_tarea)}
            </Popover>}>
          <Button
            bsSize="xsmall"
            bsStyle="info"
          >
            <Glyphicon glyph="info-sign"/>
          </Button>
        </OverlayTrigger>
      );
    }
  };

  const areaFormatter = (cell, row) => {
    if (cell && row.id && areas && metas) {
      let area = areas.filter(area => area.id == metas.area_id);
      if (area[0]) return area[0].nombre_area;
    }
  };

  let idsUsuario = [];
  if (allPermisos && selectedAreaId != 0) {
    idsUsuario = allPermisos.filter(permiso => permiso.area_id == selectedAreaId).map(permiso => (permiso.usuario_id));
  }
  const selectUsuarioFormatter = (cell, row) => {
    if (cell && row.id && usuarios) {
      let usuario = usuarios.filter(usuario => usuario.id == cell);
      if (usuario[0]) return usuario[0].nombre_usuario;
    }
  };

  const selectMetaFormatter = (cell, row) => {
    if (cell && metas && tareas) {
      let meta = metas.filter(meta => meta.id == tareas.meta_id);
      if (meta[0]) return meta[0].nombre_meta;
    }
  };

  const dateModalFormater = (cell, row) => {
    let formattedMoment = '';
    if (cell) {
      let momentFromCell = moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ");
      formattedMoment = momentFromCell.format('DMMMYY');
    }
    if (row.id) {
      return (
        <div>
          {formattedMoment ? formattedMoment + " " : " "}
          <Button
            bsSize="xsmall"
            onClick={() => {
              tareaModalStart(row.id);
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(tareaModalId == row.id)}
            onHide={() => {
              tareaModalStop();
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    row.deadline_tarea = dateMoment.format("YYYY-MM-DDTHH:mm:ss");
                    tareaAfterSave(row);
                    tareaModalStop();
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  tareaModalStop();
                }}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };

  const dateFormatter = (cell, row) => {
    if (cell) {
      return (
        <div>
          {moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ").format('DMMMYY')}
        </div>
      );
    }
  };
  const nameFormatter = (cell, row) => {
    return row.estado_tarea == 1 ? (<div><s>{cell}</s></div>) : (<div>{cell}</div>);
  };

  const statusButtonFormatter = (cell, row) => {
    let isDisabled = !(row.deadline_tarea && row.id_responsable_tarea && row.id_responsable_tarea==localUserId);
    if (row.id) {
      if (row.estado_tarea) {
        return (
          <div>
            <Button
              className="check"
              onClick={() => {
                tareaChangeStatus(row);
              }}
              bsSize="xsmall"
              disabled={isDisabled}
            >
              <Glyphicon glyph="check"/>
            </Button>
          </div>);
      } else {
        return (
          <div>
            <Button
              className="unchecked"
              onClick={() => {
                tareaChangeStatus(row);
              }}
              disabled={isDisabled}
              bsSize="xsmall"
            >
              <Glyphicon glyph="unchecked"/>
            </Button>
          </div>);
      }
    } else {
      return null;
    }
  };
  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: tareaAfterSave
  };
  tareas.map((tarea) => {
    if (tarea.metas_table) {
      tarea.nombre_meta = tarea.metas_table.nombre_meta;
      if (tarea.metas_table.areas_table.nombre_area) {
        tarea.nombre_area = tarea.metas_table.areas_table.nombre_area;
        tarea.area_id = tarea.metas_table.areas_table.id;
      }
    }
  });

  let tareasData = [];
  if (selectedMetaId && selectedMetaId != 0) {
    tareasData = tareas.filter(tarea => tarea.meta_id == selectedMetaId);
  } else if (selectedAreaId && selectedAreaId != 0) {
    tareasData = tareas.filter(tarea => tarea.area_id == selectedAreaId);
  } else {
    tareasData = tareas;
  }


let tareasFiltered=tareas.filter(tarea => tarea.cliente_id == clienteid);


  let idsMeta = [];
  let metasFilteredByArea = [];
  let metasFilteredByMeta = [];

  if (selectedAreaId > 0) {
    metasFilteredByArea = metas.filter(meta => meta.area_id == areas.id)
  } else {
    metasFilteredByArea = metas;
  }
  if (selectedMetaId > 0) {
    metasFilteredByMeta = metasFilteredByArea.filter(meta => meta.id == tareas.meta_id)
  } else {
    metasFilteredByMeta = metasFilteredByArea;
  }

  if (metas) {
    idsMeta = metasFilteredByMeta.filter(meta => metas.find(metas => metas.area_id == areas.id)).map((meta) => (meta.id));
  }

  const title = (
    <h3>Tareas</h3>
  );
  const trClassFormat = (rowData, rIndex) => {
    let deadline = moment(rowData.deadline_tarea, "YYYY-MM-DDTHH:mm:ssZ");
    return moment().isAfter(deadline, 'day') && rowData.estado_tarea == 0 ? 'danger' : '';
  }
  let estadoFilter = {
    true:'Done',
    false:'Activa'
  };

  return (
    <Panel header={title} bsStyle="primary" eventKey="3">
      <BootstrapTable
        data={tareasFiltered}
        striped
        hover
        trClassName={trClassFormat}
        pagination
        options={{
          defaultSortName: "id",
          sortOrder: "desc",
          sizePerPage: 5,
          sizePerPageList: [5, 10, 20, 50]
        }}
      >
        <TableHeaderColumn
          dataFormat={infoFormatter}
          editable={false}
          dataAlign="center"
          width="65"
        />
        <TableHeaderColumn
          dataField="id"
          isKey
          dataAlign="center"
          hidden
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nombre_tarea"
          dataSort
          dataFormat={nameFormatter}
          headerAlign='center'
        >
          Tarea
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="meta_id"
          dataSort
          dataFormat={selectMetaFormatter}
          editable={{type: 'select', options: {values: idsMeta}}}
          headerAlign='center'
          width="100">
          {type == 2 ? 'Meta' : 'Hito'}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="area_id"
          dataFormat={areaFormatter}
          editable={false}
          dataSort
          headerAlign='center'
          width="100">
          {type == 2 ? 'Area' : 'Proyecto'}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="createdAt"
          dataFormat={dateFormatter}
          editable={false}
          dataAlign="right"
          headerAlign='center'
          dataSort
          width="70">
          Creado
        </TableHeaderColumn>
        <TableHeaderColumn
          editable={false}
          dataField="deadline_tarea"
          dataFormat={dateModalFormater}
          dataSort
          headerAlign='center'
          dataAlign="right"
          width="120">
          Deadline
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="done_tarea"
          dataSort
          dataFormat={dateFormatter}
          dataAlign="right"
          editable={false}
          headerAlign='center'
          width="70">
          Done
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_responsable_tarea"
          dataSort
          dataAlign="center"
          headerAlign='center'
          dataFormat={selectUsuarioFormatter}
          editable={isAddingTarea ? false : {type: 'select', options: {values: idsUsuario}}}
          hidden={selectedAreaId==0}
          width="65">
          <h3><Glyphicon glyph="user"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="estado_tarea"
          width="40"
          dataAlign="center"
          headerAlign='center'
          dataSort
          dataFormat={statusButtonFormatter}
          editable={false}
          filter={{ type: 'SelectFilter', defaultValue: false, options: estadoFilter, placeholder: 'Seleccione una opcion'} }

        >
          <h3><Glyphicon glyph="tasks"/></h3>
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="button"
          dataAlign="center"
          dataFormat={buttonFormatter}
          headerAlign='center'
          editable={false}
          width="65"
        >

        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

ClientesTareaTable.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  areas: React.PropTypes.array.isRequired,
  metas: React.PropTypes.array.isRequired,
  tareas: React.PropTypes.array.isRequired,
  clienteid: React.PropTypes.array.isRequired,
  tareaRemove: React.PropTypes.func.isRequired,
  tareaAdd: React.PropTypes.func.isRequired,
  tareaCancel: React.PropTypes.func.isRequired,
  tareaDetail: React.PropTypes.func.isRequired,
  tareaAfterSave: React.PropTypes.func.isRequired,
  tareaChangeStatus: React.PropTypes.func.isRequired,
  isAddingTarea: React.PropTypes.bool.isRequired,
  selectedAreaId: React.PropTypes.number,
  selectedMetaId: React.PropTypes.number,
};

export default ClientesTareaTable;

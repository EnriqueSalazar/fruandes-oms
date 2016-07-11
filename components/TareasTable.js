import React from 'react';
import {
  BootstrapTable,
  TableHeaderColumn} from 'react-bootstrap-table';
import {
  Button,
  Panel,
  Glyphicon,
  Popover,
  OverlayTrigger,
  Modal} from 'react-bootstrap';
import moment from 'moment';
import {MultiMonthView} from 'react-date-picker'
import 'react-date-picker/index.css'

const TareasTable = ({
  usuarios,
  areas,
  metas,
  tareas,
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
  selectedAreaId
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
      return (
        <OverlayTrigger
          trigger="focus"
          placement="right"
          overlay={
            <Popover id={row.id} title='Detalle'>
                     {textPiece('Nombre de la tarea', row.nombre_tarea)}
                     {textPiece('Nombre del area', row.nombre_area)}
                     {textPiece('Nombre de la meta', row.nombre_meta)}
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
    if (cell && row.id && areas) {
      let area = areas.filter(area => area.id == cell);
      if (area[0]) return area[0].nombre_area;
    }
  };

  let idsUsuario = [];
  if (usuarios) {
    idsUsuario = usuarios.map((usuario) => (usuario.id));
  }
  const selectUsuarioFormatter = (cell, row) => {
    if (cell && row.id && usuarios) {
      let usuario = usuarios.filter(usuario => usuario.id == cell);
      if (usuario[0]) return usuario[0].nombre_usuario;
    }
  };

  const selectMetaFormatter = (cell, row) => {
    if (cell && metas) {
      let meta = metas.filter(meta => meta.id == cell);
      if (meta[0]) return meta[0].nombre_meta;
    }
  };

  const dateModalFormater = (cell, row) => {
    let formattedMoment='';
    if (cell){
      let momentFromCell= moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ");
      formattedMoment=momentFromCell.format('DMMMYY');
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
                    row.deadline_tarea = dateMoment.format();
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

  const statusButtonFormatter = (cell, row) => {
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

  let idsMeta = [];
  if (metas) {
    idsMeta = metas.map((meta) => (meta.id));
  }

  const title = (
    <h3>Tareas</h3>
  );

  return (
    <Panel header={title} bsStyle="primary" eventKey="3">
      <BootstrapTable
        data={isAddingTarea ? [{}, ...tareasData] : tareasData}
        striped
        hover
        pagination
        search
        clearSearch
        cellEdit={cellEditProp}
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
          Meta
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="area_id"
          dataFormat={areaFormatter}
          editable={false}
          dataSort
          headerAlign='center'
          width="100">
          Area
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
          editable={{type: 'select', options: {values: idsUsuario}}}
          width="65">
          <h3><Glyphicon glyph="user"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="estado"
          width="40"
          dataAlign="center"
          headerAlign='center'
          dataSort
          dataFormat={statusButtonFormatter}
          editable={false}
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
          <Button
            className="plus"
            onClick={tareaAdd}
            bsStyle="primary"
          >
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

TareasTable.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  areas: React.PropTypes.array.isRequired,
  metas: React.PropTypes.array.isRequired,
  tareas: React.PropTypes.array.isRequired,
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

export default TareasTable;

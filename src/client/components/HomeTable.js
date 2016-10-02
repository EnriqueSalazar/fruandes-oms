import React from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
import {
  Button,
  Glyphicon,
} from 'react-bootstrap';
import moment from 'moment';
import 'react-date-picker/index.css';
import {browserHistory} from 'react-router';

const HomeTable = ({
  usuarios,
  tareas,
  tareaCancel,
  isAddingTarea,
  tareaChangeStatus,
}) => {
  const tareaDetail=(row)=>{
    browserHistory.push('/taskspage/' + row.type + '/' + row.area_id + '/' + row.meta_id + '/' + row.id);

  }
  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="play"
        //    {/*href={"/taskspage/" + row.type + "/" + row.area_id + "/" + row.meta_id + "/" + row.id}*/}
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
  let now = moment();
  tareas.map((tarea) => {
    if (tarea.deadline_tarea) {
      tarea.daysLeft = moment.utc(tarea.deadline_tarea, "YYYY-MM-DDTHH:mm:ssZ").diff(now, 'days');
    }
    if (tarea.metas_table) {
      tarea.nombre_meta = tarea.metas_table.nombre_meta;
      if (tarea.metas_table.areas_table) {
        tarea.nombre_area = tarea.metas_table.areas_table.nombre_area;
        tarea.area_id = tarea.metas_table.areas_table.id;
        tarea.type = tarea.metas_table.areas_table.type;
      }
    }
  });
  let tareasData = [];
  if (localStorage.getItem('authUser_oms')){
    let userId = localStorage.getItem('authUser_oms');
    tareasData = tareas.filter(tarea => tarea.estado_tarea == 0 && tarea.deadline_tarea && tarea.id_responsable_tarea == userId);
  } else {
    return null
  }
  const trClassFormat  = (rowData,rIndex) =>{
    let deadline = moment(rowData.deadline_tarea, "YYYY-MM-DDTHH:mm:ssZ");
    return moment().isAfter(deadline, 'day')? 'danger':'';
  }
  return (
    <BootstrapTable
      data={isAddingTarea ? [{}, ...tareasData] : tareasData}
      trClassName={trClassFormat}
      striped
      hover
      pagination={true}
      options={{
        defaultSortName: "daysLeft",
        sortOrder: "asc",
        sizePerPage: 5,
        sizePerPageList: [5, 10, 20, 50]
      }}
    >
      <TableHeaderColumn
        dataField="id"
        isKey
        dataAlign="center"
        hidden
      >
        ID
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="daysLeft"
        dataAlign="center"
        hidden
      >
        daysLeft
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="nombre_tarea"
        dataSort
        headerAlign="center"
      >
        Tarea
      </TableHeaderColumn>
      <TableHeaderColumn
        editable={false}
        dataField="deadline_tarea"
        dataFormat={dateFormatter}
        headerAlign="center"
        dataAlign="right"
        width="120">
        Deadline
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="id_responsable_tarea"
        dataAlign="center"
        headerAlign="center"
        dataFormat={selectUsuarioFormatter}
        editable={{type: 'select', options: {values: idsUsuario}}}
        width="120">
        <h3><Glyphicon glyph="user"/></h3>
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="estado"
        width="40"
        dataAlign="center"
        headerAlign="center"
        dataFormat={statusButtonFormatter}
        editable={false}
      >
        <h3><Glyphicon glyph="tasks"/></h3>
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="button"
        dataAlign="center"
        dataFormat={buttonFormatter}
        headerAlign="center"
        editable={false}
        width="40" />
    </BootstrapTable>
  );
};

HomeTable.propTypes = {
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

export default HomeTable;

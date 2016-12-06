import React from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
import moment from 'moment';

const RecurrentesDoneTable = ({tarea}) => {

  const dateFormatter = (cell, row) => {
    if (cell) {
      return (
        <div>
          {moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ").format('DMMMYY')}
        </div>
      );
    }
  };

  const title = (
    <h3>Recurrentes</h3>
  );
  let done;
  // debugger
  if (tarea && tarea.recurrentes_done_tables) {
    done = tarea.recurrentes_done_tables;
  } else {
    return null;
  }
  done.map(recurrente => {
    if (recurrente.usuarios_table && recurrente.usuarios_table.nombre_usuario) {
      recurrente.nombre_usuario = recurrente.usuarios_table.nombre_usuario;
    }
  });
  return (
    <BootstrapTable
      data={done}
      pagination
      striped
      hover
    >
      <TableHeaderColumn
        dataField="id"
        isKey
        dataAlign="center"
        hidden
      >ID
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="nombre_usuario"
        headerAlign="center"
        editable={false}
      >
        Nombre usuario
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="createdAt"
        dataAlign="center"
        headerAlign="center"
        dataFormat={dateFormatter}
        editable={false}
      >
        Realizado
      </TableHeaderColumn>
    </BootstrapTable>
  );
};

RecurrentesDoneTable.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  areas: React.PropTypes.array.isRequired,
  metas: React.PropTypes.array.isRequired,
  recurrentes: React.PropTypes.array.isRequired,
  recurrenteRemove: React.PropTypes.func.isRequired,
  recurrenteAdd: React.PropTypes.func.isRequired,
  recurrenteCancel: React.PropTypes.func.isRequired,
  recurrenteDetail: React.PropTypes.func.isRequired,
  recurrenteAfterSave: React.PropTypes.func.isRequired,
  recurrenteChangeStatus: React.PropTypes.func.isRequired,
  isAddingRecurrente: React.PropTypes.bool.isRequired,
  selectedAreaId: React.PropTypes.number,
  selectedMetaId: React.PropTypes.number,
};

export default RecurrentesDoneTable;

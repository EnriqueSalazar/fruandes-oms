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

const RecurrentesTable = ({
  usuarios,
  recurrentes,
  recurrenteRemove,
  recurrenteAdd,
  recurrenteCancel,
  recurrenteDetail,
  recurrenteAfterSave,
  isAddingRecurrente
}) => {
  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              recurrenteRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
          <Button
            className="play"
            onClick={() => {
              recurrenteDetail(row);
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
              recurrenteCancel();
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
    idsUsuario = usuarios.map(usuario => (usuario.id));
  }
  const periodos = [7, 30, 365];
  const selectPeriodoFormatter = (cell, row) => {
    if (cell && row.id) {
      switch (cell) {
        case 7:
          return 'Semanal';
        case 30:
          return 'Mensual';
        case 365:
          return 'Anual';
      }
    }
  };
  const selectUsuarioFormatter = (cell, row) => {
    if (cell && row.id && usuarios) {
      let usuario = usuarios.filter(usuario => usuario.id == cell);
      if (usuario[0]) return usuario[0].nombre_usuario;
    }
  };


  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: recurrenteAfterSave
  };


  const title = (
    <h3>Recurrentes</h3>
  );

  return (
    <Panel header={title} bsStyle="primary" eventKey="3">
      <BootstrapTable
        data={isAddingRecurrente ? [{}, ...recurrentes] : recurrentes}
        striped
        hover
        pagination
        search
        clearSearch
        cellEdit={cellEditProp}
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
          dataField="nombre_recurrente"
          dataSort
          headerAlign='center'
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_responsable_recurrente"
          dataSort
          dataAlign="center"
          headerAlign='center'
          dataFormat={selectUsuarioFormatter}
          editable={isAddingRecurrente ? false : {type: 'select', options: {values: idsUsuario}}}
          >
          <h3><Glyphicon glyph="user"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="periodicity"
          dataSort
          dataAlign="center"
          headerAlign='center'
          dataFormat={selectPeriodoFormatter}
          editable={isAddingRecurrente ? false : {type: 'select', options: {values: periodos}}}
          >
          Periodos
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
            onClick={recurrenteAdd}
            bsStyle="primary"
          >
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

RecurrentesTable.propTypes = {
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

export default RecurrentesTable;

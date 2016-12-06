import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Panel, Glyphicon, Modal} from 'react-bootstrap';
import {MultiMonthView} from 'react-date-picker'
import moment from 'moment';

const ClientesTable = ({
  clientes,
  clientesRemove,
  clientesAdd,
  clientesCancel,
  clientesDetail,
  clientesAfterSave,
  isAddingClientes,
  clientesModalId,
  clientesModalStart,
  clientesModalStop,
  type,
  permisos,
  level
}) => {

  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              clientesRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
            disabled={!(level=="666" || (type==2 && level=="333"))}
          >
            <Glyphicon glyph="remove"/>
          </Button>
          <Button
            className="play"
            onClick={() => {
              clientesDetail(row);
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
              clientesCancel();
            }}
            bsSize="xsmall"
            bsStyle="danger"
            disabled={!(level=="666" || (type==2 && level=="333"))}
          >
            <Glyphicon glyph="remove"/>
          </Button>
        </div>);
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
              clientesModalStart(row.id);
            }}
            disabled={!(level=="666" || (type==2 && level=="333"))}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(clientesModalId == row.id)}
            onHide={() => {
              clientesModalStop();
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    row.deadline_proyecto = dateMoment.format("YYYY-MM-DDTHH:mm:ss");
                    clientesAfterSave(row);
                    clientesModalStop();
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  clientesModalStop();
                }}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: clientesAfterSave
  };
  const title = type == 1 ?(

    <h3>Clientes Nacionales</h3>
  ):type == 2 ?(
    <h3>Clientes Internacionales</h3>
  ):( 
    <h3>Organizaciones</h3>
  );

  let clientesFiltered=clientes.filter(clientes => permisos.find(permiso => permiso.clientes_id == clientes.id ) || level == "666");
  return (
    <Panel header={title} bsStyle="primary" eventKey="1">
      <BootstrapTable
        data={isAddingClientes ? [{}, ...clientesFiltered] : clientesFiltered}
        striped
        hover
        pagination
        search
        clearSearch
        cellEdit={cellEditProp}
        options={{
          defaultSortName: "id",
          sortOrder: "desc",
          sizePerPage: 5,
          sizePerPageList: [5, 10, 20, 50]
        }}
      >
        <TableHeaderColumn
          dataField="id"
          isKey dataAlign="center"
          dataSort hidden
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="type"
          dataAlign="center"
          dataSort hidden
        >
          Type
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nombre_clientes"
          dataSort
          headerAlign="center"
          width="200"
          editable={(level=="666" || (type==2 && level=="333"))}
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="email_clientes"
          headerAlign="center"
          width="200"
          editable={(level=="666" || (type==2 && level=="333"))}
        >
          Email 
        </TableHeaderColumn>
        <TableHeaderColumn
           editable={(level=="666" || (type==2 && level=="333"))}
          dataField="telefono_clientes"
          //dataFormat={dateModalFormater}
          dataSort
          //hidden={type!=2}
          headerAlign="center"
          dataAlign="right"
          width="120" >
          Telefono Cliente
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="button"
          dataFormat={buttonFormatter}
          editable={false}
          width="65">
          <Button
            className="plus"
            onClick={clientesAdd}
            bsStyle="primary"
            disabled={!(level=="666" || (type==2 && level=="333"))}
          >
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>                
    </Panel>
  );
};

ClientesTable.propTypes = {
  clientes: React.PropTypes.array.isRequired,
  clientesRemove: React.PropTypes.func.isRequired,
  clientesAdd: React.PropTypes.func.isRequired,
  clientesCancel: React.PropTypes.func.isRequired,
  clientesDetail: React.PropTypes.func.isRequired,
  clientesAfterSave: React.PropTypes.func.isRequired,
  isAddingClientes: React.PropTypes.bool.isRequired,
  type: React.PropTypes.number.isRequired,
  clientesModalId: React.PropTypes.number.isRequired,
  clientesModalStart: React.PropTypes.func.isRequired,
  clientesModalStop: React.PropTypes.func.isRequired
};

export default ClientesTable;


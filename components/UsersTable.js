import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Panel, Glyphicon, Modal} from 'react-bootstrap';
import {MultiMonthView} from 'react-date-picker'
import moment from 'moment';

const AreasTable = ({
  areas,
  areaRemove,
  areaAdd,
  areaCancel,
  areaDetail,
  areaAfterSave,
  isAddingArea,
  areaModalId,
  areaModalStart,
  areaModalStop,
  type
}) => {

  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              areaRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
          <Button
            className="play"
            onClick={() => {
              areaDetail(row);
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
              areaCancel();
            }}
            bsSize="xsmall"
            bsStyle="danger"
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
              areaModalStart(row.id);
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(areaModalId == row.id)}
            onHide={() => {
              areaModalStop();
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    row.deadline_proyecto = dateMoment.format();
                    areaAfterSave(row);
                    areaModalStop();
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  areaModalStop();
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
    afterSaveCell: areaAfterSave
  };
  const title = (
    <h3>Areas</h3>
  );

  return (
    <Panel header={title} bsStyle="primary" eventKey="1">
      <BootstrapTable
        data={isAddingArea ? [{}, ...areas] : areas}
        striped
        hover
        pagination
        search
        clearSearch
        cellEdit={cellEditProp}
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
          dataField="nombre_area"
          dataSort
          headerAlign="center"
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="descripcion_area"
          headerAlign="center"
        >
          Descripcion
        </TableHeaderColumn>
        <TableHeaderColumn
          editable={false}
          dataField="deadline_proyecto"
          dataFormat={dateModalFormater}
          dataSort
          hidden={type!=2}
          headerAlign="center"
          dataAlign="right"
          width="120">
          Deadline
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="button"
          dataFormat={buttonFormatter}
          editable={false}
          width="65">
          <Button
            className="plus"
            onClick={areaAdd}
            bsStyle="primary">
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

AreasTable.propTypes = {
  areas: React.PropTypes.array.isRequired,
  areaRemove: React.PropTypes.func.isRequired,
  areaAdd: React.PropTypes.func.isRequired,
  areaCancel: React.PropTypes.func.isRequired,
  areaDetail: React.PropTypes.func.isRequired,
  areaAfterSave: React.PropTypes.func.isRequired,
  isAddingArea: React.PropTypes.bool.isRequired,
  type: React.PropTypes.number.isRequired,
  areaModalId: React.PropTypes.number.isRequired,
  areaModalStart: React.PropTypes.func.isRequired,
  areaModalStop: React.PropTypes.func.isRequired
};

export default AreasTable;

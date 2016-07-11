import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Panel, Glyphicon, Popover, OverlayTrigger, Modal, ProgressBar} from 'react-bootstrap';
import moment from 'moment';
import {MultiMonthView} from 'react-date-picker'
import 'react-date-picker/index.css'

const MetasTable = ({
  usuarios,
  areas,
  metas,
  metaRemove,
  metaAdd,
  metaCancel,
  metaDetail,
  metaAfterSave,
  isAddingMeta,
  metaModalId,
  metaModalStart,
  metaModalStop,
  selectedAreaId
}) => {
  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              metaRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
          <Button
            className="play"
            onClick={() => {
              metaDetail(row);
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
              metaCancel();
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
              {textPiece('Nombre de la meta', row.nombre_meta)}
              {textPiece('Nombre del area', row.nombre_area)}
              {textPiece('Responsable', row.id_responsable_meta)}
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

  const selectAreaFormatter = (cell, row) => {
    if (cell && areas) {
      let area = areas.filter(area => area.id == cell);
      if (area[0]) return area[0].nombre_area;
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
              metaModalStart(row.id);
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(metaModalId == row.id)}
            onHide={() => {
              metaModalStop();
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    row.deadline_meta = dateMoment.format();
                    metaAfterSave(row);
                    metaModalStop();
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  metaModalStop();
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

  const avanceFormatter = (cell, row) => {
    let avanceStyle = 'info';
    if (row.id) {
      if (row.avance_meta) {
        let deadline = moment(row.deadline_meta, "YYYY-MM-DDTHH:mm:ssZ");
        if (moment().isAfter(deadline, 'day') && row.avance_meta < 100) {
          avanceStyle = 'danger';
        } else if (row.avance_meta == 100) {
          avanceStyle = 'success';
        }
        return (
          <div>
            <ProgressBar
              now={Number(row.avance_meta)}
              label={`${row.avance_meta}%`}
              bsStyle={avanceStyle}/>
          </div>
        );
      } else {
        return (<Glyphicon glyph="alert"/>);
      }
    }
  }

  const beforeSave = (row, cellName, cellValue) => {
    // debugger
  }

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: beforeSave,
    afterSaveCell: metaAfterSave
  };
  metas.map((meta) => {
    if (meta.areas_table) {
      meta.nombre_area = meta.areas_table.nombre_area;
    }
  });
  let metasData = [];
  if (selectedAreaId && selectedAreaId != 0) {
    metasData = metas.filter(meta => meta.area_id == selectedAreaId);
  } else {
    metasData = metas;
  }

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

  let idsArea = [];
  if (areas) {
    idsArea = areas.map((area) => (area.id));
  }

  const title = (
    <h3>Metas</h3>
  );
  return (
    <Panel header={title} bsStyle="primary" eventKey="2">
      <BootstrapTable
        data={isAddingMeta ? [{}, ...metasData] : metasData}
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
          dataField="nombre_meta"
          dataSort
          headerAlign="center"
        >
          Meta
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="area_id"
          dataFormat={selectAreaFormatter}
          editable={{type: 'select', options: {values: idsArea}}}
          dataSort
          headerAlign="center"
          width="100">
          Area
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="createdAt"
          dataFormat={dateFormatter}
          editable={false}
          dataAlign="right"
          headerAlign="center"
          dataSort
          width="70">
          Creado
        </TableHeaderColumn>
        <TableHeaderColumn
          editable={false}
          dataField="deadline_meta"
          dataFormat={dateModalFormater}
          dataSort
          headerAlign="center"
          dataAlign="right"
          width="120">
          Deadline
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="done_meta"
          dataSort
          dataFormat={dateFormatter}
          dataAlign="right"
          editable={false}
          headerAlign="center"
          width="70">
          Done
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_responsable_meta"
          dataSort
          dataAlign="center"
          headerAlign="center"
          dataFormat={selectUsuarioFormatter}
          editable={{type: 'select', options: {values: idsUsuario}}}
          width="65">
          <h3><Glyphicon glyph="user"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="avance_meta"
          width="100"
          dataAlign="center"
          headerAlign="center"
          dataSort
          dataFormat={avanceFormatter}
        >
          <h3><Glyphicon glyph="tasks"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="button"
          dataAlign="center"
          dataFormat={buttonFormatter}
          headerAlign="center"
          editable={false}
          width="65"
        >
          <Button
            className="plus"
            onClick={metaAdd}
            bsStyle="primary"
          >
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

MetasTable.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  areas: React.PropTypes.array.isRequired,
  metas: React.PropTypes.array.isRequired,
  metaRemove: React.PropTypes.func.isRequired,
  metaAdd: React.PropTypes.func.isRequired,
  metaCancel: React.PropTypes.func.isRequired,
  metaDetail: React.PropTypes.func.isRequired,
  metaAfterSave: React.PropTypes.func.isRequired,
  metaChangeStatus: React.PropTypes.func.isRequired,
  isAddingMeta: React.PropTypes.bool.isRequired,
  selectedAreaId: React.PropTypes.number
};

export default MetasTable;

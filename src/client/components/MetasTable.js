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
  selectedAreaId,
  type,
  permisos,
  level,
  allPermisos
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
            disabled={!(level=="666")}
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
            disabled={!(level=="666")}
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
              {textPiece(metaLabel, row.nombre_meta)}
              {textPiece(areaLabel, row.nombre_area)}
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
            disabled={!(level=="666")}
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
                    row.deadline_meta = dateMoment.format("YYYY-MM-DDTHH:mm:ss");
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
  let metasFiltered = metasData.filter(meta => permisos.find(permiso => permiso.area_id == meta.area_id) || level == "666");

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
  const trClassFormat = (rowData, rIndex) => {
    let deadline = moment(rowData.deadline_meta, "YYYY-MM-DDTHH:mm:ssZ");
    return moment().isAfter(deadline, 'day') && rowData.avance_meta < 100 ? 'danger' : '';
  }
  let idsArea = [];
  if (areas) {
    idsArea = areas.filter(area => permisos.find(permiso => permiso.area_id == area.id) || level == "666").map((area) => (area.id));
  }
  // let areasFiltered=areas.filter(area => permisos.find(permiso => permiso.area_id == area.id ) || isAdmin);
  const nameFormatter = (cell, row) => {
    return row.avance_meta >= 100 ? (<div><s>{cell}</s></div>) : (<div>{cell}</div>);
  };
  const title = type == 1 ? (
    <h3>Metas</h3>
  ) : (
    <h3>Hitos</h3>
  );
  return (
    <Panel header={title} bsStyle="primary" eventKey="2">
      <BootstrapTable
        data={isAddingMeta ? [{}, ...metasFiltered] : metasFiltered}
        striped
        hover
        pagination
        search
        trClassName={trClassFormat}
        clearSearch
        cellEdit={cellEditProp}
        options={{
          defaultSortName: "id",
          sortOrder: "desc",
          sizePerPage: 5,
          sizePerPageList: [5, 10, 20, 50]
        }}>
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
          dataFormat={nameFormatter}
          dataSort
          headerAlign="center"
          editable={(level=="666")}
        >
          {type == 1 ? 'Meta' : 'Hito'}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="area_id"
          dataFormat={selectAreaFormatter}
          editable={(level=="666")?{type: 'select', options: {values: idsArea}}:false}
          dataSort
          headerAlign="center"
          width="100">
          {type == 1 ? 'Area' : 'Proyecto'}
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
          editable={!isAddingMeta && (level=="666")? {type: 'select', options: {values: idsUsuario}} : false}
          hidden={selectedAreaId==0}
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
          editable={(!isAddingMeta && (level=="666" || level=="333"))}
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
            disabled={!(level=="666")}
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

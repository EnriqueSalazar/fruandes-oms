import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Panel, Glyphicon} from 'react-bootstrap';

const UsuariosTable = ({
  usuarios,
  usuarioRemove,
  usuarioAdd,
  usuarioCancel,
  usuarioDetail,
  usuarioAfterSave,
  isAddingUsuario,
  usuarioChangeStatus
}) => {

  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              usuarioRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
          {/*<Button*/}
            {/*className="play"*/}
            {/*onClick={() => {*/}
              {/*usuarioDetail(row);*/}
            {/*}}*/}
            {/*bsSize="xsmall"*/}
            {/*bsStyle="info"*/}
          {/*>*/}
            {/*<Glyphicon glyph="play"/>*/}
          {/*</Button>*/}
        </div>);
    } else {
      return (
        <div>
          <Button
            className="cancel"
            onClick={() => {
              usuarioCancel();
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
        </div>);
    }
  };
  const kingButtonFormatter = (cell, row) => {
    delete row.pwd;
    if (row.id) {
      if (row.perfil == 666) {
        return (
          <div>
            <Button
              className="check"
              onClick={() => {
                usuarioChangeStatus(row,0);
              }}
              bsSize="xsmall"
            >
              <Glyphicon glyph="eye-open"/>
            </Button>
          </div>);
      } else {
        return (
          <div>
            <Button
              className="unchecked"
              onClick={() => {
                usuarioChangeStatus(row,666);
              }}
              bsSize="xsmall"
            >
              <Glyphicon glyph="eye-close"/>
            </Button>
          </div>);
      }
    } else {
      return null;
    }
  };
  const bishopButtonFormatter = (cell, row) => {
    delete row.pwd;
    if (row.id) {
      if (row.perfil == 666) {
        return (
          <div>
            <Button
              className="unchecked"
              disabled
              bsSize="xsmall"
            >
              <Glyphicon glyph="eye-close"/>
            </Button>
          </div>);
      } else if (row.perfil == 333) {
        return (
          <div>
            <Button
              className="check"
              onClick={() => {
                usuarioChangeStatus(row, 0);
              }}
              bsSize="xsmall"
            >
              <Glyphicon glyph="eye-open"/>
            </Button>
          </div>);
      } else {
        return (
          <div>
            <Button
              className="unchecked"
              onClick={() => {
                usuarioChangeStatus(row, 333);
              }}
              bsSize="xsmall"
            >
              <Glyphicon glyph="eye-close"/>
            </Button>
          </div>);
      }
    } else {
      return null;
    }
  };

  const pwdFormatter = () => {
    return 'click aqui';
  };

  usuarios.map((usuario) => {
    usuario.pwd = '';
  });

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: usuarioAfterSave
  };
  const title = (
    <h3>Usuarios</h3>
  );
  return (
    <Panel header={title} bsStyle="primary" eventKey="1">
      <BootstrapTable
        data={isAddingUsuario ? [{}, ...usuarios] : usuarios}
        striped
        hover
        pagination
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
          dataField="nombre_usuario"
          dataSort
          headerAlign="center"
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="email_usuario"
          headerAlign="center"
        >
          Email
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="pwd"
          dataFormat={pwdFormatter}
          width="130">
          Password
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="perfil"
          width="40"
          dataAlign="center"
          headerAlign="center"
          dataFormat={kingButtonFormatter}
          editable={false}
        >
          <h3><Glyphicon glyph="king"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="perfil"
          width="40"
          dataAlign="center"
          headerAlign="center"
          dataFormat={bishopButtonFormatter}
          editable={false}
        >
          <h3><Glyphicon glyph="bishop"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="button"
          dataFormat={buttonFormatter}
          editable={false}
          width="65">
          <Button
            className="plus"
            onClick={usuarioAdd}
            bsStyle="primary">
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

UsuariosTable.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  usuarioRemove: React.PropTypes.func.isRequired,
  usuarioAdd: React.PropTypes.func.isRequired,
  usuarioCancel: React.PropTypes.func.isRequired,
  usuarioDetail: React.PropTypes.func.isRequired,
  usuarioAfterSave: React.PropTypes.func.isRequired,
  isAddingUsuario: React.PropTypes.bool.isRequired,
  type: React.PropTypes.number.isRequired,
  usuarioModalId: React.PropTypes.number.isRequired,
  usuarioModalStart: React.PropTypes.func.isRequired,
  usuarioModalStop: React.PropTypes.func.isRequired,
  usuarioChangeStatus: React.PropTypes.func.isRequired
};

export default UsuariosTable;

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Panel, Glyphicon, Modal} from 'react-bootstrap';

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
          <Button
            className="play"
            onClick={() => {
              usuarioDetail(row);
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
  const statusButtonFormatter = (cell, row) => {
    delete row.pwd;
    if (row.id) {
      if (row.perfil==666) {
        return (
          <div>
            <Button
              className="check"
              onClick={() => {
                usuarioChangeStatus(row);
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
                usuarioChangeStatus(row);
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
  const pwdFormatter = (cell, row) => {
    let hidder = '***';
    // let hidder = '';
    // if (cell){
    //   for (let i = 0; i < cell.length; i++) {
    //     hidder += hidder + '*';
    //   }
    // }
    return hidder;
  }

  usuarios.map((usuario) => {
    usuario.pwd='';
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
  usuarioModalStop: React.PropTypes.func.isRequired
};

export default UsuariosTable;

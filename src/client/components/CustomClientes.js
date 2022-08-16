import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
  Button,
  Glyphicon,
  FormGroup,
  FormControl,
  Row,
  Col
} from 'react-bootstrap';
import moment from 'moment';
import 'react-date-picker/index.css'

const CustomFieldClientes= ({
  usuarios,
  comentariosAreas,
  comentariosAreaAdd,
  area_id,
  meta_id,
  tarea_id,
  usuario_id,
  comentario = ''
}) => {

  const formatter = (cell, row) => {
    let printFecha;
    if (row.createdAt) {
      printFecha = (
        <div>
          {moment.utc(row.createdAt, "YYYY-MM-DDTHH:mm:ssZ").format('DD MMMM YYYY')}
        </div>
      );
    }
    let printUsuario;
    if (row.usuario_id && row.id && usuarios) {
      let usuario = usuarios.filter(usuario => usuario.id == row.usuario_id);
      if (usuario[0]) {
        printUsuario = usuario[0].nombre_usuario;
      }
    }
    return (<div><strong>{printUsuario}</strong><br />{printFecha}</div>)
  };

  const onSubmitComentario = () => {
    if (comentario) {
      comentariosAreaAdd({
        comentario,
        area_id,
        meta_id,
        tarea_id,
        usuario_id
      });
    }
  }

  return (
    <div>
      <Row>
        <Col md={10}>
          <right>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Comentario"
                onChange={(e) => {
                  comentario = e.target.value;
                }}/>
            </FormGroup>
          </right>
        </Col>
        <Col md={2}>
          <left>
            <Button
              onClick={onSubmitComentario}>
              <Glyphicon glyph="comment"/>
            </Button>
          </left>

        </Col>
      </Row>
      <BootstrapTable
        data={comentariosAreas}
        striped
        hover
        pagination
        condensed
        options={{
          defaultSortName: "id",
          sortOrder: "desc",
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
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="createdAt"
          dataFormat={formatter}
          editable={false}
          dataAlign="right"
          headerAlign="center"
          width="120">
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="comentario"
          headerAlign="center"
        >
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

CustomFieldClientes.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  comentariosAreas: React.PropTypes.array.isRequired,
  comentariosAreaUpdate: React.PropTypes.func.isRequired,
  comentariosAreaAdd: React.PropTypes.func.isRequired,
  area_id: React.PropTypes.number.isRequired,
  meta_id: React.PropTypes.number.isRequired,
  tarea_id: React.PropTypes.number.isRequired,
  usuario_id: React.PropTypes.number.isRequired,
  comentario: React.PropTypes.string
};

export default CustomFieldClientes;
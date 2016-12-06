import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {
  Button,
  Glyphicon,
  Row,
  Col
} from 'react-bootstrap';

export const fields = ['id', 'nombre_area', 'descripcion_area'];
const AreaForm = ({
  fields: {id, nombre_area, descripcion_area},
  handleSubmit,
  type,
  level
}) => {
// class AreaForm extends Component {
//  render() {

  debugger
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <input
            type="text"
            name="nombre_area"
            label={type == 1 ? 'Nombre del Area' : 'Nombre del Proyecto'}
            disabled={!(level == "666" || (type == 2 && level == "333"))}
            {...nombre_area}/>
        </Col>
        <Col md={6}>
          <input
            type="text"
            name="descripcion_area"
            label={type == 1 ? 'Descripcion del Area' : 'Descripcion del Proyecto'}
            disabled={!(level == "666" || (type == 2 && level == "333"))}
            {...descripcion_area}/>
        </Col>
      </Row>
      <Button
        type="submit"
        bsStyle="primary"
        disabled={!(level == "666" || (type == 2 && level == "333"))}
      >
        Guardar <Glyphicon glyph="floppy-save"/>
      </Button>
    </form>
  );
}
// }

AreaForm.reduxForm = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'areaform',
  fields
})(AreaForm);

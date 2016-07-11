import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {
  Button,
  Glyphicon,
  Row,
  Col,
  Input
} from 'react-bootstrap';
export const fields = ['id', 'nombre_area', 'descripcion_area'];

class AreaForm extends Component {
  render() {
    const {
      fields: {id, nombre_area, descripcion_area},
      handleSubmit
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Input type="text" name="nombre_area" label="Nombre area" {...nombre_area}/>
          </Col>
          <Col md={6}>
            <Input type="text" name="descripcion_area" label="Descripcion area" {...descripcion_area}/>
          </Col>
        </Row>
        <Button
          type="submit"
          bsStyle="primary"
        >
          Guardar <Glyphicon glyph="floppy-save"/>
        </Button>

      </form>
    );
  }
}

AreaForm.reduxForm = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'areaform',
  fields
})(AreaForm);

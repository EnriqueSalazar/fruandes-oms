import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {
  Button,
  Glyphicon,
  Row,
  Col,
  FormGroup, ControlLabel
} from 'react-bootstrap';

let AreaForm = props => {
  const {
    initialValues,
    handleSubmit,
    type,
    level
  }  = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Row>
          <Col md={6}>
            <ControlLabel>
              {type == 1 ? 'Nombre del Area' : 'Nombre del Proyecto'}
            </ControlLabel>
            <Field
              className="form-control"
              component="input"
              type="text"
              name="nombre_area"
              disabled={!(level == "666" || (type == 2 && level == "333"))}
            />
          </Col>
          <Col md={6}>
            <ControlLabel>
              {type == 1 ? 'Descripcion del Area' : 'Descripcion del Proyecto'}
            </ControlLabel>
            <Field
              className="form-control"
              component="input"
              type="text"
              name="descripcion_area"
              disabled={!(level == "666" || (type == 2 && level == "333"))}
            />
          </Col>
        </Row>
      </FormGroup>
      <Button
        type="submit"
        bsStyle="primary"
        disabled={!(level == "666" || (type == 2 && level == "333"))}
      >
        {"Guardar "}
        <Glyphicon glyph="floppy-save"/>
      </Button>
    </form>
  );
};
// }

// AreaForm.reduxForm = {
//   // initialValues: PropTypes.object.isRequired,
//   // handleSubmit: PropTypes.function.isRequired
// };

AreaForm = reduxForm({
  form: 'areaForm'
})(AreaForm);

export default AreaForm;

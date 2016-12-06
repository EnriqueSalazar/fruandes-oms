import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {
  Button,
  Glyphicon,
  Row,
  Col,
  Input
} from 'react-bootstrap';
export const fields = ['id', 'nombre_usuario', 'email_usuario', 'pwd', 'pwd2'];

class UsuarioForm extends Component {
  render() {
    const {
      fields: {id, nombre_usuario, email_usuario, pwd, pwd2},
      handleSubmit
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Input type="text" name="nombre_usuario" label="Nombre usuario" {...nombre_usuario}/>
          </Col>
          <Col md={6}>
            <Input type="text" name="email_usuario" label="Email usuario" {...email_usuario}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input type="password" name="pwd" label="Password" {...pwd}/>
          </Col>
          <Col md={6}>
            <Input type="password" name="pwd2" label="Repita el password" {...pwd2}/>
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

UsuarioForm.reduxForm = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'usuarioform',
  fields
})(UsuarioForm);

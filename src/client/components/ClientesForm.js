import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm, FormSection} from 'redux-form';
import {
  Button,
  Glyphicon,
  Row,
  Col,
  FormGroup, 
  ControlLabel,
  Collapse
} from 'react-bootstrap';





let ClientesForm = props => {
const {
    initialValues,
    handleSubmit,
    type,
    level,
    fields,
    campos

  }  = props;
debugger;
console.log(fields);


  const renderField = ({ input, label, type}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" type={type} placeholder={label}/>
    </div>
  </div>
);

//let customs = JSON.stringify(fields);
//console.log(customs);
const renderMembers = (campos, metas) => (
<FormSection name="jsonCustom">
    {fields.map((jsonCustoms, index) =>
      <Col md={6} key={index}>
        <Field
          name={`${jsonCustoms}`}
          className="form-control"
          type="text"
          component={renderField}
          label={`${jsonCustoms}`}/>

      </Col>
    )}    
        
 </FormSection>
 );
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Row>
          <Col md={6}>
            <ControlLabel>
              {type == 1 ? 'Nombre del Cliente' : 'Nombre del Cliente'}
            </ControlLabel>
            <Field
              className="form-control"
              component="input"
              type="text"
              name="nombre_clientes"
              disabled={!(level == "666" || (type == 2 && level == "333"))}
            />
          </Col>
          <Col md={6}>
            <ControlLabel>
              {type == 1 ? 'Email del Cliente' : 'Email del Cliente'}
            </ControlLabel>
            <Field
              className="form-control"
              component="input"
              type="text"
              name="email_clientes"
              disabled={!(level == "666" || (type == 2 && level == "333"))}
            />
          </Col>
          <Col md={6}>
            <ControlLabel>
              {type == 1 ? 'Telefono del Cliente' : 'Telefono del Cliente'}
            </ControlLabel>
            <Field
              className="form-control"
              component="input"
              type="text"
              name="telefono_clientes"
              disabled={!(level == "666" || (type == 2 && level == "333"))}
            />
          </Col>
   
          
           
          <FieldArray name="campo" component={renderMembers}/>
  
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
  debugger;
};


ClientesForm = reduxForm({
  form: 'clientesForm'
})(ClientesForm);

export default ClientesForm;
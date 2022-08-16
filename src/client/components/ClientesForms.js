// Core
import React, { PropTypes } from 'react';
// UI
import Form from 'react-jsonschema-form';
import {Grid, Col, Row, Panel, Well, Breadcrumb, Button, Collapse, Buttom, Glyphicon, ListGroupItem, ListGroup, FieldArray} from 'react-bootstrap';

// Schemas
const uiSchema =  {
  };

const schema = {
    type: "object",
    properties: {
      customs: {
        type: "array",
        title: "",          
        items: {
          type: "string",
          default: ""
        }
      }
    }
  };


// PropTypes
const propTypes = {
  onSubmit: PropTypes.func,
  formData: PropTypes.object,
};

// DefaultProps
const defaultProps = {
  formData: {},
};

 let ClientesForms = props => {
const {
  uiSchema,
  schema,
  formData,
  onSubmit,
  type,
  permisos,
  level
} = props;   
return (
  <Form
    schema={schema}
    uiSchema={uiSchema}
    formData={formData}
    onSubmit={onSubmit}
    showErrorList={false}>
              <div>
            <Button   type="submit"  bsStyle="primary">
                {"Guardar "}
                <Glyphicon glyph="floppy-save"/>
              </Button>
                </div>
    </Form>
  );
 };


// ClientesForms = Form({
// form: 'clientesForms'     // a unique identifier for this form
// })(ClientesForms);

export default ClientesForms;
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {MonthView} from 'react-date-picker'
import 'react-date-picker/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import {
  Button, Checkbox,
  Glyphicon,
  Row, Col, Grid,
  Input, FormControl, Label
} from 'react-bootstrap';
import moment from 'moment';
export const fields = ['id',
  'nombre_tarea',
  'meta_id',
  'deadline_tarea',
  'done_tarea',
  'estado_tarea',
  'id_responsable_tarea'];

class TareaForm extends Component {


  render() {
    const {
      fields: {
        id,
        nombre_tarea,
        meta_id,
        deadline_tarea,
        done_tarea,
        estado_tarea,
        id_responsable_tarea
      },
      handleSubmit,
      metas,
      areas,
      usuarios
    } = this.props;
    // debugger
    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col md={6}>
              <Input
                type="text"
                name="nombre_tarea"
                label="Nombre tarea"
                {...nombre_tarea}/>
              <label>Responsable</label>
              <FormControl
                componentClass="select"
                placeholder="select"
                {...id_responsable_tarea}>
                <option value="">
                  Seleccione un usuario...
                </option>
                {usuarios.map(usuario =>
                  <option
                    value={usuario.id}
                    key={usuario.id}>
                    {usuario.nombre_usuario}
                  </option>)}
              </FormControl>
              <Row>
                <Col md={6}>
                  <label>Meta</label>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    {...meta_id}>
                    <option value="">
                      Seleccione una meta...
                    </option>
                    {metas.map(meta =>
                      <option
                        value={meta.id}
                        key={meta.id}>
                        {meta.nombre_meta}
                      </option>)}
                  </FormControl>
                </Col>
                <Col md={6}>
                  <label>Area</label><br />
                     {areas.map(area =>
                       area.id == meta_id.initialValue ? area.nombre_area : ''
                     )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Checkbox {...estado_tarea}>Realizado</Checkbox>
                     {/*<input type="checkbox" {...estado_tarea}/> Estado*/}
                </Col>
                <Col md={6}>
                  <label>Done </label><br />
                  <h4>
                    <Label
                      bsStyle={done_tarea.initialValue ? 'success' : 'warning'}>
                      {moment(done_tarea.initialValue).format("DD MMMM YYYY")}
                    </Label>
                  </h4>
                </Col>
              </Row>

            </Col>
            <Col md={5} mdOffset={1}>
              <label>Deadline </label><br />
              <MonthView
                defaultDate={deadline_tarea.initialValue}
                forceValidDate
                dateFormat="YYYY-MM-DD"
                {...deadline_tarea}>
              </MonthView>
            </Col>
          </Row>
          <Row>
            <Col md={5}>

            </Col>
            <Col md={5}>

            </Col>
          </Row>

          <Row><Button
            type="submit"
            bsStyle="primary">
            Guardar <Glyphicon glyph="floppy-save"/>
          </Button>
          </Row>
        </Grid>
      </form>
    );
  }
}

TareaForm.reduxForm = {
  fields: PropTypes.object.isRequired,
  areas: PropTypes.array.isRequired,
  metas: PropTypes.array.isRequired,
  usuarios: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'tareaform',
  fields
})(TareaForm);

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {MonthView} from 'react-date-picker'
import 'react-date-picker/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import {
  Button,
  Glyphicon,
  ProgressBar,
  Row, Col, Grid,
  Input, FormControl, Label
} from 'react-bootstrap';
import moment from 'moment';
export const fields = [
  'id',
  'nombre_meta',
  'avance_meta',
  'deadline_meta',
  'id_responsable_meta',
  'area_id',
  'done_meta'];

class MetaForm extends Component {


  render() {
    const {
      fields: {
        id,
        nombre_meta,
        avance_meta,
        deadline_meta,
        id_responsable_meta,
        area_id,
        done_meta
      },
      handleSubmit,
      areas,
      usuarios
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col md={6}>
              <Input
                type="text"
                name="nombre_meta"
                label="Nombre meta"
                {...nombre_meta}/>
              <label>Responsable</label>
              <FormControl
                componentClass="select"
                placeholder="select"
                {...id_responsable_meta}>
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
              <label>Area</label>
              <FormControl
                componentClass="select"
                placeholder="select"
                {...area_id}>
                <option value="">
                  Seleccione un area...
                </option>
                {areas.map(area =>
                  <option
                    value={area.id}
                    key={area.id}>
                    {area.nombre_area}
                  </option>)}
              </FormControl>
              <Row>
                <Col md={6}>
                  <Input
                    type="text"
                    name="avance_meta"
                    label="Avance"
                    {...avance_meta}/>
                </Col>
                <Col md={6}>
                  <label>Done </label><br />
                  <h4>
                    <Label
                      bsStyle={done_meta.initialValue ? 'success' : 'warning'}>
                      {moment(done_meta.initialValue).format("DD MMMM YYYY")}
                    </Label>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <ProgressBar
                    now={Number(avance_meta.initialValue)}
                    label={`${avance_meta.initialValue}%`}/>
                </Col>
              </Row>
            </Col>
            <Col md={5} mdOffset={1}>
              <label>Deadline </label><br />
              <MonthView
                defaultDate={deadline_meta.initialValue}
                forceValidDate
                dateFormat="YYYY-MM-DD"
                {...deadline_meta}>
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

MetaForm.reduxForm = {
  fields: PropTypes.object.isRequired,
  areas: PropTypes.array.isRequired,
  usuarios: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'metaform',
  fields
})(MetaForm);

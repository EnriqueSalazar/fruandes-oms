import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {MultiMonthView} from 'react-date-picker'
import 'react-date-picker/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import {
  Button,
  Glyphicon,
  ProgressBar,
  Row, Col, Grid,
  FormControl, Label,
  FormGroup, ControlLabel, Modal
} from 'react-bootstrap';
import moment from 'moment';

let  MetaForm = props => {
  const {
    handleSubmit,
    areas,
    usuarios,
    type,
    selectedAreaId,
    permisos,
    level,
    allPermisos,
    initialValues,
    metaModalId,
    metaModalStart,
    metaModalStop,
    metaAfterSave
  } = props;
  if (!initialValues) {
    return null;
  }
  let usuariosFiltered = usuarios.filter(usuario => allPermisos.find(permiso => permiso.area_id == selectedAreaId && permiso.usuario_id == usuario.id));
  const dateModalFormater = () => {
    let formattedMoment = '';
    if (initialValues.deadline_meta) {
      let momentFromCell = moment.utc(initialValues.deadline_meta, "YYYY-MM-DDTHH:mm:ssZ");
      formattedMoment = momentFromCell.format('DMMMYY');
    }
    if (initialValues.id) {
      return (
        <div>
          {formattedMoment ? formattedMoment + " " : " "}
          <Button
            disabled={!(level == "666")}
            bsSize="xsmall"
            onClick={() => {
              metaModalStart(initialValues.id);
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(metaModalId == initialValues.id)}
            onHide={() => {
              metaModalStop();
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    initialValues.deadline_meta = dateMoment.format("YYYY-MM-DDTHH:mm:ss");
                    metaAfterSave(initialValues);
                    metaModalStop();
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  metaModalStop();
                }}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Row className="show-grid">
          <Col md={8}>
            <ControlLabel>
              {type == 1 ? 'Nombre Meta' : 'Nombre Hito'}
            </ControlLabel>
            <Field
              className="form-control"
              type="text"
              name="nombre_meta"
              component="input"
            />
          </Col>
          <Col md={3}>
            <ControlLabel>
              Deadline
            </ControlLabel>
            {dateModalFormater()}
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={8}>
            <ControlLabel>
              Responsable
            </ControlLabel>
            <Field
              className="form-control"
              component="select"
              placeholder="select"
              name="id_responsable_meta"
            >
              <option value="">
                Seleccione un usuario...
              </option>
              {usuariosFiltered.map(usuario =>
                <option
                  value={usuario.id}
                  key={usuario.id}>
                  {usuario.nombre_usuario}
                </option>)}
            </Field>
          </Col>
          <Col md={3}>
            <ControlLabel>
              {"Done"}
            </ControlLabel>
            <br />
            <Label
              bsStyle={initialValues.done_meta ? 'success' : 'danger'}>
              {initialValues.done_meta ? moment(initialValues.done_meta).format("DD MMMM YYYY") : "No realizado"}
            </Label>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={8}>
            <ControlLabel>
              {type == 1 ? 'Area' : 'Proyecto'}
            </ControlLabel>
            <Field
              className="form-control"
              component="select"
              placeholder="select"
              name="area_id"
            >
              <option value="">
                Seleccione...
              </option>
              {areas.filter(area => permisos.find(permiso => permiso.area_id == area.id) || level == "666").map(area =>
                <option
                  value={area.id}
                  key={area.id}>
                  {area.nombre_area}
                </option>)}
            </Field>
          </Col>
          <Col md={3}>

            <ControlLabel>
              Avance
            </ControlLabel>
            <Field
              className="form-control"
              type="text"
              name="avance_meta"
              component="input"
            /> <ProgressBar
            now={Number(initialValues.avance_meta)}
            label={`${initialValues.avance_meta}%`}/>
          </Col>
        </Row>
        <Row>
          <Button
            type="submit"
            disabled={!(level == "666" || level == "333")}
            bsStyle="primary">
            Guardar
            <Glyphicon glyph="floppy-save"/>
          </Button>
        </Row>
      </Grid>
    </form>
  );
};


MetaForm.reduxForm = {
  areas: PropTypes.array.isRequired,
  usuarios: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func
};

MetaForm = reduxForm({
  form: 'metaForm',
  enableReinitialize: true
})(MetaForm);

export default MetaForm;

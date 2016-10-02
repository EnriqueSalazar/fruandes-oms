import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {MultiMonthView} from 'react-date-picker';
import 'react-date-picker/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Button, Checkbox,
  Glyphicon,
  Row, Col, Grid,
  FormGroup, ControlLabel, FormControl, Modal, Label
} from 'react-bootstrap';
import moment from 'moment';

let TareaForm = props => {
  const {
    handleSubmit,
    metas,
    areas,
    usuarios,
    type,
    permisos,
    isAdmin,
    allPermisos,
    selectedAreaId,
    localUserId,
    initialValues,
    tareaModalId,
    tareaModalStart,
    tareaModalStop,
    tareaAfterSave,
    isRecurrenteValue,
    tareaChangeStatus
  } = props;
  // let showStartAtModal = false;
  // let showDeadlineModal = false;
  if (!initialValues) {
    return null;
  }
  let usuariosFiltered = usuarios.filter(usuario => allPermisos.find(permiso => permiso.area_id == selectedAreaId && permiso.usuario_id == usuario.id));
  // let newMeta = metas.find(meta => meta.id == initialValues.meta_id);
  // let newArea = newMeta ? areas.find(area => area.id == newMeta.area_id) : false;
  // let newAreaName = newArea ? newArea.nombre_area : '';
// console.info("showStartAtModal",showStartAtModal,"showDeadlineModal",showDeadlineModal);
  console.info('Got to step 3');

  const DeadlineModalFormatter = () => {
    let formattedMoment = '';
    if (initialValues.deadline_tarea) {
      let momentFromCell = moment.utc(initialValues.deadline_tarea, "YYYY-MM-DDTHH:mm:ssZ");
      formattedMoment = momentFromCell.format('DMMMYY');
    }
    if (initialValues.id) {
      return (
        <div>
          {formattedMoment ? formattedMoment + " " : " "}
          <Button
            bsSize="xsmall"
            disabled={(isRecurrenteValue || initialValues.is_recurrente)}
            onClick={() => {
              tareaModalStart(1);
              {/*showDeadlineModal = true;*/
              }
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(tareaModalId == 1)}
            onHide={() => {
              tareaModalStop();
              {/*showDeadlineModal = false;*/
              }
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    initialValues.deadline_tarea = dateMoment.format("YYYY-MM-DDTHH:mm:ss");
                    tareaAfterSave(initialValues);
                    tareaModalStop();
                    {/*showDeadlineModal = false;*/
                    }
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  tareaModalStop();
                }}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };
  const StartAtModalFormatter = () => {
    // debugger
    let formattedMoment = '';
    if (initialValues.startAt) {
      let momentFromCell = moment.utc(initialValues.startAt, "YYYY-MM-DDTHH:mm:ssZ");
      formattedMoment = momentFromCell.format('DMMMYY');
    }
    if (initialValues.id) {
      return (
        <div>
          {formattedMoment ? formattedMoment + " " : " "}
          <Button
            bsSize="xsmall"
            disabled={(!isRecurrenteValue || !initialValues.is_recurrente)}
            onClick={() => {
              tareaModalStart(2);
              {/*showStartAtModal = true;*/
              }
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(tareaModalId == 2)}
            onHide={() => {
              tareaModalStop();
              {/*showStartAtModal = false;*/
              }
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    debugger
                    initialValues.startAt = dateMoment.format("YYYY-MM-DDTHH:mm:ss");
                    tareaAfterSave(initialValues);
                    tareaModalStop();
                    {/*showStartAtModal = false;*/
                    }
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  tareaModalStop();
                }}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };
  let isDisabled = !(initialValues.deadline_tarea && initialValues.id_responsable_tarea && initialValues.id_responsable_tarea == localUserId);
  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <FormGroup>
          <Row className="show-grid">
            <Col md={8}>
              <ControlLabel>
                Nombre tarea
              </ControlLabel>
              <Field
                className="form-control"
                type="text"
                name="nombre_tarea"
                component="input"
              />
            </Col>
            <Col md={3}>
              <ControlLabel>
                Deadline
              </ControlLabel>
              <DeadlineModalFormatter/>
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
                name="id_responsable_tarea"
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
                {isRecurrenteValue ? "Reportar como realizado" : "Estado actual"}
              </ControlLabel>
              <br />
              {initialValues.estado_tarea ?
                ( <Button
                  className="check"
                  onClick={() => {
                    tareaChangeStatus(initialValues);
                  }}
                  disabled={isDisabled}
                >
                  {"Realizado "}
                  <Glyphicon glyph="check"/>
                </Button>) :
                (<Button
                  className="unchecked"
                  onClick={() => {
                    tareaChangeStatus(initialValues);
                  }}
                  disabled={isDisabled}
                >
                  {isRecurrenteValue ? "Reportar " : "No realizado "}
                  <Glyphicon glyph={isRecurrenteValue ? "repeat" : "unchecked"}/>
                </Button>)

              }
              <br />
              {initialValues.done_tarea ? moment(initialValues.done_tarea).format("DD MMMM YYYY") : ""}

            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={8}>
              <ControlLabel>
                {type == 1 ? 'Meta' : 'Hito'}
              </ControlLabel>
              <Field
                className="form-control"
                component="select"
                placeholder="select"
                name="meta_id"
              >
                <option value="">
                  Seleccione...
                </option>
                {metas.filter(meta => permisos.find(permiso => permiso.area_id == meta.area_id) || isAdmin).map(meta =>
                  <option
                    value={meta.id}
                    key={meta.id}>
                    {meta.nombre_meta}
                  </option>)}
              </Field>
            </Col>
            <Col md={3}>
              <br />
              <ControlLabel>
                Inicio recurrencia
              </ControlLabel>
              <StartAtModalFormatter/>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={8}>
              <ControlLabel>
                {'Periodicidad'}
              </ControlLabel>
              <Field
                className="form-control"
                component="select"
                placeholder="select"
                name="periodo"
                disabled={!isRecurrenteValue}
              >
                <option value="">
                  Seleccione...
                </option>
                <option
                  value="7"
                  key="7"
                >
                  Semanal
                </option>
                <option
                  value="30"
                  key="30"
                >
                  Mensual
                </option>
                <option
                  value="90"
                  key="90"
                >Trimestral
                </option>
                <option
                  value="180"
                  key="180"
                >
                  Semestral
                </option>
                )}
              </Field>
            </Col>
            <Col md={3}>
              <br />
              <Field
                name="is_recurrente"
                id="is_recurrente"
                component="input"
                type="checkbox"
              />
              {" Es recurrente"}

            </Col>
          </Row>
          <br />
          <Row className="show-grid">
            <Field
              disabled={initialValues.id_responsable_tarea != localUserId}
              name="is_notificaciones"
              id="is_notificaciones"
              component="input"
              type="checkbox"
            />
            {" Recibir notificaciones"}
          </Row>
          <Row className="show-grid">
            <br />
            <Button
              type="submit"
              bsStyle="primary">
              {"Guardar "}
              <Glyphicon glyph="floppy-save"/>
            </Button>
          </Row>
        </FormGroup>
      </Grid>
    </form>
  )
    ;
};

TareaForm.reduxForm = {
  areas: PropTypes.array.isRequired,
  metas: PropTypes.array.isRequired,
  usuarios: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func
};

TareaForm = reduxForm({
  form: 'tareaForm',
  enableReinitialize: true
})(TareaForm);

const selector = formValueSelector('tareaForm') // <-- same as form name
TareaForm = connect(
  state => {
    const isRecurrenteValue = selector(state, 'is_recurrente')
    // const { firstName, lastName } = selector(state, 'firstName', 'lastName')
    return {
      isRecurrenteValue,
      // fullName: `${firstName || ''} ${lastName || ''}`
    }
  }
)(TareaForm)

export default TareaForm;

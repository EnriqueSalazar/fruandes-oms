/**
 * Created by enriq on 5/07/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  loadLog,
} from '../actions/logActions';
import moment from 'moment';
import {Grid, Glyphicon, Panel, Col, Row, ControlLabel, Button, FormGroup, FormControl} from 'react-bootstrap';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';

class Log extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadLog();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateLog) {
      this.props.loadLog();
    }
  }


  render() {
    const title = (
      <h3>Log</h3>
    );
    // body
    //   :
    //   "{"nombre_area":"dewdwedw","type":1}"
    // createdAt
    //   :
    //   "2016-08-30T01:19:52.000Z"
    // id
    //   :
    //   1
    // task
    //   :
    //   "Crear Area"
    // updatedAt
    //   :
    //   "2016-08-30T01:19:52.000Z"
    // usuario_id
    //   :
    //   5
    // usuarios_table
    //   :
    //   Object
    // id
    //   :
    //   5
    // nombre_usuario
    //   :
    //   "Enrique Salazar"
    const bodyFormatter = (cell, row) => {
      return (<div>
        <pre>{cell}</pre>
      </div>);
    };
    const dateFormatter = (cell, row) => {
      if (cell) {
        return (
          <div>
            {moment(cell, "YYYY-MM-DDTHH:mm:ssZ").format('DMMMYY HH:mm')}
          </div>
        );
      }
    };
    let logData = this.props.log;

    logData.map((log) => {
      if (log.usuarios_table && log.usuarios_table.nombre_usuario) {
        log.nombre_usuario = log.usuarios_table.nombre_usuario;
      }
    });

    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Panel header={title} bsStyle="primary" eventKey="3">
              <BootstrapTable
                data={logData}
                striped
                hover
                pagination
                search
                clearSearch
                options={{
                  defaultSortName: "id",
                  sortOrder: "desc",
                  sizePerPage: 5,
                  sizePerPageList: [5, 10, 20, 50]
                }}
              >
                <TableHeaderColumn
                  dataField="id"
                  isKey
                  dataAlign="center"
                  hidden
                >
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="task"
                  headerAlign='center'
                  width="70"
                >
                  <h3><Glyphicon glyph="tag"/></h3>
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="body"
                  dataFormat={bodyFormatter}
                  headerAlign='center'
                >
                  JSON
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="createdAt"
                  dataFormat={dateFormatter}
                  dataAlign="right"
                  editable={false}
                  headerAlign='center'
                  width="70"
                >
                  <h3><Glyphicon glyph="time"/></h3>
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="nombre_usuario"
                  headerAlign='center'
                  width="70"
                >
                  <h3><Glyphicon glyph="user"/></h3>
                </TableHeaderColumn>
              </BootstrapTable>
            </Panel>
          </Col>
        </Row>

      </Grid>

    );

  }
}

Log.propTypes = {
  isAddingLog: PropTypes.bool.isRequired,
  shouldUpdateLog: PropTypes.bool.isRequired,
  log: PropTypes.array.isRequired,
  authLog: PropTypes.number.isRequired,
  loadLog: PropTypes.func,
  destroyLog: PropTypes.func,
  createLog: PropTypes.func,
  updateLog: PropTypes.func,
  stopAddingLog: PropTypes.func,
  startAddingLog: PropTypes.func,
  loginLog: PropTypes.func,
  logoutLog: PropTypes.func,
};

function mapStateToProps(state) {
  const {logReducer} = state;
  const {
    log,
    shouldUpdateLog,
  } = logReducer;
  return {
    log,
    shouldUpdateLog,
  };
}

export default connect(mapStateToProps, {
  loadLog,
})(Log);

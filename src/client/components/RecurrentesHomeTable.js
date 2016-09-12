import React from 'react';
import {
  Button,
  Glyphicon,
  Table
} from 'react-bootstrap';
import 'react-date-picker/index.css'

const RecurrentesHomeTable = ({
  recurrentes,
  recurrenteDone
}) => {
  var trStyle = {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgb(221, 221, 221)'

};
  if (!recurrentes || recurrentes.length <= 0) return null;
  return (
    <Table striped bordered condensed hover responsive>
      {recurrentes.map((recurrente) => {
        return (
          <tr className="show-grid" >
            <td width="10%"/>
            <td style={trStyle}>{recurrente.nombre_recurrente}</td>
            <td width="10%">
              <Button
                className="unchecked"
                onClick={() => {
                  recurrenteDone(recurrente)
                }}
                bsSize="xsmall"
              >
                <Glyphicon glyph="unchecked"/>
              </Button>
            </td>
            <td width="10%"/>
          </tr>
        );
      })}
    </Table>
  );
};

RecurrentesHomeTable.propTypes = {
  recurrentes: React.PropTypes.array.isRequired,
  recurrenteDone: React.PropTypes.func.isRequired,
};

export default RecurrentesHomeTable;

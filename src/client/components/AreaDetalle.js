import React from 'react';
import {Button, Glyphicon, FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';

const AreaDetalle = ({
  areas,
  selectedAreaId
}) => {


  const handleNombreChange = (e) => {
    // console.error('this selected area', this.selectedArea)
    debugger
    selectedArea.nombre_area= e.target.value;
    // debugger
    console.error('selected area', e.target.value)
  };

  console.error('AreaDetalle');
  let area = areas.filter(area => area.id == selectedAreaId);
  var selectedArea = {};
  if (area && area[0]) {
    selectedArea = area[0];
  }


  return (
    <form>
      <FormGroup
        controlId="areaForm"
      >
        <ControlLabel>Nombre del area</ControlLabel>
        <FormControl
          type="text"
          value={selectedArea.nombre_area}
          placeholder="Escriba el nombre"
          onChange={handleNombreChange}
        />
      </FormGroup>
    </form>
  );
};

AreaDetalle.propTypes = {
  areas: React.PropTypes.array.isRequired,
  selectedAreaId: React.PropTypes.number
};

export default AreaDetalle;

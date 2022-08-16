import React from 'react';
import {Button, Glyphicon, FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';

const ClientesDetalle = ({
  clientes,
  selectedClientesId
}) => {


  const handleNombreChange = (e) => {
    // console.error('this selected clientes', this.selectedClientes)
    debugger
    selectedClientes.nombre_clientes= e.target.value;
    // debugger
    console.error('selected clientes', e.target.value)
  };

  console.error('ClientesDetalle');
  let clientes = clientes.filter(clientes => clientes.id == selectedClientesId);
  var selectedClientes = {};
  if (clientes && clientes[0]) {
    selectedClientes = clientes[0];
  }


  return (
    <form>
      <FormGroup
        controlId="clientesForm"-*/
      >
        <ControlLabel>Nombre del clientes</ControlLabel>
        <FormControl
          type="text"
          value={selectedClientes.nombre_clientes}
          placeholder="Escriba el nombre"
          onChange={handleNombreChange}
        />
      </FormGroup>
    </form>
  );
};

ClientesDetalle.propTypes = {
  clientes: React.PropTypes.array.isRequired,
  selectedClientesId: React.PropTypes.number
};

export default ClientesDetalle;

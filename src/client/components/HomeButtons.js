import React, {Component, PropTypes} from 'react';
import {
  Button,
} from 'react-bootstrap';

const HomeButtons = ({
  areas,
  type,
  bsStyle
}) => {
  return (
    <div>
      <h3><center>{(type==1)?'Areas':'Proyectos'}</center></h3>
      {areas.map((area, i) => {
          if (area.type == type) {
            return (
              <Button
                key={i}
                bsStyle={bsStyle}
                block
                style={{whiteSpace: 'normal'}}
                href={"/taskspage/"+type+"/"+area.id+"/0/0"}>
                <small>
                  {area.nombre_area}
                </small>
              </Button>)
          }
        }
      )}
    </div>
  );
}

HomeButtons.propTypes = {
  areas: React.PropTypes.array.isRequired,
  areaDetail: React.PropTypes.func.isRequired,
  type: React.PropTypes.number.isRequired,
};

export default HomeButtons;

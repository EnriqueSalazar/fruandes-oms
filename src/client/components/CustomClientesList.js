import React from 'react';
import {Grid, 
        Col, 
        Row, 
        Panel, 
        Well, 
        Breadcrumb, 
        Button, 
        Collapse, 
        Buttom, 
        Glyphicon, 
        ListGroupItem, 
        ListGroup, 
        FieldArray} from 'react-bootstrap';
import StreamListGroupItem from 'Components/CustomListGroupItem';




let CustomClientesList = (props) => (
  const {
    user,
    description,
    link,
    customList
  }; return (

      <Panel header='' bsStyle=''>
        <ListGroup fill>
          {this.state.customList.map((customList, index) => {
            return (
              <CustomListGroupItem
                user={unavailableStream.user}
                description={unavailableStream.description}
                link={unavailableStream.link}
                key={index}
              />
            )
          })}
        </ListGroup>
      </Panel>  

    );
  }
}

export default CustomClientesList;
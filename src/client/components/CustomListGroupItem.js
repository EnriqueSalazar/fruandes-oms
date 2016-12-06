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



let CustomListGroupItem =(props)  => {
  const {
    user,
    link,
    level
} = props;
  return (
    <ListGroupItem>
      <Grid>
        <Row>
          <Col xs={6} md={6}>{user}</Col>
          <Col xs={6} md={6}></Col>
        </Row>
      </Grid>
    </ListGroupItem>
  )
}

export default CustomListGroupItem;
  


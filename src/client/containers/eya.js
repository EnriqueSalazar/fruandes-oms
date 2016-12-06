import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Col, Row, Well, Breadcrumb, Jumbotron} from 'react-bootstrap';
import moment from 'moment';


class eya extends Component {

  constructor(props) {
    super(props);
    this.state = {elapsed: moment()};
    this.tick = this.tick.bind(this);

  }

  componentDidMount() {
    console.error('componentDidMount');
    this.timer = setInterval(this.tick, 50);
  }


  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    let now = moment()
    this.setState({elapsed:now});
    // debugger
  }


  render() {
    // var elapsed = Math.round(this.state.elapsed / 100);

    // This will give a number with one digit after the decimal dot (xx.x):
    // var seconds = (elapsed / 10).toFixed(1);

    // Although we return an entire <p> element, react will smartly update
    // only the changed parts, which contain the seconds variable.
    // debugger
    let target= moment().year(2016).month(7).date(12).hour(8).minute(15).second(0).millisecond(0)
    let delta = target.diff(this.state.elapsed)

    return (

      <Grid>
        <Row>
          <Col md={12}>
            <Jumbotron>
              <h1> {moment(delta).format('D')} DIAS</h1>
              <h2>{moment(delta).format('HH:mm:ss')}</h2>
              <p>PARA VER A LA PRINCESS!!!</p>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>


    );
  }

}


export default connect()(eya);

import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactChipInput from 'react-chip-input';

export default class App extends Component {
  state = {
    chips: []
  };
  addChip = value => {
    const chips = this.state.chips.slice();
    chips.push(value);
    this.setState({ chips });
  };
  removeChip = index => {
    const chips = this.state.chips.slice();
    chips.splice(index, 1);
    this.setState({ chips });
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="mt-3">
            <ReactChipInput
              classes="ml-3 mb-1"
              chips={this.state.chips}
              onSubmit={value => this.addChip(value)}
              onRemove={index => this.removeChip(index)}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

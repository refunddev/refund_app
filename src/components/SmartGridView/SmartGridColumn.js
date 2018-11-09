import React, { Component } from 'react';

export default class SmartGridColumn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.value);
    return this.props.value;
  }
}

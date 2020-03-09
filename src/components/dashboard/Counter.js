import React from 'react';
import styled from 'react-emotion';
import type from '../../types/Dashboard';
import {Theme} from '../../types/Styling';
import Number from './Number';

export type CounterProps = {
  total: number,
  label: string,
  theme: Theme,
  color: string,
};

const CounterContainer = styled.div`
  width: 400px;
`;

const Label = styled.div`
  text-transform: uppercase;
  font-size: 27px;
`;

export class Counter extends React.Component<CounterProps> {
  props: CounterProps;

  render() {
    return (
      <CounterContainer theme={this.props.theme} className="Counter">
        <Label>{this.props.label}</Label>
        <Number color={this.props.color} fontSize={100} number={this.props.total} />
      </CounterContainer>
    );
  }
}

export default Counter;

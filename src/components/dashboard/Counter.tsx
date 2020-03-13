import React from 'react';
import styled from '@emotion/styled';
import {Theme} from '../../types/styling';
import Number from './Number';

export type CounterProps = {
  total: number;
  label: string;
  theme: Theme;
  color: string;
};

const CounterContainer = styled.div`
  margin: 0 60px 0 0;

  &:last-child {
    margin-right: 0;
  }
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

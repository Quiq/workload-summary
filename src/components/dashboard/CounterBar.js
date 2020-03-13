import React from 'react';
import styled from '@emotion/styled';
import {green, yellow} from '../../styling/Colors';
import {Theme} from '../../types/Styling';

export type CounterBarProps = {
  item1: number,
  item2: number,
  theme: Theme,
};

const CounterBarContainer = styled.div`
  height: 45px;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
`;

const Item1 = styled.div`
  width: ${props => props.width}%;
  height: 45px;
  background: ${green};
  transition: width 2s;
`;

const Item2 = styled.div`
  width: ${props => props.width}%;
  height: 45px;
  background: ${yellow};
  transition: width 2s;
`;

export class CounterBar extends React.Component<CounterBarProps> {
  props: CounterBarProps;

  render() {
    const percentage = this.props.item1 <= 0 ? 0 : this.props.item2 / this.props.item1;

    return (
      <CounterBarContainer theme={this.props.theme} className="CounterBar">
        <Item1 width={(1 - percentage) * 100} />
        <Item2 width={percentage * 100} />
      </CounterBarContainer>
    );
  }
}

export default CounterBar;

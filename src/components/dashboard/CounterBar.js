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
    let totalCount = this.props.item1 + this.props.item2;
    let percentage1 = 0;
    let percentage2 = 0;

    if (totalCount > 0) {
      percentage1 = this.props.item1 / totalCount;
      percentage2 = 1 - percentage1;
    } else if (this.props.item1 >= this.props.item2) {
      percentage1 = 1;
      percentage2 = 0;
    } else {
      percentage1 = 0;
      percentage2 = 1;
    }

    return (
      <CounterBarContainer theme={this.props.theme} className="CounterBar">
        <Item1 width={percentage1 * 100} />
        <Item2 width={percentage2 * 100} />
      </CounterBarContainer>
    );
  }
}

export default CounterBar;

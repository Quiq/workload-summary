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
  width: 830px;
  height: 45px;
  display: flex;
`;

const Item1 = styled.div`
  /* min-width: ${props => props.width}%; */
  width: ${props => props.width}%;
  /* max-width: ${props => props.width}%; */
  height: 45px;
  background: ${green};
  transition: width 2s;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

const Item2 = styled.div`
  /* min-width: ${props => props.width}%; */
  width: ${props => props.width}%;
  /* max-width: ${props => props.width}%; */
  height: 45px;
  background: ${yellow};
  transition: width 2s;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
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

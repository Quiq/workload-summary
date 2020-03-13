import React from 'react';
import styled from '@emotion/styled';
import {css} from 'emotion';
import {green, yellow, red} from '../../styling/colors';
import {QueueSummary} from '../../types/dashboard';
import {Theme} from '../../types/styling';
import fecha from 'fecha';
import Number from './Number';

export type CardProps = {
  theme: Theme;
  queueSummary: QueueSummary;
};

const CardContainer = styled.div<{theme: Theme}>`
  width: 260px;
  height: 320px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 6px;
  background: ${props => props.theme.section};
  box-shadow: ${props => props.theme.shadow};
`;

const Header = styled.div`
  text-transform: uppercase;
  font-size: 27px;
`;

const Row = styled.div`
  display: flex;
  margin: 12px 0;
`;

const NumberStyle = (color: string) => css`
  font-size: 50px;
  font-weight: 200;
  margin-right: 10px;
  color: ${color};
  flex: 0 0 40%;
  text-align: center;
`;

const Label = styled.div<{theme: Theme}>`
  color: ${props => props.theme.cardText};
  flex: 0 0 60%;
  font-weight: 200;
  font-size: 27px;
  align-self: center;
  line-height: 1.1;
`;

export class Card extends React.Component<CardProps> {
  props: CardProps;

  render() {
    let {queue, totalItems, waitingItems, estimatedWaitTime} = this.props.queueSummary;

    if (typeof estimatedWaitTime !== 'number') {
      estimatedWaitTime = 0;
    }

    return (
      <CardContainer theme={this.props.theme} className="Card">
        <Header>{queue}</Header>
        <Row>
          <Number
            className={NumberStyle(waitingItems > 40 ? red : waitingItems > 20 ? yellow : green)}
            number={waitingItems}
          />
          <Label theme={this.props.theme}>in queue</Label>
        </Row>
        <Row>
          <div
            className={NumberStyle(
              estimatedWaitTime > 120000 ? red : estimatedWaitTime > 60000 ? yellow : green,
            )}
          >
            {fecha.format(estimatedWaitTime, 'm:ss')}
          </div>
          <Label theme={this.props.theme}>average wait time</Label>
        </Row>
        <Row>
          <Number className={NumberStyle(green)} number={totalItems} />
          <Label theme={this.props.theme}>total</Label>
        </Row>
      </CardContainer>
    );
  }
}

export default Card;

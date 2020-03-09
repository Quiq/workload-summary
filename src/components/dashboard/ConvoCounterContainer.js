import React from 'react';
import styled from 'react-emotion';
import Counter from './Counter';
import type {WorkloadSummary as WorkloadSummaryType} from '../../types/Dashboard';
import {Theme} from '../../types/Styling';
import get from 'lodash/get';
import last from 'lodash/last';
import CounterBar from './CounterBar';
import {green, yellow} from '../../styling/Colors';

export type ConvoCounterContainerProps = {
  workloadSummary: Array<WorkloadSummaryType>,
  theme: Theme,
};

const ConvoCounterContainerContainer = styled.div``;

const CounterContainer = styled.div`
  display: flex;
`;

export class ConvoCounterContainer extends React.Component<ConvoCounterContainerProps> {
  props: ConvoCounterContainerProps;

  render() {
    const totalConvos = get(last(this.props.workloadSummary), 'totalItems', 0);
    const totalInQueue = get(last(this.props.workloadSummary), 'waitingItems', 0);

    return (
      <ConvoCounterContainerContainer className="ConvoCounterContainer">
        <CounterContainer>
          <Counter
            color={green}
            theme={this.props.theme}
            total={totalConvos}
            label="Current Conversations"
          />
          <Counter
            color={totalInQueue > 50 ? yellow : green}
            theme={this.props.theme}
            total={totalInQueue}
            label="In Queue"
          />
        </CounterContainer>
        <CounterBar
          theme={this.props.theme}
          item1={Math.max(0, totalConvos - totalInQueue)}
          item2={Math.max(totalInQueue, 0)}
        />
      </ConvoCounterContainerContainer>
    );
  }
}

export default ConvoCounterContainer;

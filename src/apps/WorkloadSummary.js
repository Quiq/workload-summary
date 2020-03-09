// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import connect from '../mockData';
import ConvoCounterContainer from '../components/dashboard/ConvoCounterContainer';
import Card from '../components/dashboard/Card';
import type {WorkloadSummary as WorkloadSummaryType} from '../types';
import {themes} from '../styling/Themes';
import last from 'lodash/last';
import AgentsContainer from '../components/dashboard/AgentsContainer';
import ThemeSwitcher from '../components/dashboard/ThemeSwitcher';
import QueueWaitingWarning from '../components/dashboard/QueueWaitingWarning';

export type WorkloadSummaryProps = {};

const WorkloadSummaryContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px;
  font-family: 'Source Sans Pro', Roboto, Lato, tahoma !important;
  letter-spacing: 0.025rem;

  div * {
    font-family: 'Source Sans Pro', Roboto, Lato, tahoma !important;
  }
`;

const CardContainer = styled.div`
  display: flex;
`;

const QueuesContainer = styled.div`
  margin-top: 25px;
`;

const LHS = styled.div`
  display: block;
  position: relative;
`;

const Header = styled.div`
  text-transform: uppercase;
  margin-bottom: 15px;
  font-size: 27px;
`;

type WorkloadSummaryState = {
  workloadSummary: Array<WorkloadSummaryType>,
  theme: string,
};

export class WorkloadSummary extends React.Component<WorkloadSummaryProps, WorkloadSummaryState> {
  props: WorkloadSummaryProps;
  state: WorkloadSummaryState = {
    workloadSummary: [],
    theme: 'dark',
  };

  componentDidMount() {
    connect((data: any) => {
      const summary = [...this.state.workloadSummary];
      summary.push(...data.map(d => d.data));
      if (summary.length > 60) summary.shift();
      this.setState({workloadSummary: summary});
    });
  }

  render() {
    const theme = themes[this.state.theme];

    if (!this.state.workloadSummary.length) return null;
    const lastSummary = last(this.state.workloadSummary);
    const totalFolksWaitingMoreThanFiveMinutesInQueue = lastSummary.queueSummaries
      .flatMap(q => q.itemsExceedingFiveMinutes)
      .reduce((a, b) => a + b, 0);

    return (
      <WorkloadSummaryContainer theme={theme} className="WorkloadSummary">
        <LHS>
          <ConvoCounterContainer theme={theme} workloadSummary={this.state.workloadSummary} />
          <QueuesContainer>
            <Header>Queues</Header>
            <CardContainer>
              {lastSummary.queueSummaries.map(s => (
                <Card key={s.queue} queueSummary={s} theme={theme} />
              ))}
            </CardContainer>
          </QueuesContainer>
          {
            <QueueWaitingWarning
              theme={theme}
              total={totalFolksWaitingMoreThanFiveMinutesInQueue}
            />
          }
        </LHS>
        <AgentsContainer theme={theme} agentsSummary={lastSummary.agentsSummary} />
        <ThemeSwitcher
          active={this.state.theme === 'light'}
          onChange={light => this.setState({theme: light ? 'light' : 'dark'})}
        />
      </WorkloadSummaryContainer>
    );
  }
}

export default WorkloadSummary;

import * as React from 'react';
import styled from '@emotion/styled';
import connect from '../datasource/connect';
import ConvoCounterContainer from '../components/dashboard/ConvoCounterContainer';
import Card from '../components/dashboard/Card';
import {WorkloadSummary as WorkloadSummaryType} from '../types/dashboard';
import {Theme} from '../types/styling';
import {themes} from '../styling/themes';
import AgentsContainer from '../components/dashboard/AgentsContainer';
import ThemeSwitcher from '../components/dashboard/ThemeSwitcher';
import QueueWaitingWarning from '../components/dashboard/QueueWaitingWarning';

export type WorkloadSummaryProps = {};

const AppContainer = styled.div<{theme: Theme}>`
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${props => props.theme.background};
  color: ${props => props.theme.textColor};
  width: calc(100% - 24px * 2);
  min-height: calc(100vh - 24px * 2);
  padding: 24px;
  font-family: 'Source Sans Pro', Roboto, Lato, tahoma !important;
  letter-spacing: 0.025rem;
`;

const WorkloadSummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0 96px 0;

  div * {
    font-family: 'Source Sans Pro', Roboto, Lato, tahoma !important;
  }
`;

const CardContainer = styled.div<{cardCount: number}>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 24px;

  ${props =>
    props.cardCount >= 3 &&
    `@media (min-width: 1300px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  `};

  ${props =>
    props.cardCount >= 4 &&
    `@media (min-width: 1650px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  `};

  ${props =>
    props.cardCount >= 5 &&
    `@media (min-width: 2000px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  `};

  ${props =>
    props.cardCount >= 6 &&
    `@media (min-width: 2350px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  `};
`;

const QueuesContainer = styled.div`
  margin-top: 24px;
`;

const LHS = styled.div`
  display: block;
  margin: 0 24px 0 0;
`;

const Header = styled.div`
  text-transform: uppercase;
  margin-bottom: 15px;
  font-size: 27px;
`;

type WorkloadSummaryState = {
  workloadSummary: WorkloadSummaryType | null;
  theme: string;
};

export class WorkloadSummary extends React.Component<WorkloadSummaryProps, WorkloadSummaryState> {
  props: WorkloadSummaryProps = {};
  state: WorkloadSummaryState = {
    workloadSummary: null,
    theme: 'dark',
  };

  componentDidMount() {
    connect((data: any) => {
      this.setState({workloadSummary: data});
    });
  }

  render() {
    const theme = themes[this.state.theme];

    if (!this.state.workloadSummary)
      return (
        <AppContainer theme={theme}>
          <h1>Workload Summary Data Unavailable</h1>
        </AppContainer>
      );

    const queueSummaries = this.state.workloadSummary.queueSummaries;
    const agentsSummary = this.state.workloadSummary.agentsSummary;

    const totalFolksWaitingMoreThanFiveMinutesInQueue = queueSummaries
      // @ts-ignore
      .flatMap(q => q.itemsExceedingFiveMinutes)
      .reduce((a, b) => a + b, 0);

    return (
      <AppContainer theme={theme}>
        <WorkloadSummaryContainer className="WorkloadSummary">
          <LHS>
            <ConvoCounterContainer theme={theme} workloadSummary={this.state.workloadSummary} />
            <QueuesContainer>
              <Header>Queues</Header>
              <CardContainer cardCount={queueSummaries.length}>
                {queueSummaries.map(s => (
                  <Card key={s.queue} queueSummary={s} theme={theme} />
                ))}
              </CardContainer>
            </QueuesContainer>
          </LHS>
          <AgentsContainer theme={theme} agentsSummary={agentsSummary} />
        </WorkloadSummaryContainer>
        {<QueueWaitingWarning theme={theme} total={totalFolksWaitingMoreThanFiveMinutesInQueue} />}
        <ThemeSwitcher
          active={this.state.theme === 'light'}
          onChange={light => this.setState({theme: light ? 'light' : 'dark'})}
        />
      </AppContainer>
    );
  }
}

export default WorkloadSummary;

import React from 'react';
import styled from '@emotion/styled';
import {AgentsSummary} from '../../types/dashboard';
import {Theme} from '../../types/styling';
import {green, yellow, blue, red} from '../../styling/colors';
import {user} from '../../styling/icons';
import Icon from '../atoms/Icon';

export type AgentsContainerProps = {
  agentsSummary: AgentsSummary;
  theme: Theme;
};

const AgentsContainerContainer = styled.div<{theme: Theme}>`
  height: 590px;
  width: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 6px;
  background: ${props => props.theme.section};
  box-shadow: ${props => props.theme.shadow};
  justify-content: space-between;
`;

const Agents = styled.div<{agentCount: number}>`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  margin: 0 0 48px 0;

  ${props =>
    props.agentCount > 110 &&
    `
      margin-bottom: 24px;
    `}

  ${props =>
    props.agentCount > 185 &&
    `
      margin-bottom: 12px;
    `}
`;

const Header = styled.div<{agentCount: number}>`
  text-transform: uppercase;
  font-size: 24px;
  flex: none;

  ${props =>
    props.agentCount > 185 &&
    `
      font-size: 16px;
    `}
`;

const Number = styled.div<{agentCount: number; color: string}>`
  display: flex;
  flex: 1 auto;
  justify-content: center;
  align-items: center;
  font-size: 96px;
  font-weight: 200;
  color: ${props => props.color};

  ${props =>
    props.agentCount > 110 &&
    `
      font-size: 72px;
    `}

  ${props =>
    props.agentCount > 185 &&
    `
      font-size: 48px;
    `}
`;

const AgentList = styled.div``;

const Agent = styled(Icon)`
  margin-right: 5px;
`;

export class AgentsContainer extends React.Component<AgentsContainerProps> {
  props: AgentsContainerProps;

  render() {
    const {available, unavailable, availableForExisting} = this.props.agentsSummary;
    const agentCount = available.length + unavailable.length + availableForExisting.length;

    return (
      <AgentsContainerContainer theme={this.props.theme} className="AgentsContainer">
        <Agents agentCount={agentCount}>
          <Header agentCount={agentCount}>Available Agents</Header>
          <Number color={green} agentCount={agentCount}>
            {available.length}
          </Number>
        </Agents>
        <Agents agentCount={agentCount}>
          <Header agentCount={agentCount}>Total Agents</Header>
          <Number color={blue} agentCount={agentCount}>
            {agentCount}
          </Number>
        </Agents>
        <AgentList>
          {available.map(a => (
            <Agent title={a} key={a} color={green} icon={user} />
          ))}
          {availableForExisting.map(a => (
            <Agent title={a} key={a} color={yellow} icon={user} />
          ))}
          {unavailable.map(a => (
            <Agent title={a} key={a} color={red} icon={user} />
          ))}
        </AgentList>
      </AgentsContainerContainer>
    );
  }
}

export default AgentsContainer;

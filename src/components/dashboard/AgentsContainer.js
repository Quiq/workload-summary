import React from 'react';
import styled from '@emotion/styled';
import type {WorkloadSummary as AgentsSummary} from '../../types/Dashboard';
import {Theme} from '../../types/Styling';
import {green, yellow, blue, red} from '../../styling/Colors';
import {user} from '../../styling/Icons';
import Icon from '../atoms/Icon';

export type AgentsContainerProps = {
  agentsSummary: AgentsSummary,
  theme: Theme,
};

const AgentsContainerContainer = styled.div`
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

const Agents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  margin: 0 0 48px 0;
`;

const Header = styled.div`
  text-transform: uppercase;
  font-size: 24px;
  flex: none;
`;

const Number = styled.div`
  display: flex;
  flex: 1 auto;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: 200;
  color: ${props => props.color};
`;

const AgentList = styled.div``;

const Agent = styled(Icon)`
  margin-right: 5px;
`;

export class AgentsContainer extends React.Component<AgentsContainerProps> {
  props: AgentsContainerProps;

  render() {
    const {available, unavailable, availableForExisting} = this.props.agentsSummary;

    return (
      <AgentsContainerContainer theme={this.props.theme} className="AgentsContainer">
        <Agents>
          <Header>Available Agents</Header>
          <Number color={green}>{available.length}</Number>
        </Agents>
        <Agents>
          <Header>Total Agents</Header>
          <Number color={blue}>
            {available.length + unavailable.length + availableForExisting.length}
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

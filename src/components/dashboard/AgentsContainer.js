import React from 'react';
import styled from 'react-emotion';
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
  height: 635px;
  width: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 6px;
  background: ${props => props.theme.section};
  box-shadow: ${props => props.theme.shadow};
  justify-content: space-between;
`;

const Header = styled.div`
  text-transform: uppercase;
  font-size: 25px;
`;

const Number = styled.div`
  font-size: 100px;
  font-weight: 200;
  color: ${props => props.color};
  flex: 0 0 40%;
  text-align: center;
`;

const Agents = styled.div`
  display: flex;
  flex-direction: column;
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

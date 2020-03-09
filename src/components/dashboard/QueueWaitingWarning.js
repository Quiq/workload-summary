// @flow
import React from 'react';
import type from '../../types/Dashboard';
import {Theme} from '../../types/Styling';
import styled from 'react-emotion';
import {red} from '../../styling/Colors';
import {exclamationCircle} from '../../styling/Icons';
import Icon from '../atoms/Icon';

export type QueueWaitingWarningProps = {
  total: number,
  theme: Theme,
};

type QueueWaitingWarningState = {
  forceShow?: boolean,
};

const QueueWaitingWarningContainer = styled.div`
  position: absolute;
  bottom: -85px;
  height: 60px;
  width: calc(100% + 300px);
  background: ${props => props.theme.section};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 6px;
  display: ${props => (props.total >= 5 ? 'flex' : 'none')};
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  font-size: 40px;
  margin-left: 10px;
`;

const Text = styled.span`
  margin-left: 10px;
  font-size: 30px;
`;

export class QueueWaitingWarning extends React.Component<
  QueueWaitingWarningProps,
  QueueWaitingWarningState,
> {
  props: QueueWaitingWarningProps;
  state: QueueWaitingWarningState = {
    forceShow: undefined,
  };
  listener: any;

  componentDidMount() {
    // @fow
    this.listener = document.addEventListener('keydown', (k: any) => {
      if (k.keyCode === 220) {
        this.setState({forceShow: !this.state.forceShow});
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.listener);
  }

  render() {
    const total =
      this.state.forceShow === true
        ? Math.max(5, this.props.total)
        : this.state.forceShow === false
        ? 0
        : this.props.total;

    return (
      <QueueWaitingWarningContainer
        theme={this.props.theme}
        total={total}
        className="QueueWaitingWarning"
      >
        <StyledIcon icon={exclamationCircle} color={red} />
        <Text>{total} conversations in queue exceed 10 minutes</Text>
      </QueueWaitingWarningContainer>
    );
  }
}

export default QueueWaitingWarning;

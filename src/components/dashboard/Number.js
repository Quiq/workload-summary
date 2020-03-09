import React from 'react';
import styled from 'react-emotion';
import CountUp from 'react-countup';

export type NumberProps = {
  color: string,
  number: number,
  fontSize: number,
  className?: string,
};

type NumberState = {
  prevNumber: 0,
};

const NumberStyle = styled(CountUp)`
  font-size: ${props => props.fontSize}px;
  font-weight: 200;
  color: ${props => props.color};
`;

export class Number extends React.Component<NumberProps> {
  props: NumberProps;
  state: NumberState;

  constructor(props: NumberProps) {
    super(props);
    this.state = {
      prevNumber: props.number || 0,
    };
  }

  componentWillReceiveProps(nextProps: NumberProps) {
    if (nextProps.number !== this.props.number) this.setState({prevNumber: this.props.number});
  }

  render() {
    return (
      <NumberStyle
        className={this.props.className}
        fontSize={this.props.fontSize}
        color={this.props.color}
        separator=","
        start={this.state.prevNumber}
        end={this.props.number}
        duration={59}
        useEasing={false}
      />
    );
  }
}

export default Number;

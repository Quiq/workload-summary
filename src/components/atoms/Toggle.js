import * as React from 'react';
import styled from '@emotion/styled';
import * as colors from '../../styling/Colors';

export type ToggleProps = {
  active: boolean,
  disabled?: boolean,
  width: number,
  height: number,
};

const getSwitchWidth = (toggleHeight: number, clicked = false) =>
  clicked ? toggleHeight - 2 : toggleHeight - 4;

const getSwitchLeftPosition = ({toggleWidth, toggleHeight, active, clicked = false}) =>
  active ? toggleWidth - 3 - getSwitchWidth(toggleHeight, clicked) : 1;

const Background = styled.div`
  box-sizing: border-box;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background: ${props => (props.active ? colors.green : colors.secondaryText)};
  border: 1px solid ${props => (props.active ? colors.greens[7] : '#707070')};
  border-radius: 22px;
  position: relative;
  transition: 0.15s ease-in-out all;
  opacity: ${props => (props.disabled ? 0.65 : 1)};

  &:active .switch {
    width: ${props => getSwitchWidth(props.height, true)}px;
    left: ${props =>
      getSwitchLeftPosition({
        toggleWidth: props.width,
        toggleHeight: props.height,
        active: props.active,
        clicked: true,
      })}px;
  }
`;

const Switch = styled.div`
  position: absolute;
  top: 1px;
  left: ${({toggleWidth, toggleHeight, active}) =>
    getSwitchLeftPosition({toggleWidth, toggleHeight, active, clicked: false})}px;
  width: ${props => getSwitchWidth(props.toggleHeight)}px;
  height: ${props => getSwitchWidth(props.toggleHeight)}px;
  border-radius: ${props => getSwitchWidth(props.toggleHeight)}px;
  background: ${colors.lightNeutrals[0]};
  transition: 0.15s ease-in-out all;
`;

export const Toggle = ({active, disabled, width, height}: ToggleProps) => (
  <Background active={active} disabled={disabled} width={width} height={height}>
    <Switch active={active} className="switch" toggleWidth={width} toggleHeight={height} />
  </Background>
);

Toggle.defaultProps = {
  height: 22,
  width: 36,
};

export default Toggle;

import React from 'react';
import styled from '@emotion/styled';
import ToggleSetting from '../atoms/ToggleSetting';

export type ThemeSwitcherProps = {active: boolean, onChange: (value: boolean) => void};

const ThemeSwitcherContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 0;
`;

export class ThemeSwitcher extends React.Component<ThemeSwitcherProps> {
  props: ThemeSwitcherProps;

  render() {
    return (
      <ThemeSwitcherContainer className="ThemeSwitcher">
        <ToggleSetting
          label={`Turn the lights ${this.props.active ? 'off' : 'on'}`}
          active={this.props.active}
          onChange={this.props.onChange}
        />
      </ThemeSwitcherContainer>
    );
  }
}

export default ThemeSwitcher;

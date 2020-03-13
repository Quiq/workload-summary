import * as React from 'react';
import styled from '@emotion/styled';
import {css} from 'emotion';
import Toggle from './Toggle';
import {Label, Flex} from '../../styling/layout';

export type ToggleSettingProps = {
  label: string;
  active: boolean;
  name?: string;
  className?: string;
  labelStyle?: boolean;
  toggleSize?: boolean;
  toggleOnRight?: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

const ToggleSettingRoot = styled.div<{toggleOnRight: boolean}>`
  display: flex;
  flex-direction: ${props => (props.toggleOnRight ? 'row-reverse' : 'row')};
`;

const ToggleActiveArea = styled(Flex)`
  flex: 0 0 auto;
`;

const ToggleLabel = styled.div<{overrides: boolean}>`
  flex: 1 1 auto;
  vertical-align: top;

  & label {
    color: inherit;
    ${props => props.overrides};
  }
`;

export const ToggleSetting = (props: ToggleSettingProps) => (
  <ToggleSettingRoot
    className={`ToggleSetting ${props.className || ''}`}
    toggleOnRight={props.toggleOnRight || false}
  >
    <ToggleActiveArea
      onClick={() => !props.disabled && props.onChange(!props.active)}
      aria-labelledby={props.name ? `${props.name}-toggle-label` : undefined}
      data-testid="activeArea"
      role="checkbox"
      height="24px"
      marginRight={1}
      alignItems="center"
    >
      <Toggle active={props.active} disabled={props.disabled} {...props.toggleSize} />
    </ToggleActiveArea>
    <ToggleLabel overrides={props.labelStyle} data-testid="label">
      <div
        className={css`
          display: flex;
        `}
      >
        <Label
          id={props.name ? `${props.name}-toggle-label` : undefined}
          fontSize={2}
          lineHeight={1.5}
        >
          {props.label}
        </Label>
      </div>
    </ToggleLabel>
  </ToggleSettingRoot>
);

export default ToggleSetting;

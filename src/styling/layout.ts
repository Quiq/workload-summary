import styled from '@emotion/styled';
import {space, layout, color, border, flexbox, position, shadow, typography} from 'styled-system';

export const Box = styled('div')(space, layout, border, color, flexbox, position, shadow);

export const Flex = styled(Box)`
  display: flex;
`;

export const Absolute = styled(Box)`
  position: 'absolute';
`;

export const Text = styled('div')(typography, color, space, layout);

export const Label = Text.withComponent('label');

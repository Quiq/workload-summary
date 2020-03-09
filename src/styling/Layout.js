import React from 'react';
import styled from 'react-emotion';
import {space, layout, color, border, flexbox, position, shadow, typography} from 'styled-system';

export const Box = styled.div`
  ${space}
  ${layout}
  ${border}
  ${color}
  ${flexbox}
  ${position}
  ${shadow}
`;

export const Flex = styled(Box)`
  display: flex;
`;

export const Absolute = styled(Box)`
  position: 'absolute';
`;

// Shamelessly copied from https://styled-system.com/guides/spacing
const classnames = (...args) => args.join(' ');
const getClassName = el => (el.props && el.props.className) || '';

const StyledChildren = ({className, children, ...props}) => {
  const styledChildren = React.Children.toArray(children).map(child =>
    React.cloneElement(child, {
      className: classnames(getClassName(child), className),
    }),
  );
  return <>{styledChildren}</>;
};

export const SpaceChildrenWithReactStuff = styled(StyledChildren)(space);

export const SpaceChildren = styled.div`
  & > * {
    ${space}
  }
`;

export const Spacer = styled.div`
  ${space}
`;

export const Text = styled.div`
  ${typography}
  ${color}
  ${space}
  ${layout}
`;

export const Label = Text.withComponent('label');

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {circle as circleIcon} from '../../styling/Icons';

export type IconProps = {
  // Native Props - https://github.com/FortAwesome/react-fontawesome#features
  icon?: any,
  border?: boolean,
  className?: string,
  mask?: Array<any> | Object | string,
  fixedWidth?: boolean,
  flip?: 'horizontal' | 'vertical' | 'both',
  pull?: 'left' | 'right',
  pulse?: boolean,
  name?: string,
  rotation?: 90 | 180 | 270,
  listItem?: boolean,
  size?: 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x',
  spin?: boolean,
  symbol?: boolean | string,
  transform?: string | Object,
  color?: string,

  // Our props
  title?: string,
  onClick?: (e: React.MouseEvent) => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
  style?: Object,
  circle?: boolean,
  css?: string,
};

/**
 * This component is an attempt to get the font-awesome specific stuff isolated
 * since we'll probably want to get our own icons at some point
 */
const Icon = (props: IconProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const parseProps = () => {
    const filteredProps = {};
    // We whitelist props and filter any extra props here since in some places
    // we pass extra props for Emotion.  Some of these props, like "Active" are actually
    // used other places in FontAwesomeIcon and throw errors when we override them
    Object.keys(props).forEach(k => {
      if (
        [
          'icon',
          'border',
          'className',
          'color',
          'mask',
          'fixedWidth',
          'flip',
          'pull',
          'pulse',
          'name',
          'rotation',
          'listItem',
          'size',
          'spin',
          'symbol',
          'transform',
        ].includes(k)
      ) {
        filteredProps[k] = props[k];
      }
    });

    return filteredProps;
  };

  if (props.circle) {
    // The 0.5em is a hack for an issue I reported to FontAwesome.
    // Layered SVGs with a different size prop on the layered elements
    // doesn't align the elements properly.
    const style = {...props.style, fontSize: '0.5em'};

    return (
      <span
        className={`Icon fa-layers fa-fw ${props.className || ''} ${
          props.size ? `fa-${props.size}` : 'fa-2x'
        }`}
        title={props.title}
        onClick={handleClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        style={props.style}
      >
        {
          // @ts-ignore
          <FontAwesomeIcon icon={circleIcon} color={props.color} />
        }
        {
          // @ts-ignore
          <FontAwesomeIcon {...parseProps()} color="white" style={style} />
        }
      </span>
    );
  }

  return (
    <span
      style={props.style}
      className={`Icon ${props.className || ''}`}
      title={props.title}
      onClick={handleClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {
        //@ts-ignore
        <FontAwesomeIcon {...parseProps()} />
      }
    </span>
  );
};

export default Icon;

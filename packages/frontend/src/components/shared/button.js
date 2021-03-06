import React from 'react';
import types from 'prop-types';
import { css, cx } from '@emotion/css';
import useTheme from './use_theme';
import { getThemeStyles } from '../../theme';
import Typography from '../typography';

const styles = {
  button: css`
    width: 100%;
    padding: 10px 0;
    border: solid 1px #979797;
    background: #d8d8d8;
    border-radius: 4px;
    font-size: 21px;
    line-height: 30px;
    letter-spacing: 2px;
  `
};

const Button = (props) => {
  const theme = useTheme();
  const { children } = props;

  return (
    <button {...{
      ...props,
      className: cx(
        'cv-button',
        styles.button,
        getThemeStyles(theme, 'button', props),
        props.className
      )
    }}>
      <Typography>
        {children}
      </Typography>
    </button>
  );
};

Button.propTypes = {
  className: types.string,
  children: types.node
};

export default Button;

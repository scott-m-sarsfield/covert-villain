import React from 'react';
import types from 'prop-types';
import { css, cx } from '@emotion/css';
import Typography from '../typography';

const styles = {
  instructions: css`
    padding: 0;
    font-size: 21px;
    line-height: 40px;
    text-align: center;
`,
  details: css`
    padding: 0;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
`
};

const Instructions = ({ className, children }) => (
  <h3 className={cx(styles.instructions, className)} >
    <Typography>
      {children}
    </Typography>
  </h3>
);
Instructions.propTypes = {
  className: types.string,
  children: types.node
};

export const Details = ({ className, children }) => (
  <h4 className={cx(styles.details, className)}>
    <Typography>
      {children}
    </Typography>
  </h4>
);
Details.propTypes = {
  className: types.string,
  children: types.node
};

export default Instructions;

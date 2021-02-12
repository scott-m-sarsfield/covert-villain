import React from 'react';
import types from 'prop-types';
import { cx, css, keyframes } from '@emotion/css';
import { useSelector } from 'react-redux';

const upAndDown = keyframes`
  from {
    transform: translateY(0);
  }
  
  25% {
    transform: translateY(10%);
  }
  
  50% {
    transform: translateY(0);
  }
  
  75% {
    transform: translateY(-10%);
  }

  to {
    transform: translateY(0);
  }
`;

const styles = {
  animated: css`
    display: inline-block;
    position: relative;
    bottom: 15px;
    font-size: 40px;
    line-height: 30px;
    animation: ${upAndDown} 600ms linear infinite;
`,
  dotTwo: css`
    animation-delay: 100ms;
`,
  dotThree: css`
    animation-delay: 200ms;
`,
  wrapper: css`
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0, 0.75);
    border: none;
    outline: none;
    color: #fff;
    box-shadow: rgba(0,0,0,0.5) 0 -2px 4px;
    width: 100%;
    font-size: 21px;
    line-height: 30px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 20px 0;
    height: 70px;
    
    &:disabled {
      opacity: 0.5;
    }
`,
  processing: css`
    &:disabled {
      opacity: 1;
    }
  `
};

const SubmitButton = ({ children, disabled, className }) => {
  const loading = useSelector((state) => state.game.joining || state.game.executingAction);
  return (
    <button disabled={disabled || loading} className={cx(styles.wrapper, { [styles.processing]: loading }, className)}>
      {
        loading ? (
          <React.Fragment>
            <div className={styles.animated}>.</div>
            <div className={cx(styles.animated, styles.dotTwo)}>.</div>
            <div className={cx(styles.animated, styles.dotThree)}>.</div>
          </React.Fragment>
        ) : children
      }
    </button>
  );
};

SubmitButton.propTypes = {
  children: types.node,
  disabled: types.bool,
  className: types.string
};

export default SubmitButton;

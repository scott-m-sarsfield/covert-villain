import React from 'react';
import types from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
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

const Animated = styled.div`
  display: inline-block;
  position: relative;
  bottom: 15px;
  font-size: 40px;
  line-height: 30px;
  animation: ${upAndDown} 0.6s linear infinite;
`;

const DotOne = styled(Animated)`
  animation-delay: 0s;
`;

const DotTwo = styled(Animated)`
  animation-delay: 0.1s;
`;

const DotThree = styled(Animated)`
  animation-delay: 0.2s;
`;

const SubmitButtonWrapper = styled.button`
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
    ${(props) => props.processing && css`
      opacity: 1;
    `}
  }
`;

const SubmitButton = ({ children, disabled, ...otherProps }) => {
  const loading = useSelector((state) => state.game.joining || state.game.executingAction);
  return (
    <SubmitButtonWrapper disabled={disabled || loading} processing={loading} {...otherProps}>
      {
        loading ? (
          <React.Fragment>
            <DotOne>.</DotOne>
            <DotTwo>.</DotTwo>
            <DotThree>.</DotThree>
          </React.Fragment>
        ) : children
      }
    </SubmitButtonWrapper>
  );
};

SubmitButton.propTypes = {
  loading: types.bool,
  children: types.node,
  disabled: types.bool
};

export default styled(SubmitButton)``;

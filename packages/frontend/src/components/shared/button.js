import React from 'react';
import styled from 'styled-components';
import useTheme from './use_theme';
import { addElusiveEmperorStyles } from '../../theme';

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  border: solid 1px #979797;
  background: #d8d8d8;
  border-radius: 4px;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: 2px;
  
  ${addElusiveEmperorStyles('button')}
`;

const WrappedButton = (props) => {
  const theme = useTheme();

  return (
    <Button {...{ ...props, theme }} />
  );
};

export default styled(WrappedButton)``;

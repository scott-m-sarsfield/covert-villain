import styled from 'styled-components';

const SubmitButton = styled.button`
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
  
  &:disabled {
    opacity: 0.5;
  }
`;

export default SubmitButton;

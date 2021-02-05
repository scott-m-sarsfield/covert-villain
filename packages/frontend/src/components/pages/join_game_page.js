import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import types from 'prop-types';
import { joinGame } from '../../store/game_slice';
import SubmitButton from '../shared/submit_button';
import Heading from '../heading';
import { addElusiveEmperorStyles } from '../../theme';
import useTheme from '../shared/use_theme';

const Content = styled.div`
  padding: 60px 30px 0;
`;

const InputRowLabel = styled.span`
  display: block;
  font-size: 16px;
  line-height: 24px;
  margin: 0 15px 5px 0;
`;

const JoinInput = styled.input`
  font-size: 16px;
  padding: 3px 8px;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #979797;
  
  ${addElusiveEmperorStyles('joinInput')}
`;

const JoinInputRow = ({ label, value, onChange, theme }) => (
  <div>
    <InputRowLabel>{label}</InputRowLabel>
    <JoinInput type="text" value={value} placeholder={label} onChange={onChange} theme={theme}/>
  </div>
);

JoinInputRow.propTypes = {
  label: types.string,
  value: types.string,
  onChange: types.func.isRequired,
  theme: types.object
};

const JoinGamePage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const onChangeCode = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    setCode(value);
  };

  const onChangeName = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    setName(value);
  };

  const onJoin = () => {
    dispatch(joinGame({ code, name }));
  };

  return (
    <div>
      <Heading />
      <Content>
        <JoinInputRow {...{
          label: 'Code',
          value: code,
          onChange: onChangeCode,
          theme
        }} />

        <JoinInputRow {...{
          label: 'Name',
          value: name,
          onChange: onChangeName,
          theme
        }} />
      </Content>
      <SubmitButton onClick={onJoin} disabled={!code || !name}>Join</SubmitButton>
    </div>
  );
};

export default JoinGamePage;

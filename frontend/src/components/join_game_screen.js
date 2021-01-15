import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {joinGame} from './game_slice';
import styled from 'styled-components';

const Modalish = styled.div`
  position: absolute;
  width: 400px;
  background: #555;
  color: white;
  border: solid 1px black;
  border-radius: 5px;
  top: 30px;
  left: 0;
  right: 0;
  margin: auto;
  padding: 15px;
`;

const JoinHeading = styled.h2`
  text-transform: uppercase;
  text-align: center;
`;


const JoinButton = styled.button`
  background: yellow;
  border: solid 1px;
  border-radius: 4px;
  padding: 8px 48px;
  font-size: 16px;
  text-transform: uppercase;
  display: block;
  margin: 0 auto;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InputRowLabel = styled.span`
  display: block;
  margin-right: 15px;
  font-size: 16px;
  line-height: 32px;
  text-align: right;
`;

const JoinInput = styled.input`
  width: 70%;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 18px;
`;

const JoinInputRow = ({label, value, onChange}) => (
  <InputRow>
    <InputRowLabel>{label}</InputRowLabel>
    <JoinInput type="text" value={value} onChange={onChange}/>
  </InputRow>
);

const JoinGameScreen = () => {
  const dispatch = useDispatch();
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
  }

  const onJoin = () => {
    dispatch(joinGame({code, name}));
  }

  return (
    <Modalish>
      <JoinHeading>Census</JoinHeading>

      <JoinInputRow {...{
        label: 'code',
        value: code,
        onChange: onChangeCode
      }} />

      <JoinInputRow {...{
        label: 'name',
        value: name,
        onChange: onChangeName
      }} />

      <JoinButton onClick={onJoin}>Join</JoinButton>
    </Modalish>
  )
}

export default JoinGameScreen;

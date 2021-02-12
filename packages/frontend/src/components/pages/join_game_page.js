import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { css, cx } from '@emotion/css';
import types from 'prop-types';
import { joinGame } from '../../store/game_slice';
import SubmitButton from '../shared/submit_button';
import Heading from '../heading';
import { getThemeClass } from '../../theme';
import useTheme from '../shared/use_theme';

const styles = {
  content: css`
    padding: 60px 30px 0;
  `,
  inputRowLabel: css`
    display: block;
    font-size: 16px;
    line-height: 24px;
    margin: 0 15px 5px 0;
  `,
  joinInput: css`
    font-size: 16px;
    padding: 3px 8px;
    margin-bottom: 30px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #979797;
  `,
  joinCodeInput: css`
    text-transform: uppercase;
  `,
  charCount: css`
    text-align: right;
    position: relative;
    top: -25px;
  `
};

const CodeRow = ({ label, value, onChange, theme }) => (
  <div>
    <span className={styles.inputRowLabel}>{label}</span>
    <input {...{
      type: 'text',
      className: cx(styles.joinInput, getThemeClass(theme, 'joinInput'), styles.joinCodeInput),
      value,
      placeholder: label,
      onChange,
      autoCapitalize: 'characters',
      maxLength: 10
    }}/>
    <div className={styles.charCount}>{10 - value.length}</div>
  </div>
);

CodeRow.propTypes = {
  label: types.string,
  value: types.string,
  onChange: types.func.isRequired,
  theme: types.object
};

const NameRow = ({ label, value, onChange, theme }) => (
  <div>
    <span className={styles.inputRowLabel}>{label}</span>
    <input {...{
      type: 'text',
      className: cx(styles.joinInput, getThemeClass(theme, 'joinInput')),
      value,
      placeholder: label,
      onChange,
      maxLength: 15
    }}/>
    <div className={styles.charCount}>{15 - value.length}</div>
  </div>
);

NameRow.propTypes = {
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
      <div className={styles.content}>
        <CodeRow {...{
          label: 'Code',
          value: code,
          onChange: onChangeCode,
          theme
        }} />

        <NameRow {...{
          label: 'Name',
          value: name,
          onChange: onChangeName,
          theme
        }} />
      </div>
      <SubmitButton onClick={onJoin} disabled={!code || !name}>Join</SubmitButton>
    </div>
  );
};

export default JoinGamePage;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { css, cx } from '@emotion/css';
import types from 'prop-types';
import { joinGame } from '../../store/game_slice';
import SubmitButton from '../shared/submit_button';
import useTheme from '../shared/use_theme';

const styles = {
  splashTitle: css`
    text-align: center;
    padding-top: 30px;
    margin-bottom: 60px;
    
    h2 {
      font-family: 'Special Elite', serif;
      margin: 10px 0 0 0;
      padding: 10px 0 0 12px;
      background: black;
      color: white;
      letter-spacing: 0.25em;
      font-size: 48px;
      display: inline-block;
      box-sizing: border-box;
    }
`,
  wrapper: css`
    padding: 0 0 70px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  `,
  content: css`
    padding: 0 30px 70px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    max-width: 800px;
    width: 100%;
  `,
  inputRowLabel: css`
    display: block;
    font-size: 16px;
    line-height: 24px;
    margin: 0 15px 5px 0;
  `,
  joinInput: css`
    font-size: 16px;
    padding: 8px 8px 3px 8px;
    margin-bottom: 30px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #979797;
    line-height: 1.5em;
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

const CodeRow = ({ label, value, onChange }) => (
  <div>
    <span className={styles.inputRowLabel}>{label}</span>
    <input {...{
      type: 'text',
      className: cx(styles.joinInput, styles.joinCodeInput),
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

const NameRow = ({ label, value, onChange }) => (
  <div>
    <span className={styles.inputRowLabel}>{label}</span>
    <input {...{
      type: 'text',
      className: styles.joinInput,
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

const SplashTitle = () => (
  <div className={styles.splashTitle}>
    <h2>Covert</h2>
    <br />
    <h2>Villain</h2>
  </div>
);

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
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <SplashTitle />
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

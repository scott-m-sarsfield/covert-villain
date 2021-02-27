import React from 'react';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../store/game_slice';
import Option from './option';

const styles = {
  overviewWrapper: css`
    padding: 15px 30px;
    text-align:center;
  `,
  gameCode: css`
    font-size: 21px;
    letter-spacing: 2px;
    line-height: 40px;
    margin: 0 0 15px 0;
    padding: 0;
  `
};

const options = [
  {
    label: 'Secret Hitler',
    value: 'secretHitler'
  },
  {
    label: 'Elusive Emperor',
    value: 'elusiveEmperor'
  },
  {
    label: 'Private Pony',
    value: 'privatePony'
  }
];

const SettingsContent = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game.data);

  const onSelect = (value) => {
    dispatch(changeTheme(value));
  };

  return (
    <div className={styles.overviewWrapper}>
      <div className={styles.gameCode}>{game.code}</div>
      {
        options.map(({ label, value }) => (
          <Option key={value} {...{
            label,
            value,
            onSelect: onSelect,
            selected: value === game.theme
          }} />
        ))
      }
    </div>
  );
};

export default SettingsContent;

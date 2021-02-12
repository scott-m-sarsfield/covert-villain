import React from 'react';
import { css, cx } from '@emotion/css';
import types from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toggleOverview } from '../store/game_slice';
import useTheme from './shared/use_theme';
import { getThemeStyles, getThemeText } from '../theme';

const styles = {
  wrapper: css`
    background: #ecc16b;
    box-shadow: rgba(0,0,0,0.5) 0 2px 4px;
    display: flex;
    justify-content: space-between;
`,
  header: css`
    font-size: 21px;
    line-height: 30px;
    color: #392F1F;
    text-transform: uppercase;
    margin: 0 0 0 15px;
    max-width: 1080px;
    padding: 10px 0;
`,
  settingsButton: css`
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    width: 50px;
    height: 50px;
    transition: 0.2s;
    font-size: 18px;
    
    &:hover {
      background: rgba(0,0,0, 0.2);
    }
`
};

const Heading = ({ hasSettings, className }) => {
  const dispatch = useDispatch();
  const overviewOpen = useSelector((state) => state.game.overviewOpen);
  const theme = useTheme();

  return (
    <div {...{ className: cx(styles.wrapper, getThemeStyles(theme, 'heading'), className) }}>
      <h2 className={cx(styles.header, getThemeStyles(theme, 'header'))}>{getThemeText(theme, 'title')}</h2>
      {
        hasSettings ? (
          <button className={styles.settingsButton} onClick={() => dispatch(toggleOverview())}>
            {
              overviewOpen ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faChessRook} />
              )
            }
          </button>
        ) : null
      }
    </div>
  );
};

Heading.propTypes = {
  hasSettings: types.bool,
  className: types.string
};

export default Heading;

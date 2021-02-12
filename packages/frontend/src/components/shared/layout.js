import types from 'prop-types';
import React from 'react';
import { css, cx } from '@emotion/css';
import { useSelector } from 'react-redux';
import Heading from '../heading';
import ScoreHud from '../pages/score_hud';
import OverviewContent from './overview_content';
import SettingsContent from './settings_content';

export const WrappedScoreHud = ScoreHud;

const styles = {
  fullWrapper: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
  `,
  layoutWrapper: css`
    position: relative;
    padding: 30px 15px;
    box-sizing: border-box;
    flex: 1 0 auto;
    
    .cv-button {
      margin-top: 30px;
    }
    
    .cv-score-hud {
      margin: -20px -10px;
    }
  `,
  layoutWrapperWithSubmit: css`
    padding-bottom: 80px;
  `,
  heading: css`
    flex: 0 0 auto;
  `
};

export const Layout = ({ children, withSubmit, ...otherProps }) => {
  const overviewOpen = useSelector((state) => state.game.overviewOpen);
  const settingsOpen = useSelector((state) => state.game.settingsOpen);
  const game = useSelector((state) => state.game.data);
  const user = useSelector((state) => state.game.user);

  const canShowOverview = game.phase !== 'lobby';
  const canShowSettings = game.phase === 'lobby' && game.host === user.uuid;

  let content;

  if (canShowOverview && overviewOpen) {
    content = (<OverviewContent/>);
  } else if (canShowSettings && settingsOpen) {
    content = (<SettingsContent/>);
  } else {
    content = (
      <div {...{ ...otherProps, className: cx(styles.layoutWrapper, { [styles.layoutWrapperWithSubmit]: withSubmit }) }}>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.fullWrapper}>
      <Heading
        hasOverview={canShowOverview}
        hasSettings={canShowSettings}
        className={styles.heading}
      />
      {content}
    </div>
  );
};

Layout.propTypes = {
  children: types.node,
  withSubmit: types.bool
};

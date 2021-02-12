import React from 'react';
import types from 'prop-types';
import { css, cx } from '@emotion/css';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove, faHourglassHalf, faSkull } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../shared/use_theme';
import { getThemeColor } from '../../theme';

const styles = {
  wrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `,
  left: css`
    display: flex;
    flex-direction: column;
  `,
  meterSection: css`
    height: 16px;
    width: 16px;
    border: solid 1px #979797;
    border-radius: 8px;
  `,
  filled: (propColors) => css`
    border-color: ${get(propColors, 'filledBorderColor', '#000')};
    background: ${get(propColors, 'filledBackgroundColor', '#979797')};
  `,
  meterWrapper: css`
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 21px;
    margin-bottom: 5px;
    
    span {
      margin-right: 5px;
    }
    
    .cv-meter-section + .cv-meter-section {
      margin-left: 3px;
    }
  `
};

const MeterSection = ({ className, colors, filled }) => (
  <div className={cx('cv-meter-section', styles.meterSection, { [styles.filled(colors)]: filled }, className)} />
);

MeterSection.propTypes = {
  className: types.string,
  colors: types.object,
  filled: types.bool
};

const Meter = ({ label, total, filled, colors }) => (
  <div className={styles.meterWrapper}>
    <span>{label}</span>
    {
      Array(total).fill(null).map(
        (_, i) => (
          <MeterSection key={i} filled={i < filled} colors={colors} />
        )
      )
    }
  </div>
);

Meter.propTypes = {
  label: types.node.isRequired,
  total: types.number.isRequired,
  filled: types.number,
  colors: types.object
};

Meter.defaultProps = {
  filled: 0
};

const EvilMeter = ({ count, theme }) => (
  <Meter {...{
    label: (
      <FontAwesomeIcon icon={faSkull} />
    ),
    total: 6,
    filled: count,
    colors: {
      filledBorderColor: getThemeColor(theme, 'evilBorder'),
      filledBackgroundColor: getThemeColor(theme, 'evil')
    }
  }} />
);

EvilMeter.propTypes = {
  count: types.number,
  theme: types.object
};

const GoodMeter = ({ count, theme }) => (
  <Meter {...{
    label: <FontAwesomeIcon icon={faDove} />,
    total: 5,
    filled: count,
    colors: {
      filledBorderColor: getThemeColor(theme, 'goodBorder'),
      filledBackgroundColor: getThemeColor(theme, 'good')
    }
  }} />
);
GoodMeter.propTypes = {
  count: types.number,
  theme: types.object
};

const ChaosMeter = ({ count }) => (
  <Meter
    label={<FontAwesomeIcon icon={faHourglassHalf} />}
    total={3}
    filled={count}
  />
);
ChaosMeter.propTypes = {
  count: types.number
};

function getCounts(game) {
  return {
    evilCount: get(game, 'cards.evilParty', []).length,
    goodCount: get(game, 'cards.goodParty', []).length,
    chaosLevel: get(game, 'chaos', 0)
  };
}

const ScoreHud = ({ className }) => {
  const theme = useTheme();
  const { evilCount, goodCount, chaosLevel } = useSelector((state) => getCounts(state.game.data));
  return (
    <div className={cx('cv-score-hud', styles.wrapper, className)}>
      <div className={styles.left}>
        <EvilMeter count={evilCount} theme={theme}/>
        <GoodMeter count={goodCount} theme={theme}/>
      </div>
      <ChaosMeter count={chaosLevel}/>
    </div>
  );
};

ScoreHud.propTypes = {
  className: types.string
};

export default ScoreHud;

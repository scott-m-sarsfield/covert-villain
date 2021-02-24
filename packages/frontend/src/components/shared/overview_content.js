import types from 'prop-types';
import React from 'react';
import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import range from 'lodash/range';
import startCase from 'lodash/startCase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faSkullCrossbones, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import Button from './button';
import { PlayerTable, PlayerRole } from './player_table';
import Instructions from './instructions';
import { leaveGame } from '../../store/game_slice';
import useTheme from './use_theme';
import { getThemeColor, getThemeText } from '../../theme';

const styles = {
  overviewWrapper: css`
    padding: 15px 30px;
    text-align:center;
    
    .cv-button {
      margin-top: 30px;
    }
  `,
  gameCode: css`
    font-size: 21px;
    letter-spacing: 2px;
    line-height: 40px;
    margin: 0 0 15px 0;
    padding: 0;
  `,
  card: ({ colors }) => css`
    height: 48px;
    width: 32px;
    border: 1px solid ${colors.border};
    background: ${colors.background};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 1px;
    opacity: 0.3;
  `,
  cardActive: css`
    opacity: 1;
  `,
  cardRow: css`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    
    .cv-card + .cv-card {
      margin-left: 15px;
    }
  `,
  chaosSegment: ({ active }) => css`
    height: 11px;
    width: 22px;
    border: 1px solid #000;
    background: ${active ? '#979797' : 'transparent'}
  `,
  chaosRow: css`
    display: flex;
    justify-content: center;
    
    .cv-chaos-segment + .cv-chaos-segment {
      margin-left: 20px;
    }
  `,
  playersHeader: css`
    margin-top: 30px;
  `
};

function getVariantColors(theme, variant) {
  if (variant === 'evilParty') {
    return {
      border: getThemeColor(theme, 'evilBorder'),
      background: getThemeColor(theme, 'evil')
    };
  }
  if (variant === 'goodParty') {
    return {
      border: getThemeColor(theme, 'goodBorder'),
      background: getThemeColor(theme, 'good')
    };
  }
}

const Card = ({ variant, children, active }) => {
  const theme = useTheme();
  const colors = getVariantColors(theme, variant);

  return (
    <div {...{
      className: cx('cv-card', styles.card({ colors }), { [styles.cardActive]: active })
    }}>
      {children}
    </div>
  );
};

Card.propTypes = {
  variant: types.string,
  children: types.node,
  active: types.bool
};

const CardRow = ({ children }) => (<div className={styles.cardRow}>{children}</div>);
CardRow.propTypes = {
  children: types.node
};

const ChaosSegment = ({ active }) => (<div className={cx('cv-chaos-segment', styles.chaosSegment({ active }))} />);
ChaosSegment.propTypes = {
  active: types.bool
};

const PlayersHeader = (props) => (<Instructions {...{ ...props, className: cx(styles.playersHeader, props.className) }} />);
PlayersHeader.propTypes = {
  className: types.string
};

const actionIcons = {
  policy_peek: faEye,
  execution: faSkullCrossbones,
  investigate_loyalty: faSearch,
  special_election: faVoteYea
};

function rulesURL() {
  window.open('https://www.secrethitler.com/assets/Secret_Hitler_Rules.pdf');
}

const OverviewContent = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game.data);
  const theme = useTheme();
  return (
    <div className={styles.overviewWrapper}>
      <div className={styles.gameCode}>{game.code}</div>
      <CardRow>
        {
          game.evilBoard.map((action, i) => (
            <Card variant="evilParty" key={i} active={!!game.cards.evilParty[i]} title={startCase(action)}>
              {action && <FontAwesomeIcon icon={actionIcons[action]} title={startCase(action)} />}
            </Card>
          ))
        }
      </CardRow>
      <CardRow>
        {
          range(5).map((i) => (
            <Card variant="goodParty" key={i} active={!!game.cards.goodParty[i]}/>
          ))
        }
      </CardRow>
      <div className={styles.chaosRow}>
        {
          range(3).map((i) => (
            <ChaosSegment key={i} active={game.chaos > i}/>
          ))
        }
      </div>
      <PlayersHeader>Players</PlayersHeader>
      <PlayerTable players={game.players} renderRightContent={({ role }) => role && (
        <PlayerRole>{`${getThemeText(theme, role)}`}</PlayerRole>
      )}/>
      <Button onClick={rulesURL}>Rules</Button>
      <Button onClick={() => dispatch(leaveGame())}>Leave Game</Button>
    </div>
  );
};

export default OverviewContent;

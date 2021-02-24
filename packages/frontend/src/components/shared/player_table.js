import React from 'react';
import { css, cx } from '@emotion/css';
import map from 'lodash/map';
import types from 'prop-types';
import { PartyAwareName, Name } from './atoms';
import { getThemeStyles } from '../../theme';
import useTheme from './use_theme';
import Typography from '../typography';

const styles = {
  playerList: css`
    text-indent: 0;
    list-style-type: none;
    margin: 0;
    padding: 0;
`,
  playerWrapper: css`
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    border-style: solid;
    border-color: #979797;
    border-width: 0 1px 1px 1px;
    background: #fff;
    
    &:first-child {
      border-top-width: 1px;
    }
  `,
  playerNumber: css`
    font-size: 12px;
    line-height: 17px;
    color: #979797;
    width: 60px;
    flex: 0 0 60px;
    text-align: center;
`,
  playerName: css`
    margin-left: 5px;
    font-size: 21px;
    line-height: 30px;
    white-space: nowrap;
`,
  playerRole: css`
    margin-left: 10px;
    font-size: 12px;
    line-height: 17px;
    white-space: nowrap;
`,
  left: css`
    display: flex;
    align-items: center;
    overflow: hidden;
    flex: 1 1 auto;
`,
  right: css`
    margin: 0 5px;
    flex: 0 0 auto;
`,
  vote: css`
    align-self: flex-end;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0 5px;
    width: 40px;
    text-align: center;
`,
  voteApproved: css`
    border-color: #000;
  `,
  voteRejected: css`
    background: #000;
    color: #fff;
`
};

const PlayerList = ({ children }) => (<ul className={styles.playerList}>{children}</ul>);
PlayerList.propTypes = {
  children: types.node
};

const PlayerWrapper = ({ children, theme }) => (<li className={cx(styles.playerWrapper, getThemeStyles(theme, 'player'))}>{children}</li>);
PlayerWrapper.propTypes = {
  children: types.node,
  theme: types.object
};

const PlayerNumber = ({ children }) => (<div className={styles.playerNumber}>{children}</div>);
PlayerNumber.propTypes = {
  children: types.node
};

const PlayerName = ({ children }) => (<div className={styles.playerName}>{children}</div>);
PlayerName.propTypes = {
  children: types.node
};

export const PlayerRole = ({ children }) => (
  <div className={styles.playerRole}>
    <Typography>
      {children}
    </Typography>
  </div>
);
PlayerRole.propTypes = {
  children: types.node
};

export const Vote = ({ children, theme, approved }) => (
  <div {...{
    className: cx(
      styles.vote,
      {
        [styles.voteApproved]: approved,
        [styles.voteRejected]: !approved
      },
      getThemeStyles(theme, 'vote')
    )
  }} >
    <Typography>
      {children}
    </Typography>
  </div>
);
Vote.propTypes = {
  theme: types.object,
  children: types.node,
  approved: types.bool
};

export const Player = ({ uuid, index, ignoreStatus, rightContent }) => {
  const theme = useTheme();
  return (
    <PlayerWrapper theme={theme}>
      <div className={styles.left}>
        <PlayerNumber>
          <Typography>
            {numberLabels[index]}
          </Typography>
        </PlayerNumber>
        <PlayerName>
          {
            ignoreStatus ? (
              <Name uuid={uuid} />
            ) : (
              <PartyAwareName uuid={uuid} />
            )
          }
        </PlayerName>
      </div>
      <div className={styles.right}>
        {rightContent}
      </div>
    </PlayerWrapper>
  );
};

Player.propTypes = {
  uuid: types.string,
  index: types.number,
  ignoreStatus: types.bool,
  rightContent: types.node
};

const numberLabels = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten'
];

export const PlayerTable = ({ players, ignoreStatus, renderRightContent }) => (
  <PlayerList>
    {
      map(players, (player, i) => {
        const { uuid } = player;
        return (
          <Player key={i} {...{
            index: i,
            uuid,
            ignoreStatus,
            rightContent: renderRightContent && renderRightContent(player)
          }}/>
        );
      })
    }
  </PlayerList>
);

PlayerTable.propTypes = {
  players: types.arrayOf(
    types.shape({
      name: types.string.isRequired
    }).isRequired
  ),
  ignoreStatus: types.bool,
  renderRightContent: types.func
};

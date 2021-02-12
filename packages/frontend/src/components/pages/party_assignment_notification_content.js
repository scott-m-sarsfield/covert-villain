import React from 'react';
import types from 'prop-types';
import { css, cx } from '@emotion/css';
import { useSelector } from 'react-redux';
import find from 'lodash/find';
import filter from 'lodash/filter';
import Instructions, { Details } from '../shared/instructions';
import useTheme from '../shared/use_theme';
import { colors } from './score_hud';
import { getThemeText } from '../../theme';

function getPlayer(state) {
  const uuid = state.game.user.uuid;
  return find(state.game.data.players, { uuid });
}

function getEvils(state) {
  const uuid = state.game.user.uuid;
  return filter(state.game.data.players, (player) => player.party === 'evilParty' && player.uuid !== uuid);
}

function getVillainKnowsEvils(state) {
  return state.game.data.players.length < 7;
}

const styles = {
  role: css`
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    text-transform: capitalize;
    margin: 0;
    padding: 0;
`,
  goodRole: css`
    color: ${colors.good}
`,
  evilRole: css`
    color: ${colors.evil}
`,
  evilList: css`
    margin-top: 30px;
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    
    ul {
      list-style-type: none;
      margin: 15px 0 0 0;
      padding: 0;
      
      li {
        margin: 0;
        color: #c84e4e;
      }
    }
`,
  additionalInfo: css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`,
  villainAnnotation: css`
    font-size: smaller;
    line-height: 21px;
    margin-left: 5px;
`
};

const Role = ({ className, role, children }) => (
  <h2 className={cx(
    styles.role,
    {
      [styles.goodRole]: role === 'goodRole',
      [styles.evilRole]: role !== 'goodRole'
    },
    className
  )}>
    {children}
  </h2>
);
Role.propTypes = {
  className: types.string,
  children: types.node,
  role: types.string
};

const EvilList = ({ className, children }) => (<div className={cx(styles.evilList, className)}>{children}</div>);
EvilList.propTypes = {
  className: types.string,
  children: types.node
};

const PartyAssignmentNotificationContent = () => {
  const { role, evils, villainKnowsEvils } = useSelector((state) => ({
    ...getPlayer(state),
    evils: getEvils(state),
    villainKnowsEvils: getVillainKnowsEvils(state)
  }));
  const theme = useTheme();

  return (
    <React.Fragment>
      <Instructions>Your Role:</Instructions>
      <Role role={role}>{getThemeText(theme, role)}</Role>
      <div className={styles.additionalInfo}>
        {
          role === 'evilRole' && (
            <EvilList>
              Your fellow {getThemeText(theme, 'evilRole')}s are:
              <ul>
                {
                  evils.map((player, i) => (
                    <li key={i}>
                      {player.name}
                      <span className={styles.villainAnnotation}>
                        {player.role === 'villain' && `(${getThemeText(theme, 'villain')})`}
                      </span>
                    </li>
                  ))
                }
              </ul>
            </EvilList>
          )
        }
        {
          role === 'villain' && villainKnowsEvils && (
            <EvilList>
            Your fellow {getThemeText(theme, 'evilRole')}s are:
              <ul>
                {
                  evils.map((player, i) => (
                    <li key={i}>
                      {player.name}
                      <span className={styles.villainAnnotation}>
                        {player.role === 'villain' && `(${getThemeText(theme, 'villain')})`}
                      </span>
                    </li>
                  ))
                }
              </ul>
            </EvilList>
          )
        }
        {
          role === 'villain' && !villainKnowsEvils && (
            <Details>Your party members know who you are.</Details>
          )
        }
        {
          role === 'goodRole' && (
            <Details>Enact 5 {getThemeText(theme, 'goodParty')} Policies to Win.</Details>
          )
        }
      </div>

    </React.Fragment>
  );
};

export default PartyAssignmentNotificationContent;

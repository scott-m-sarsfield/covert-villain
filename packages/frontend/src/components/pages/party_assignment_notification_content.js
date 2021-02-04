import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import find from 'lodash/find';
import filter from 'lodash/filter';
import Instructions, { Details } from '../shared/instructions';
import themes from '../../theme';

function getPlayer(state) {
  const uuid = state.game.user.uuid;
  return find(state.game.data.players, { uuid });
}

function getReds(state) {
  const uuid = state.game.user.uuid;
  return filter(state.game.data.players, (player) => player.party === 'redParty' && player.uuid !== uuid);
}

function getVillainKnowsReds(state) {
  return state.game.data.players.length < 7;
}

const Role = styled.h2`
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  text-transform: capitalize;
  margin: 0;
  padding: 0;
  
  ${({ role }) => role === 'blueRole' ? `
      color: #74b5d5;
    ` : `
      color: #c84e4e;
    `}
`;

const RedList = styled.div`
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
`;

const AdditionalInfo = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VillainAnnotation = styled.span`
  font-size: smaller;
  line-height: 21px;
  margin-left: 5px;
`;

const PartyAssignmentNotificationContent = () => {
  const { role, reds, villainKnowsReds } = useSelector((state) => ({
    ...getPlayer(state),
    reds: getReds(state),
    villainKnowsReds: getVillainKnowsReds(state)
  }));
  const currentTheme = useSelector((state) => get(state.theme, 'current')) || 'elusiveEmperor';

  return (
    <React.Fragment>
      <Instructions>You Are</Instructions>
      <Role role={role}>{role}</Role>
      <AdditionalInfo>
        {
          role === 'redRole' && (
            <RedList>
              Your fellow {themes[currentTheme].redRole}s are:
              <ul>
                {
                  reds.map((player, i) => (
                    <li key={i}>
                      {player.name}
                      <VillainAnnotation>{player.role === 'villain' && `(${themes[currentTheme].villain})`}</VillainAnnotation>
                    </li>
                  ))
                }
              </ul>
            </RedList>
          )
        }
        {
          role === 'villain' && villainKnowsReds && (
            <RedList>
            Your fellow {themes[currentTheme].redRole}s are:
              <ul>
                {
                  reds.map((player, i) => (
                    <li key={i}>
                      {player.name}
                      <VillainAnnotation>{player.role === 'villain' && `(${themes[currentTheme].villain})`}</VillainAnnotation>
                    </li>
                  ))
                }
              </ul>
            </RedList>
          )
        }
        {
          role === 'villain' && !villainKnowsReds && (
            <Details>Your party members know who you are.</Details>
          )
        }
        {
          role === 'blueRole' && (
            <Details>Enact 5 {themes[currentTheme].blueParty} Policies to Win.</Details>
          )
        }
      </AdditionalInfo>

    </React.Fragment>
  );
};

export default PartyAssignmentNotificationContent;

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import find from 'lodash/find';
import filter from 'lodash/filter';
import Instructions, { Details } from '../shared/instructions';
import useTheme from '../shared/use_theme';

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

const Role = styled.h2`
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  text-transform: capitalize;
  margin: 0;
  padding: 0;
  
  ${({ role }) => role === 'goodRole' ? `
      color: #74b5d5;
    ` : `
      color: #c84e4e;
    `}
`;

const EvilList = styled.div`
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
  const { role, evils, villainKnowsEvils } = useSelector((state) => ({
    ...getPlayer(state),
    evils: getEvils(state),
    villainKnowsEvils: getVillainKnowsEvils(state)
  }));
  const theme = useTheme();

  return (
    <React.Fragment>
      <Instructions>Your Role:</Instructions>
      <Role role={role}>{theme[role]}</Role>
      <AdditionalInfo>
        {
          role === 'evilRole' && (
            <EvilList>
              Your fellow {theme.evilRole}s are:
              <ul>
                {
                  evils.map((player, i) => (
                    <li key={i}>
                      {player.name}
                      <VillainAnnotation>{player.role === 'villain' && `(${theme.villain})`}</VillainAnnotation>
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
            Your fellow {theme.evilRole}s are:
              <ul>
                {
                  evils.map((player, i) => (
                    <li key={i}>
                      {player.name}
                      <VillainAnnotation>{player.role === 'villain' && `(${theme.villain})`}</VillainAnnotation>
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
            <Details>Enact 5 {theme.goodParty} Policies to Win.</Details>
          )
        }
      </AdditionalInfo>

    </React.Fragment>
  );
};

export default PartyAssignmentNotificationContent;

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import find from 'lodash/find';
import filter from 'lodash/filter';
import Instructions, { Details } from '../shared/instructions';

function getPlayer(state) {
  const uuid = state.game.user.uuid;
  return find(state.game.data.players, { uuid });
}

function getFascists(state) {
  const uuid = state.game.user.uuid;
  return filter(state.game.data.players, (player) => player.party === 'fascist' && player.uuid !== uuid);
}

function getMussoliniKnowsFascists(state) {
  return state.game.data.players.length < 7;
}

const Role = styled.h2`
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  text-transform: capitalize;
  margin: 0;
  padding: 0;
  
  ${({ role }) => role === 'liberal' ? `
      color: #74b5d5;
    ` : `
      color: #c84e4e;
    `}
`;

const FascistList = styled.div`
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

const MussoliniAnnotation = styled.span`
  font-size: smaller;
  line-height: 21px;
  margin-left: 5px;
`;

const PartyAssignmentNotificationContent = () => {
  const { role, fascists, mussoliniKnowsFascists } = useSelector((state) => ({
    ...getPlayer(state),
    fascists: getFascists(state),
    mussoliniKnowsFascists: getMussoliniKnowsFascists(state)
  }));

  return (
    <React.Fragment>
      <Instructions>You Are</Instructions>
      <Role role={role}>{role}</Role>
      <AdditionalInfo>
        {
          role === 'fascist' && (
            <FascistList>
              Your fellow fascists are:
              <ul>
                {
                  fascists.map((player, i) => (
                    <li key={i}>
                      {player.name}
                      <MussoliniAnnotation>{player.role === 'mussolini' && '(mussolini)'}</MussoliniAnnotation>
                    </li>
                  ))
                }
              </ul>
            </FascistList>
          )
        }
        {
          role === 'mussolini' && mussoliniKnowsFascists && (
            <FascistList>
              Your fellow fascists are:
              <ul>
                {
                  fascists.map((player, i) => (
                    <li key={i}>
                      {player.name}
                      <MussoliniAnnotation>{player.role === 'mussolini' && '(mussolini)'}</MussoliniAnnotation>
                    </li>
                  ))
                }
              </ul>
            </FascistList>
          )
        }
        {
          role === 'mussolini' && !mussoliniKnowsFascists && (
            <Details>Your party members know who you are.</Details>
          )
        }
        {
          role === 'liberal' && (
            <Details>Enact 5 Liberal Policies to Win.</Details>
          )
        }
      </AdditionalInfo>

    </React.Fragment>
  );
};

export default PartyAssignmentNotificationContent;

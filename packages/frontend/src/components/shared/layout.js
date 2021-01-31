import types from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import range from 'lodash/range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import Heading from '../heading';
import Button from './button';
import ScoreHud, { colors } from '../pages/score_hud';
import { PlayerTable } from './player_table';
import Instructions from './instructions';
import { leaveGame } from '../../game_slice';

export const WrappedScoreHud = styled(ScoreHud)``;
export const LayoutWrapper = styled.div`
  min-height: calc(100vh - 50px);
  position: relative;
  padding: 30px 15px;
  box-sizing: border-box;
  
  ${({ withSubmit }) => withSubmit && css`
    padding-bottom: 80px;
  `}
  
  ${Button} {
    margin-top: 30px;
  }
  
  ${WrappedScoreHud} {
    margin: -20px -10px;
  }
`;

const OverviewWrapper = styled.div`
  padding: 15px 30px;
  text-align:center;
  
  ${Button} {
    margin-top: 30px;
  }
`;
const GameCode = styled.h3`
  font-size: 21px;
  letter-spacing: 2px;
  line-height: 40px;
  margin: 0 0 15px 0;
  padding: 0;
`;

const Card = styled.div.attrs((props) => {
  if (props.variant === 'fascist') {
    return {
      colors: {
        border: colors.fascistBorder,
        background: colors.fascist
      }
    };
  }
  if (props.variant === 'liberal') {
    return {
      colors: {
        border: colors.liberalBorder,
        background: colors.liberal
      }
    };
  }
})`
  height: 48px;
  width: 32px;
  border: 1px solid ${(props) => props.colors.border};
  background: ${(props) => props.colors.background};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 1px;
  opacity: 0.3;
  
  ${(props) => props.active && css`
    opacity: 1;
  `}
`;

const CardRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  
  ${Card} + ${Card} {
    margin-left: 15px;
  }
`;
const ChaosSegment = styled.div`
  height: 11px;
  width: 22px;
  border: 1px solid ${colors.black};
  background: ${(props) => props.active ? colors.grey : 'transparent'}
`;
const ChaosRow = styled.div`
  display: flex;
  justify-content: center;
  
  ${ChaosSegment} + ${ChaosSegment} {
    margin-left: 20px;
  }
`;
const PlayersHeader = styled(Instructions)`
  margin-top: 30px;
`;

const actionIcons = {
  policy_peek: faEye,
  execution: faSkullCrossbones
};

const OverviewContent = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game.data);
  return (
    <OverviewWrapper>
      <GameCode>{game.code}</GameCode>
      <CardRow>
        {
          game.fascistBoard.map((action, i) => (
            <Card variant="fascist" key={i} active={!!game.cards.fascist[i]}>
              {action && <FontAwesomeIcon icon={actionIcons[action]} />}
            </Card>
          ))
        }
      </CardRow>
      <CardRow>
        {
          range(5).map((i) => (
            <Card variant="liberal" key={i} />
          ))
        }
      </CardRow>
      <ChaosRow>
        {
          range(3).map((i) => (
            <ChaosSegment key={i} active={game.chaos > i}/>
          ))
        }
      </ChaosRow>
      <PlayersHeader>Players</PlayersHeader>
      <PlayerTable players={game.players}/>
      <Button onClick={() => dispatch(leaveGame())}>Leave Game</Button>
    </OverviewWrapper>
  );
};

export const Layout = ({ children, ...otherProps }) => {
  const overviewOpen = useSelector((state) => state.game.overviewOpen);

  return (
    <div>
      <Heading hasSettings />
      {
        overviewOpen ? (
          <OverviewContent />
        ) : (
          <LayoutWrapper {...otherProps}>
            {children}
          </LayoutWrapper>
        )
      }
    </div>
  );
};

Layout.propTypes = {
  children: types.node
};
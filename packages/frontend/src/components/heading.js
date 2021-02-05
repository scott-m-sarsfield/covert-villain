import React from 'react';
import styled from 'styled-components';
import types from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toggleOverview } from '../store/game_slice';
import useTheme from './shared/use_theme';

const Wrapper = styled.div`
  background: #ecc16b;
  box-shadow: rgba(0,0,0,0.5) 0 2px 4px;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h2`
  font-size: 21px;
  line-height: 30px;
  color: #392F1F;
  text-transform: uppercase;
  margin: 0 0 0 15px;
  max-width: 1080px;
  padding: 10px 0;
`;

const SettingsButton = styled.button`
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
`;

const Heading = ({ hasSettings, className }) => {
  const dispatch = useDispatch();
  const overviewOpen = useSelector((state) => state.game.overviewOpen);
  const theme = useTheme();

  return (
    <Wrapper {...{ className }}>
      <Header>{theme.title}</Header>
      {
        hasSettings ? (
          <SettingsButton onClick={() => dispatch(toggleOverview())}>
            {
              overviewOpen ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faChessRook} />
              )
            }
          </SettingsButton>
        ) : null
      }
    </Wrapper>
  );
};

Heading.propTypes = {
  hasSettings: types.bool,
  className: types.string
};

export default Heading;

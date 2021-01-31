import React from 'react';
import styled from 'styled-components';
import types from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleOverview } from '../game_slice';

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
  
  &:hover {
    background: rgba(0,0,0, 0.2);
  }
`;

const Heading = ({ hasSettings }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Header>Covert Mussolini</Header>
      {
        hasSettings ? (
          <SettingsButton onClick={() => dispatch(toggleOverview())}>
            X
          </SettingsButton>
        ) : null
      }
    </Wrapper>
  );
};

Heading.propTypes = {
  hasSettings: types.bool
};

export default Heading;

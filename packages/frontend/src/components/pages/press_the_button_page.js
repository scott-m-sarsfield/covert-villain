import React from 'react';
import styled from 'styled-components';
import filter from 'lodash/filter';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../shared/button';
import { pressButton } from '../../game_slice';
import Instructions from '../shared/instructions';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 0 30px;
  
  ${Instructions} {
    margin: 40px 0 60px 0;
  }
`;

const PressTheButtonPage = () => {
  const dispatch = useDispatch();
  const { user: { uuid }, data: { players, phase: { data }}} = useSelector((state) => state.game);

  const pressed = data[uuid];

  const onPress = () => dispatch(pressButton());

  return (
    <Wrapper>
      {
        pressed ? (
          <React.Fragment>
            <Instructions>Thank you.</Instructions>
            <div>
              Still waiting on:
              <ul>
                {
                  filter(players, ({ uuid }) => !data[uuid]).map(({ name }, i) => (
                    <li key={i}>{name}</li>
                  ))
                }
              </ul>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Instructions>Press the button.</Instructions>
            <Button onClick={onPress}>Press Me!</Button>
          </React.Fragment>
        )
      }
    </Wrapper>
  );
};

export default PressTheButtonPage;

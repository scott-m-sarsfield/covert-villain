import React from 'react';
import styled from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SubmitButton from './submit_button';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const ReduxWrapper = ({ children, state }) => {
  const store = createStore((store) => store, {
    ...state
  });

  return (
    <Provider store={store}>
      <Wrapper>
        {children}
      </Wrapper>
    </Provider>
  );
};

export default ({
  title: 'Shared/Submit Button'
});

export const regular = () => (
  <ReduxWrapper state={{ game: { joining: false }}}>
    <SubmitButton>Submit</SubmitButton>
  </ReduxWrapper>
);

export const loading = () => (
  <ReduxWrapper state={{ game: { joining: true }}}>
    <SubmitButton>Submit</SubmitButton>
  </ReduxWrapper>
);

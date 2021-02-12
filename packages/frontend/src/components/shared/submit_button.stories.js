import React from 'react';
import { css } from '@emotion/css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SubmitButton from './submit_button';

const styles = {
  wrapper: css`
    height: 100vh;
    width: 100%;
  `
};

const ReduxWrapper = ({ children, state }) => {
  const store = createStore((store) => store, {
    ...state
  });

  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        {children}
      </div>
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

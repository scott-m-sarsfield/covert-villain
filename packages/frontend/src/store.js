import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root_reducer';

const store = configureStore({
  reducer: rootReducer
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root_reducer', () => {
    const newRootReducer = require('./root_reducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;

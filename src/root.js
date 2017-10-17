/*
* @Author: zhaozheng1.zh
* @Date:   2017-08-22 06:06:10
 * @Last Modified by: zhaozheng1.zh
 * @Last Modified time: 2017-09-14 09:32:23
*/

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import App from './containers/App';

const store = configureStore();

// run root saga
// store.runSaga(rootSaga);

const Root = () =>
  (<Provider store={store}>
    <App />
  </Provider>);

export default Root;
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

import App from '../App';

const mockStore = configureStore();
const initialState = {
  categories: [],
  stores: [],
  ui: {
    showAll: false,
  },
};

test('should render App component', () => {
  const store = mockStore(initialState)
  const component = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  ).toJSON();
  expect(component).toMatchSnapshot();
});
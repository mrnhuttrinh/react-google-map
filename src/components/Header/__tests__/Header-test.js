import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import { equal } from 'assert';
import { shallow } from 'enzyme';

import Header, { HeaderComponent } from '../Header';

const mockStore = configureStore();

const history = {
  push: jest.fn(),
}

const HeaderWithRouter = withRouter(Header);

const categories = [
  {
    href: "/all-stores/dining",
    id: 0,
    name: "Dining",
    priority: 1,
    shortname: "dining",
  }
];

const initialState = {
  categories: {
    categories: categories,
    stores: [],
  },
  ui: {
    showAll: false,
  },
};

test('should render Header component', () => {

  const store = mockStore(initialState)
  const component = renderer.create(
    <Provider store={store} history={history}>
      <Router>
        <HeaderWithRouter />
      </Router>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
  const instance = component.root;
  equal(instance.children.length, 1);
});

test('should try click category item', () => {
  const actions = {
    updateCategories: jest.fn(),
  };
  const wrapper = shallow(
    <HeaderComponent
      actions={actions}
      categories={categories}
    />
  );
  wrapper.find('NavLink').simulate('click');
  expect(actions.updateCategories).toHaveBeenCalled();
});

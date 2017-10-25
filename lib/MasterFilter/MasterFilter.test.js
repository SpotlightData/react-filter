import React from 'react';

import { shallow } from 'enzyme';
import { MasterFilter } from './';

const defaultProps = {
  filters: { testId: {} },
  onRefilter: () => false,
  components: [[{ Component: props => React.createElement('div', null), id: 'testId' }]],
  classes: {
    root: 'root',
    row: 'row'
  }
};

const wrapper = (props = {}) => {
  const fullProps = Object.assign({}, defaultProps, props);
  return shallow(React.createElement(
    'div',
    null,
    React.createElement(MasterFilter, fullProps)
  ));
};

describe('<MasterFilter />', () => {
  it('should render', () => {
    const component = wrapper();
    expect(component.find('MasterFilter').exists()).toBe(true);
  });

  it('should not break when no components are passed', () => {
    expect(() => {
      wrapper({ components: [] });
    }).not.toThrow();
  });

  it('should render children inside row', () => {
    const components = [[{ Component: props => 'Child1', id: 'testId' }, { Component: props => 'Child2', id: 'testId' }]];
    const component = wrapper({ components }).find('MasterFilter').dive();
    expect(component.find('.row').children().length).toBe(2);
  });

  it('should render rows of children', () => {
    const components = [[{ Component: props => 'Child1', id: 'testId' }], [{ Component: props => 'Child2', id: 'testId' }]];
    const component = wrapper({ components }).find('MasterFilter').dive();
    expect(component.find('.row').length).toBe(2);
  });

  it('should throw if filter is not found', () => {
    expect(() => {
      wrapper({ filters: {} }).find('MasterFilter').dive();
    }).toThrow();
  });
});
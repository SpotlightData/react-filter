/* eslint-disable no-unused-vars */
import React from 'react';

import { shallow, mount } from 'enzyme';
import { equals } from 'ramda';
import { MasterFilter } from './';


const defaultProps = {
  filters: { testId: {} },
  onRefilter: () => false,
  components: [[{ Component: props => <div />, id: 'testId' }]],
  classes: {
    root: 'root',
    row: 'row',
  },
};

class MockFilter extends React.Component {
  componentWillMount() { // eslint-disable-next-line
    this.props.onChange({ text: 'as' });
  }
  render() {
    return <div />;
  }
}

const wrapper = (props = {}) => {
  const fullProps = Object.assign({}, defaultProps, props);
  return shallow(<div><MasterFilter {...fullProps} /></div>);
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
    const components = [[
      { Component: props => 'Child1', id: 'testId' },
      { Component: props => 'Child2', id: 'testId' },
    ]];
    const component = wrapper({ components })
      .find('MasterFilter').dive();
    expect(component.find('.row').children().length).toBe(2);
  });

  it('should render rows of children', () => {
    const components = [
      [{ Component: props => 'Child1', id: 'testId' }],
      [{ Component: props => 'Child2', id: 'testId' }],
    ];
    const component = wrapper({ components })
      .find('MasterFilter').dive();
    expect(component.find('.row').length).toBe(2);
  });

  it('should throw if filter is not found', () => {
    expect(() => {
      wrapper({ filters: {} }).find('MasterFilter').dive();
    }).toThrow();
  });
});

describe('<MasterFilter /> Integration', () => {
  it('should not modify the original object', () => {
    let props;
    expect.assertions(1);

    function check(newFilters) {
      expect(equals(props.filters, newFilters)).toBe(false);
    }

    props = Object.assign(defaultProps, {
      filters: {
        test: {
          state: {
            test: '12',
          },
          functor: () => false,
        },
      },
      onRefilter: check,
      components: [[{ Component: MockFilter, id: 'test' }]],
    });
    const component = mount(<MasterFilter {...props} />);
  });
});

import React from 'react';
import PropTypes from 'prop-types';

import injectSheet from 'react-jss';
import shortid from 'shortid';

import style from './style';

export class MasterFilter extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      children: null
    }, this.mapColumns = filters => filters.map(({ Component, id }) => {
      const filter = this.props.filters[id];
      if (filter === undefined) {
        throw TypeError(`Filter for id: ${id} not found`);
      }
      return React.createElement(Component, {
        key: shortid.generate(),
        onChange: this.updateFilterState(id),
        state: filter.state
      });
    }), this.mapRow = components => components.map(row => React.createElement(
      'div',
      { key: shortid.generate(), className: this.props.classes.row },
      this.mapColumns(row)
    )), this.updateFilterState = id => newState => {
      this.props.filters[id].state = newState;
      this.props.onRefilter(this.props.filters);
    }, _temp;
  }

  componentWillMount() {
    const { components } = this.props;
    this.setState({
      children: this.mapRow(components)
    });
  }

  render() {
    return React.createElement(
      'div',
      { className: this.props.classes.root },
      this.state.children
    );
  }
}

MasterFilter.propTypes = {
  filters: PropTypes.shape({}),
  onRefilter: PropTypes.func.isRequired,
  components: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  classes: PropTypes.shape({
    root: PropTypes.string,
    row: PropTypes.string
  }).isRequired
};
MasterFilter.defaultProps = {
  filters: {},
  components: {}
};
export default injectSheet(style)(MasterFilter);
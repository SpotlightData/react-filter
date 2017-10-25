import React from 'react';
import PropTypes from 'prop-types';

import injectSheet from 'react-jss';
import shortid from 'shortid';

import style from './style';

export class MasterFilter extends React.Component {
  static propTypes = {
    filters: PropTypes.shape({}),
    onRefilter: PropTypes.func.isRequired,
    components: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({})
      )
    ),
    classes: PropTypes.shape({
      root: PropTypes.string,
      row: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    filters: {},
    components: {},
  };

  state = {
    children: null,
  };

  componentWillMount() {
    const { components } = this.props;
    this.setState({
      children: this.mapRow(components),
    });
  }

  mapColumns = filters => filters.map(({ Component, id }) => {
    const filter = this.props.filters[id];
    if (filter === undefined) {
      throw TypeError(`Filter for id: ${id} not found`);
    }
    return (
      <Component
        key={shortid.generate()}
        onChange={this.updateFilterState(id)}
        state={filter.state}
      />
    );
  });

  mapRow = components => components.map(row => (
    <div key={shortid.generate()} className={this.props.classes.row}>
      {this.mapColumns(row)}
    </div>
  ));

  updateFilterState = id => (newState) => {
    this.props.filters[id].state = newState;
    this.props.onRefilter(this.props.filters);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        {this.state.children}
      </div>
    );
  }
}

export default injectSheet(style)(MasterFilter);

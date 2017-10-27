# react-filter
Utility for helping to filter using react components

## Usage
`MasterFilter` takes 3 props:
```javascript
import { MasterFilter } from 'react-filter';

<MasterFilter
  filters={}
  components={}
  onRefilter={}
/>
```
## MasterFilter
#### `filters`
Dictionary containing all of the filters that should be applied.
```javascript
const filters = {
  filterId: {
    state: {},
    functor: (state: Object, list: Array<T>) => Array<T>,
  },
};
```

#### `components`
2D array containing components. Depending on the structure components will be placed differently. For example:
`const components = [[C1, C2], [C3, C4]];` would be placed like:<br>
```javascript
  <div class="root">
    <div class="row">
      <C1>
      <C2>
    </div>
    <div class="row">
      <C3>
      <C4>
    </div>
  </div>
```
Structure: 
```javascript
const components = [
  [{ Component, id: filterId }],
  [{ Component, id: filterId }],
];
```
The state of the filter which is found via `filterId` would be supplied to `<Component />`

#### `onRefilter`
  will pass new updated filters dictionary. `onRefilter: (filters) => {}`<br>

### Example filter component
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class TypeFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    state: PropTypes.shape({
      value: PropTypes.string,
    }).isRequired,
  };

  handleInput = (e) => {
    const { value } = e.target;
    const newState = Object.assign(this.props.state, {
      value
    });
    this.props.onChange(newState);
  }

  render() {
    return (
      <input
        value={this.props.state.value}
        onChange={this.handleInput}
      />
    );
  }
}

export default TypeFilter;
```

## Pipe
This function should be used for filtering the list.
Definition: 
```javascript
  pipe(filter: Object, list: Array<T>): Array<T>
```
Usage:
```javascript
import { pipe } from 'react-filter';

pipe(filters, list);
```

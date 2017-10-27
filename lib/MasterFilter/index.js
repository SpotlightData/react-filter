'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterFilter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _ramda = require('ramda');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasterFilter = exports.MasterFilter = function (_React$Component) {
  _inherits(MasterFilter, _React$Component);

  function MasterFilter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MasterFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MasterFilter.__proto__ || Object.getPrototypeOf(MasterFilter)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      children: null
    }, _this.mapColumns = function (filters) {
      return filters.map(function (_ref2) {
        var Component = _ref2.Component,
            id = _ref2.id;

        var filter = _this.props.filters[id];
        if (filter === undefined) {
          throw TypeError('Filter for id: ' + id + ' not found');
        }
        return _react2.default.createElement(Component, {
          key: _shortid2.default.generate(),
          onChange: _this.updateFilterState(id),
          state: filter.state
        });
      });
    }, _this.mapRow = function (components) {
      return components.map(function (row) {
        return _react2.default.createElement(
          'div',
          { key: _shortid2.default.generate(), className: _this.props.classes.row },
          _this.mapColumns(row)
        );
      });
    }, _this.updateFilterState = function (id) {
      return function (newState) {
        var _this$props = _this.props,
            filters = _this$props.filters,
            onRefilter = _this$props.onRefilter;


        var newFilter = Object.assign({}, filters[id], {
          state: newState
        });

        var newFilters = Object.assign({}, filters, _defineProperty({}, id, newFilter));

        return onRefilter(newFilters);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MasterFilter, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var components = this.props.components;

      this.setState({
        children: this.mapRow(components)
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.classes.root },
        this.state.children
      );
    }
  }]);

  return MasterFilter;
}(_react2.default.Component);

MasterFilter.propTypes = {
  filters: _propTypes2.default.shape({}),
  onRefilter: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.shape({}))),
  classes: _propTypes2.default.shape({
    root: _propTypes2.default.string,
    row: _propTypes2.default.string
  }).isRequired
};
MasterFilter.defaultProps = {
  filters: {},
  components: {}
};
exports.default = (0, _reactJss2.default)(_style2.default)(MasterFilter);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var _Table = _interopRequireDefault(require("../Table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-unused-expressions */
var Column = _Table["default"].Column,
    ColumnGroup = _Table["default"].ColumnGroup;
describe('Table.typescript', function () {
  it('Column', function () {
    var table = React.createElement(_Table["default"], null, React.createElement(Column, {
      dataIndex: "test",
      title: "test",
      sorter: true
    }));
    expect(table).toBeTruthy();
  });
  it('ColumnGroup', function () {
    var table = React.createElement(_Table["default"], null, React.createElement(Column, {
      dataIndex: "test",
      title: "test",
      sorter: true
    }), React.createElement(ColumnGroup, null, React.createElement(Column, {
      dataIndex: "test",
      title: "test",
      sorter: true
    })));
    expect(table).toBeTruthy();
  });
});
describe('Table.typescript types', function () {
  it('ColumnProps', function () {
    var columns = [{
      title: 'Name',
      dataIndex: 'name'
    }];
    expect(columns).toBeTruthy();
  });
});
/* eslint-enable */
//# sourceMappingURL=type.test.js.map

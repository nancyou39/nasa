/* eslint-disable no-unused-expressions */
import * as React from 'react';
import Table from '../Table';
var Column = Table.Column,
    ColumnGroup = Table.ColumnGroup;
describe('Table.typescript', function () {
  it('Column', function () {
    var table = React.createElement(Table, null, React.createElement(Column, {
      dataIndex: "test",
      title: "test",
      sorter: true
    }));
    expect(table).toBeTruthy();
  });
  it('ColumnGroup', function () {
    var table = React.createElement(Table, null, React.createElement(Column, {
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

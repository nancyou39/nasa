import * as React from 'react';
import { INTERNAL_COL_DEFINE } from './utils/legacyUtil';

function ColGroup(_ref) {
  var colWidths = _ref.colWidths,
      columns = _ref.columns,
      columCount = _ref.columCount;
  var cols = [];
  var len = columCount || columns.length;

  for (var i = 0; i < len; i += 1) {
    var width = colWidths[i];
    var column = columns && columns[i];
    var additionalProps = column && column[INTERNAL_COL_DEFINE];
    cols.push(React.createElement("col", Object.assign({
      key: i,
      style: {
        width: width,
        minWidth: width
      }
    }, additionalProps)));
  }

  return React.createElement("colgroup", null, cols);
}

export default ColGroup;
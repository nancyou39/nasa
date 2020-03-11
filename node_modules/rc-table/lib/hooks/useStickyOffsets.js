"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

/**
 * Get sticky column offset width
 */
function useStickyOffsets(colWidths, columCount) {
  var stickyOffsets = (0, _react.useMemo)(function () {
    var leftOffsets = [];
    var rightOffsets = [];
    var left = 0;
    var right = 0;

    for (var start = 0; start < columCount; start += 1) {
      // Left offset
      leftOffsets[start] = left;
      left += colWidths[start] || 0; // Right offset

      var end = columCount - start - 1;
      rightOffsets[end] = right;
      right += colWidths[end] || 0;
    }

    return {
      left: leftOffsets,
      right: rightOffsets
    };
  }, [colWidths, columCount]);
  return stickyOffsets;
}

var _default = useStickyOffsets;
exports.default = _default;
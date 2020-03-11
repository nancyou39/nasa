"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @jest-environment node
 */
describe('neither document nor window exists, e.g. server-side rendering', function () {
  it('returns 0', function () {
    var windowHeight = (0, _.default)();
    expect(windowHeight).toEqual(0);
  });
});
"use strict";

var _convertStyle = _interopRequireWildcard(require("./convertStyle"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('rvh detection in a CSS property value', function () {
  it('detects a single rvh value', function () {
    expect((0, _convertStyle.containsRvh)('100rvh')).toBe(true);
  });
  it('detects multiple rvh values', function () {
    expect((0, _convertStyle.containsRvh)('1rvh 1rvh')).toBe(true);
  });
  it('detects a floating point rvh value', function () {
    expect((0, _convertStyle.containsRvh)('1.5rvh')).toBe(true);
  });
  it('ignores an invalid rvh units', function () {
    expect((0, _convertStyle.containsRvh)('1.5rvhsomething')).toBe(false);
  });
  it('ignores value is separated with rvh unit by space', function () {
    expect((0, _convertStyle.containsRvh)('1.5 rvh')).toBe(false);
  });
  it('ignores if rvh value in non-numeric', function () {
    expect((0, _convertStyle.containsRvh)('abcrvh')).toBe(false);
  });
});
describe('rvh conversion', function () {
  it('throws if windowHeight is not a non-negative number', function () {
    expect(function () {
      return (0, _convertStyle.default)({});
    }).toThrow();
    expect(function () {
      return (0, _convertStyle.default)({}, 'string');
    }).toThrow();
    expect(function () {
      return (0, _convertStyle.default)({}, -1);
    }).toThrow();
  });
  it('throws if given style is not an object or undefined', function () {
    expect(function () {
      return (0, _convertStyle.default)(null, 1000);
    }).toThrow();
    expect(function () {
      return (0, _convertStyle.default)([1, 2, 3], 1000);
    }).toThrow();
    expect(function () {
      return (0, _convertStyle.default)(undefined, 1000);
    }).not.toThrow();
    expect(function () {
      return (0, _convertStyle.default)({}, 1000);
    }).not.toThrow();
  });
  it('supports properties with non-string values', function () {
    expect((0, _convertStyle.default)({
      lineHeight: 2,
      height: '50rvh'
    }, 1000)).toEqual({
      lineHeight: 2,
      height: '500px'
    });
  });
  it('converts rvh to px', function () {
    expect((0, _convertStyle.default)({
      height: '100rvh'
    }, 1000)).toEqual({
      height: '1000px'
    });
  });
  it('converts a floating point rvh to px correctly', function () {
    expect((0, _convertStyle.default)({
      height: '50.5rvh'
    }, 1000)).toEqual({
      height: '505px'
    });
  });
  it('converts an rvh unit to px in a shorthand value', function () {
    expect((0, _convertStyle.default)({
      border: '1rvh solid red'
    }, 1000)).toEqual({
      border: '10px solid red'
    });
  });
  it('converts a value consisting of multiple rvh', function () {
    expect((0, _convertStyle.default)({
      margin: '10px 1rvh 20px 1.5rvh'
    }, 1000)).toEqual({
      margin: '10px 10px 20px 15px'
    });
  });
  it('converts multiple rvh values to px', function () {
    expect((0, _convertStyle.default)({
      minHeight: '50.5rvh',
      maxHeight: '100rvh'
    }, 1000)).toEqual({
      minHeight: '505px',
      maxHeight: '1000px'
    });
  });
  it('does not change style object if it contains no rvh', function () {
    expect((0, _convertStyle.default)({
      height: '50vh',
      color: 'green'
    }, 1000)).toEqual({
      height: '50vh',
      color: 'green'
    });
  });
});
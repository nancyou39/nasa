"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsRvh = containsRvh;
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function containsRvh(propertyValue) {
  // TODO: when regexp is lifted up the lexical scope, to be used
  // in both `containsRvh` and `replaceRvhWithPx`, some tests start to
  // fail. Seems like a regexp object contains some weird state that
  // changes after executions; executions interfere with each other.
  // It would be nice to figure out what is the problem exactly.
  var rvhRegex = /(\d+(\.\d*)?)rvh(?!\w)/;
  return rvhRegex.test(propertyValue);
}

function replaceRvhWithPx(propertyStringValue, windowHeight) {
  // regexp is global to make #replace work multiple times
  var rvhRegex = /(\d+(\.\d*)?)rvh(?!\w)/g;
  return propertyStringValue.replace(rvhRegex, function (_, rvh) {
    return "".concat(windowHeight * parseFloat(rvh) / 100, "px");
  });
}

function throwOnBadArgs(givenStyle, windowHeight) {
  if (_typeof(givenStyle) !== 'object' && givenStyle !== undefined || Array.isArray(givenStyle)) throw Error("style (the first argument) must be an object or undefined");
  if (typeof windowHeight !== 'number' || windowHeight < 0) throw Error('Second argument (windowHeight) must be a non-negative number');
}

function convertStyle(givenStyle, windowHeight) {
  throwOnBadArgs(givenStyle, windowHeight); // If style is not passed, implicit {height: '100rvh'} style is used.

  var defaultStyle = {
    height: '100rvh'
  };
  var usedStyle = givenStyle === undefined ? defaultStyle : givenStyle;
  var convertedStyle = {};
  Object.keys(usedStyle).forEach(function (key) {
    // if a value contains no rvh unit, it's used as is, otherwise converted
    // to px; 1rvh = (window.innerHeight / 100)px
    convertedStyle[key] = typeof usedStyle[key] === 'string' ? replaceRvhWithPx(usedStyle[key], windowHeight) : usedStyle[key];
  });
  return convertedStyle;
}

var _default = convertStyle;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFrameState = useFrameState;
exports.useTimeoutLock = useTimeoutLock;

var _react = require("react");

var _raf = _interopRequireDefault(require("raf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useFrameState(defaultState) {
  var _useState = (0, _react.useState)(defaultState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var timeoutRef = (0, _react.useRef)(null);
  var tmpStateRef = (0, _react.useRef)(null);

  function setFrameState(updater) {
    if (timeoutRef.current === null) {
      tmpStateRef.current = state;
      timeoutRef.current = (0, _raf.default)(function () {
        setState(tmpStateRef.current);
        timeoutRef.current = null;
      });
    }

    tmpStateRef.current = updater(tmpStateRef.current);
  }

  (0, _react.useEffect)(function () {
    _raf.default.cancel(timeoutRef.current);
  }, []);
  return [state, setFrameState];
}
/** Lock frame, when frame pass reset the lock. */


function useTimeoutLock(defaultState) {
  var frameRef = (0, _react.useRef)(defaultState);
  var timeoutRef = (0, _react.useRef)(null);

  function cleanUp() {
    window.clearTimeout(timeoutRef.current);
  }

  function setState(newState) {
    frameRef.current = newState;
    cleanUp();
    timeoutRef.current = window.setTimeout(function () {
      frameRef.current = null;
      timeoutRef.current = null;
    }, 100);
  }

  function getState() {
    return frameRef.current;
  }

  (0, _react.useEffect)(function () {
    return cleanUp;
  }, []);
  return [setState, getState];
}
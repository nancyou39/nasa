"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// extracted into a separate module so it's easier to mock with Jest
function getWindowHeight() {
  return document && document.documentElement && document.documentElement.clientHeight || window.innerHeight;
}

var _default = getWindowHeight;
exports.default = _default;
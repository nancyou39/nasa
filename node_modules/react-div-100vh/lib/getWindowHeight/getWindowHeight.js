"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getWindowHeight() {
  if (typeof document === 'undefined' && typeof window === 'undefined') {
    return 0;
  }

  return document && document.documentElement && document.documentElement.clientHeight || window.innerHeight;
}

var _default = getWindowHeight;
exports.default = _default;
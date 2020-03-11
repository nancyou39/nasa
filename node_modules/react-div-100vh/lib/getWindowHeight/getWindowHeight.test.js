"use strict";

var _ = _interopRequireDefault(require("."));

var _jsdom = require("jsdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('the document exists', function () {
  beforeEach(function () {
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(function () {
      return 100;
    });
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  it('returns document.documentElement.clientHeight', function () {
    var windowHeight = (0, _.default)();
    expect(windowHeight).toEqual(100);
  });
});
describe('the window exists', function () {
  beforeEach(function () {
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(function () {
      return undefined;
    });
    window = Object.assign(window, {
      document: undefined,
      innerHeight: 500
    });
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  it('returns window.innerHeight', function () {
    var windowHeight = (0, _.default)();
    expect(windowHeight).toEqual(500);
  });
});
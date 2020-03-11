"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _Div100vh = _interopRequireDefault(require("./Div100vh"));

var _getWindowHeight = _interopRequireDefault(require("./getWindowHeight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./getWindowHeight');

_getWindowHeight.default.mockReturnValue(1000);

var renderComponent = function renderComponent(props) {
  return _reactTestRenderer.default.create(_react.default.createElement(_Div100vh.default, props));
};

var getDivProps = function getDivProps(component) {
  return component.root.findByType('div').props;
};

it("uses {height: '100rvh'} as a default if style prop is undefined", function () {
  var component = renderComponent({});
  var props = getDivProps(component);
  expect(props).toEqual({
    style: {
      height: '1000px'
    }
  });
});
describe('When style prop is specified and contains no rvh', function () {
  it('does not modify an empty style object', function () {
    var component = renderComponent({
      style: {}
    });
    var props = getDivProps(component);
    expect(props).toEqual({
      style: {}
    });
  });
  it('does not modify a style with height in px', function () {
    var component = renderComponent({
      style: {
        height: '123px'
      }
    });
    var props = getDivProps(component);
    expect(props).toEqual({
      style: {
        height: '123px'
      }
    });
  });
  it('passes through all style properties unchanged', function () {
    var component = renderComponent({
      style: {
        color: 'green'
      }
    });
    var props = getDivProps(component);
    expect(props).toEqual({
      style: {
        color: 'green'
      }
    });
  });
});
describe('rvh unit conversion', function () {
  it('converts a simple rvh value', function () {
    var component = renderComponent({
      style: {
        height: '50.5rvh'
      }
    });
    var props = getDivProps(component);
    expect(props).toEqual({
      style: {
        height: '505px'
      }
    });
  });
  it('converts a shorthand value with multiple rvh entries', function () {
    var component = renderComponent({
      style: {
        margin: '1rvh 2px 1.5rvh 3%'
      }
    });
    var props = getDivProps(component);
    expect(props).toEqual({
      style: {
        margin: '10px 2px 15px 3%'
      }
    });
  });
  it('converts an rvh value and passes through other style props', function () {
    var component = renderComponent({
      style: {
        fontSize: '5rvh',
        color: 'red'
      }
    });
    var props = getDivProps(component);
    expect(props).toEqual({
      style: {
        fontSize: '50px',
        color: 'red'
      }
    });
  });
});
it('passes through to the underlying div the other props with rvh', function () {
  var component = renderComponent({
    foo: 'bar',
    style: {
      padding: '1rvh'
    }
  });
  var props = getDivProps(component);
  expect(props).toEqual({
    foo: 'bar',
    style: {
      padding: '10px'
    }
  });
});
it('passes through to the underlying div the other props without rvh', function () {
  var component = renderComponent({
    foo: 'bar',
    style: {
      color: 'red'
    }
  });
  var props = getDivProps(component);
  expect(props).toEqual({
    foo: 'bar',
    style: {
      color: 'red'
    }
  });
});
describe('rendering elements other than divs', function () {
  it('renders a div if no el prop is passed in', function () {
    var component = renderComponent({});
    expect(component.root.findByType('div')).toBeTruthy();
  });
  it('renders a non-div element passed in as a prop', function () {
    var type = 'main';
    var component = renderComponent({
      as: type
    });
    expect(component.root.findByType(type)).toBeTruthy();
  });
});
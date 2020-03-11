function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import classNames from 'classnames';
import RCPicker, { RangePicker as RCRangePicker } from 'rc-picker';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import enUS from './locale/en_US';
import { getPlaceholder, getRangePlaceholder } from './util';
import PickerButton from './PickerButton';
import PickerTag from './PickerTag';
import SizeContext from '../config-provider/SizeContext';
var Components = {
  button: PickerButton,
  rangeItem: PickerTag
};

function toArray(list) {
  if (!list) {
    return [];
  }

  return Array.isArray(list) ? list : [list];
}

function getTimeProps(props) {
  var format = props.format,
      picker = props.picker,
      showHour = props.showHour,
      showMinute = props.showMinute,
      showSecond = props.showSecond,
      use12Hours = props.use12Hours;
  var firstFormat = toArray(format)[0];

  var showTimeObj = _extends({}, props);

  if (firstFormat) {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false;
    }

    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false;
    }

    if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
      showTimeObj.showHour = false;
    }

    if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
      showTimeObj.use12Hours = true;
    }
  }

  if (picker === 'time') {
    return showTimeObj;
  }

  return {
    showTime: showTimeObj
  };
}

function generatePicker(generateConfig) {
  function getPicker(picker, displayName) {
    var Picker = /*#__PURE__*/function (_React$Component) {
      _inherits(Picker, _React$Component);

      function Picker() {
        var _this;

        _classCallCheck(this, Picker);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Picker).apply(this, arguments));
        _this.pickerRef = React.createRef();

        _this.focus = function () {
          if (_this.pickerRef.current) {
            _this.pickerRef.current.focus();
          }
        };

        _this.blur = function () {
          if (_this.pickerRef.current) {
            _this.pickerRef.current.blur();
          }
        };

        _this.getDefaultLocale = function () {
          var locale = _this.props.locale;

          var result = _extends(_extends({}, enUS), locale);

          result.lang = _extends(_extends({}, result.lang), (locale || {}).lang);
          return result;
        };

        _this.renderPicker = function (locale) {
          var _this$context = _this.context,
              getPrefixCls = _this$context.getPrefixCls,
              direction = _this$context.direction;

          var _a = _this.props,
              customizePrefixCls = _a.prefixCls,
              className = _a.className,
              customizeSize = _a.size,
              _a$bordered = _a.bordered,
              bordered = _a$bordered === void 0 ? true : _a$bordered,
              restProps = __rest(_a, ["prefixCls", "className", "size", "bordered"]);

          var _this$props = _this.props,
              format = _this$props.format,
              showTime = _this$props.showTime;
          var prefixCls = getPrefixCls('picker', customizePrefixCls);
          var additionalProps = {
            showToday: true
          };
          var additionalOverrideProps = {};

          if (picker) {
            additionalOverrideProps.picker = picker;
          }

          var mergedPicker = picker || _this.props.picker;
          additionalOverrideProps = _extends(_extends(_extends({}, additionalOverrideProps), showTime ? getTimeProps(_extends({
            format: format,
            picker: mergedPicker
          }, showTime)) : {}), mergedPicker === 'time' ? getTimeProps(_extends(_extends({
            format: format
          }, _this.props), {
            picker: mergedPicker
          })) : {});
          return React.createElement(SizeContext.Consumer, null, function (size) {
            var _classNames;

            var mergedSize = customizeSize || size;
            return React.createElement(RCPicker, _extends({
              ref: _this.pickerRef,
              placeholder: getPlaceholder(mergedPicker, locale),
              suffixIcon: mergedPicker === 'time' ? React.createElement(ClockCircleOutlined, null) : React.createElement(CalendarOutlined, null),
              clearIcon: React.createElement(CloseCircleFilled, null),
              allowClear: true,
              transitionName: "slide-up"
            }, additionalProps, restProps, additionalOverrideProps, {
              locale: locale.lang,
              className: classNames(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(mergedSize), mergedSize), _defineProperty(_classNames, "".concat(prefixCls, "-borderless"), !bordered), _classNames)),
              prefixCls: prefixCls,
              generateConfig: generateConfig,
              prevIcon: React.createElement("span", {
                className: "".concat(prefixCls, "-prev-icon")
              }),
              nextIcon: React.createElement("span", {
                className: "".concat(prefixCls, "-next-icon")
              }),
              superPrevIcon: React.createElement("span", {
                className: "".concat(prefixCls, "-super-prev-icon")
              }),
              superNextIcon: React.createElement("span", {
                className: "".concat(prefixCls, "-super-next-icon")
              }),
              components: Components,
              direction: direction
            }));
          });
        };

        return _this;
      }

      _createClass(Picker, [{
        key: "render",
        value: function render() {
          return React.createElement(LocaleReceiver, {
            componentName: "DatePicker",
            defaultLocale: this.getDefaultLocale
          }, this.renderPicker);
        }
      }]);

      return Picker;
    }(React.Component);

    Picker.contextType = ConfigContext;

    if (displayName) {
      Picker.displayName = displayName;
    }

    return Picker;
  }

  var DatePicker = getPicker();
  var WeekPicker = getPicker('week', 'WeekPicker');
  var MonthPicker = getPicker('month', 'MonthPicker');
  var YearPicker = getPicker('year', 'YearPicker');
  var TimePicker = getPicker('time', 'TimePicker'); // ======================== Range Picker ========================

  var RangePicker = /*#__PURE__*/function (_React$Component2) {
    _inherits(RangePicker, _React$Component2);

    function RangePicker() {
      var _this2;

      _classCallCheck(this, RangePicker);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(RangePicker).apply(this, arguments));
      _this2.pickerRef = React.createRef();

      _this2.focus = function () {
        if (_this2.pickerRef.current) {
          _this2.pickerRef.current.focus();
        }
      };

      _this2.blur = function () {
        if (_this2.pickerRef.current) {
          _this2.pickerRef.current.blur();
        }
      };

      _this2.getDefaultLocale = function () {
        var locale = _this2.props.locale;

        var result = _extends(_extends({}, enUS), locale);

        result.lang = _extends(_extends({}, result.lang), (locale || {}).lang);
        return result;
      };

      _this2.renderPicker = function (locale) {
        var _classNames2;

        var _this2$context = _this2.context,
            getPrefixCls = _this2$context.getPrefixCls,
            direction = _this2$context.direction;

        var _a = _this2.props,
            customizePrefixCls = _a.prefixCls,
            className = _a.className,
            size = _a.size,
            _a$bordered2 = _a.bordered,
            bordered = _a$bordered2 === void 0 ? true : _a$bordered2,
            restProps = __rest(_a, ["prefixCls", "className", "size", "bordered"]);

        var _this2$props = _this2.props,
            format = _this2$props.format,
            showTime = _this2$props.showTime,
            picker = _this2$props.picker;
        var prefixCls = getPrefixCls('picker', customizePrefixCls);
        var additionalOverrideProps = {};
        additionalOverrideProps = _extends(_extends(_extends({}, additionalOverrideProps), showTime ? getTimeProps(_extends({
          format: format,
          picker: picker
        }, showTime)) : {}), picker === 'time' ? getTimeProps(_extends(_extends({
          format: format
        }, _this2.props), {
          picker: picker
        })) : {});
        return React.createElement(RCRangePicker, _extends({
          separator: React.createElement("span", {
            className: "".concat(prefixCls, "-separator")
          }, "\u2192"),
          ref: _this2.pickerRef,
          placeholder: getRangePlaceholder(picker, locale),
          suffixIcon: picker === 'time' ? React.createElement(ClockCircleOutlined, null) : React.createElement(CalendarOutlined, null),
          clearIcon: React.createElement(CloseCircleFilled, null),
          allowClear: true,
          transitionName: "slide-up"
        }, restProps, {
          className: classNames(className, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-").concat(size), size), _defineProperty(_classNames2, "".concat(prefixCls, "-borderless"), !bordered), _classNames2))
        }, additionalOverrideProps, {
          locale: locale.lang,
          prefixCls: prefixCls,
          generateConfig: generateConfig,
          prevIcon: React.createElement("span", {
            className: "".concat(prefixCls, "-prev-icon")
          }),
          nextIcon: React.createElement("span", {
            className: "".concat(prefixCls, "-next-icon")
          }),
          superPrevIcon: React.createElement("span", {
            className: "".concat(prefixCls, "-super-prev-icon")
          }),
          superNextIcon: React.createElement("span", {
            className: "".concat(prefixCls, "-super-next-icon")
          }),
          components: Components,
          direction: direction
        }));
      };

      return _this2;
    }

    _createClass(RangePicker, [{
      key: "render",
      value: function render() {
        return React.createElement(LocaleReceiver, {
          componentName: "DatePicker",
          defaultLocale: this.getDefaultLocale
        }, this.renderPicker);
      }
    }]);

    return RangePicker;
  }(React.Component);

  RangePicker.contextType = ConfigContext;
  var MergedDatePicker = DatePicker;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  MergedDatePicker.RangePicker = RangePicker;
  MergedDatePicker.TimePicker = TimePicker;
  return MergedDatePicker;
}

export default generatePicker;
//# sourceMappingURL=generatePicker.js.map

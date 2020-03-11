function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { Field } from 'rc-field-form';
import omit from 'omit.js';
import Row from '../grid/row';
import { ConfigContext } from '../config-provider';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import FormItemLabel from './FormItemLabel';
import FormItemInput from './FormItemInput';
import { FormContext, FormItemContext } from './context';
import { toArray, getFieldId } from './util';
var ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
var MemoInput = React.memo(function (_ref) {
  var children = _ref.children;
  return children;
}, function (prev, next) {
  return prev.value === next.value && prev.update === next.update;
});

function hasValidName(name) {
  if (name === null) {
    warning(false, 'Form.Item', '`null` is passed as `name` property');
  }

  return !(name === undefined || name === null);
}

function FormItem(props) {
  var name = props.name,
      fieldKey = props.fieldKey,
      noStyle = props.noStyle,
      dependencies = props.dependencies,
      customizePrefixCls = props.prefixCls,
      style = props.style,
      className = props.className,
      shouldUpdate = props.shouldUpdate,
      hasFeedback = props.hasFeedback,
      help = props.help,
      rules = props.rules,
      validateStatus = props.validateStatus,
      children = props.children,
      required = props.required,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? 'onChange' : _props$trigger,
      _props$validateTrigge = props.validateTrigger,
      validateTrigger = _props$validateTrigge === void 0 ? 'onChange' : _props$validateTrigge,
      restProps = __rest(props, ["name", "fieldKey", "noStyle", "dependencies", "prefixCls", "style", "className", "shouldUpdate", "hasFeedback", "help", "rules", "validateStatus", "children", "required", "trigger", "validateTrigger"]);

  var destroyRef = React.useRef(false);

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var formContext = React.useContext(FormContext);

  var _React$useContext2 = React.useContext(FormItemContext),
      updateItemErrors = _React$useContext2.updateItemErrors;

  var _React$useState = React.useState(!!help),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      domErrorVisible = _React$useState2[0],
      innerSetDomErrorVisible = _React$useState2[1];

  var _React$useState3 = React.useState({}),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      inlineErrors = _React$useState4[0],
      innerSetInlineErrors = _React$useState4[1];

  function setDomErrorVisible(visible) {
    if (!destroyRef.current) {
      innerSetDomErrorVisible(visible);
    }
  }

  function setInlineErrors(errors) {
    if (!destroyRef.current) {
      innerSetInlineErrors(errors);
    }
  }

  var formName = formContext.name;
  var hasName = hasValidName(name); // Cache Field NamePath

  var nameRef = React.useRef([]); // Should clean up if Field removed

  React.useEffect(function () {
    return function () {
      destroyRef.current = true;
      updateItemErrors(nameRef.current.join('__SPLIT__'), []);
    };
  }, []);
  var prefixCls = getPrefixCls('form', customizePrefixCls); // ======================== Errors ========================
  // Collect noStyle Field error to the top FormItem

  var updateChildItemErrors = noStyle ? updateItemErrors : function (subName, subErrors) {
    if (!isEqual(inlineErrors[subName], subErrors)) {
      Promise.resolve().then(function () {
        setInlineErrors(_extends(_extends({}, inlineErrors), _defineProperty({}, subName, subErrors)));
      });
    }
  };

  function renderLayout(baseChildren, fieldId, meta, isRequired) {
    var _itemClassName;

    if (noStyle) {
      return baseChildren;
    } // ======================== Errors ========================


    var mergedErrors;

    if (help !== undefined && help !== null) {
      mergedErrors = toArray(help);
    } else {
      mergedErrors = meta ? meta.errors : [];
      Object.keys(inlineErrors).forEach(function (subName) {
        var subErrors = inlineErrors[subName] || [];

        if (subErrors.length) {
          mergedErrors = [].concat(_toConsumableArray(mergedErrors), _toConsumableArray(subErrors));
        }
      });
    } // ======================== Status ========================


    var mergedValidateStatus = '';

    if (validateStatus !== undefined) {
      mergedValidateStatus = validateStatus;
    } else if (meta && meta.validating) {
      mergedValidateStatus = 'validating';
    } else if (!help && mergedErrors.length) {
      mergedValidateStatus = 'error';
    } else if (meta && meta.touched) {
      mergedValidateStatus = 'success';
    }

    var itemClassName = (_itemClassName = {}, _defineProperty(_itemClassName, "".concat(prefixCls, "-item"), true), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-with-help"), domErrorVisible || help), _defineProperty(_itemClassName, "".concat(className), !!className), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-feedback"), mergedValidateStatus && hasFeedback), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-success"), mergedValidateStatus === 'success'), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-warning"), mergedValidateStatus === 'warning'), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-error"), mergedValidateStatus === 'error'), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-error-leave"), !help && domErrorVisible && mergedValidateStatus !== 'error'), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-is-validating"), mergedValidateStatus === 'validating'), _itemClassName); // ======================= Children =======================

    return React.createElement(Row, _extends({
      className: classNames(itemClassName),
      style: style,
      key: "row"
    }, omit(restProps, ['colon', 'extra', 'getValueFromEvent', 'hasFeedback', 'help', 'htmlFor', 'id', 'label', 'labelAlign', 'labelCol', 'normalize', 'required', 'validateFirst', 'validateStatus', 'valuePropName', 'wrapperCol'])), React.createElement(FormItemLabel, _extends({
      htmlFor: fieldId,
      required: isRequired
    }, props, {
      prefixCls: prefixCls
    })), React.createElement(FormItemInput, _extends({}, props, meta, {
      errors: mergedErrors,
      prefixCls: prefixCls,
      onDomErrorVisibleChange: setDomErrorVisible,
      validateStatus: mergedValidateStatus
    }), React.createElement(FormItemContext.Provider, {
      value: {
        updateItemErrors: updateChildItemErrors
      }
    }, baseChildren)));
  }

  var isRenderProps = typeof children === 'function';

  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children);
  } // Record for real component render


  var updateRef = React.useRef(0);
  updateRef.current += 1;
  return React.createElement(Field, _extends({}, props, {
    trigger: trigger,
    validateTrigger: validateTrigger,
    onReset: function onReset() {
      setDomErrorVisible(false);
    }
  }), function (control, meta, context) {
    var errors = meta.errors;
    var mergedName = toArray(name).length && meta ? meta.name : [];
    var fieldId = getFieldId(mergedName, formName);

    if (noStyle) {
      nameRef.current = _toConsumableArray(mergedName);

      if (fieldKey) {
        nameRef.current[nameRef.current.length - 1] = fieldKey;
      }

      updateItemErrors(nameRef.current.join('__SPLIT__'), errors);
    }

    var isRequired = required !== undefined ? required : !!(rules && rules.some(function (rule) {
      if (rule && _typeof(rule) === 'object' && rule.required) {
        return true;
      }

      if (typeof rule === 'function') {
        var ruleEntity = rule(context);
        return ruleEntity && ruleEntity.required;
      }

      return false;
    })); // ======================= Children =======================

    var mergedControl = _extends(_extends({}, control), {
      id: fieldId
    });

    var childNode = null;

    if (Array.isArray(children) && hasName) {
      warning(false, 'Form.Item', '`children` is array of render props cannot have `name`.');
      childNode = children;
    } else if (isRenderProps && (!shouldUpdate || hasName)) {
      warning(!!shouldUpdate, 'Form.Item', '`children` of render props only work with `shouldUpdate`.');
      warning(!hasName, 'Form.Item', "Do not use `name` with `children` of render props since it's not a field.");
    } else if (dependencies && !isRenderProps && !hasName) {
      warning(false, 'Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
    } else if (React.isValidElement(children)) {
      var childProps = _extends(_extends({}, children.props), mergedControl); // We should keep user origin event handler


      var triggers = new Set([].concat(_toConsumableArray(toArray(trigger)), _toConsumableArray(toArray(validateTrigger))));
      triggers.forEach(function (eventName) {
        childProps[eventName] = function () {
          var _a2, _c2;

          var _a, _b, _c;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_a = mergedControl[eventName]) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [mergedControl].concat(args));
          (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : (_c2 = _c).call.apply(_c2, [_b].concat(args));
        };
      });
      childNode = React.createElement(MemoInput, {
        value: mergedControl[props.valuePropName || 'value'],
        update: updateRef.current
      }, React.cloneElement(children, childProps));
    } else if (isRenderProps && shouldUpdate && !hasName) {
      childNode = children(context);
    } else {
      warning(!mergedName.length, 'Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.');
      childNode = children;
    }

    return renderLayout(childNode, fieldId, meta, isRequired);
  });
}

export default FormItem;
//# sourceMappingURL=FormItem.js.map

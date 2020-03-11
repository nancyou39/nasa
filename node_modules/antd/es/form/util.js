function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import { useForm as useRcForm } from 'rc-field-form';
import scrollIntoView from 'scroll-into-view-if-needed';
/**
 * Always debounce error to avoid [error -> null -> error] blink
 */

export function useCacheErrors(errors, changeTrigger, directly) {
  var cacheRef = React.useRef({
    errors: errors,
    visible: !!errors.length
  });

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      forceUpdate = _React$useState2[1];

  var update = function update() {
    var prevVisible = cacheRef.current.visible;
    var newVisible = !!errors.length;
    var prevErrors = cacheRef.current.errors;
    cacheRef.current.errors = errors;
    cacheRef.current.visible = newVisible;

    if (prevVisible !== newVisible) {
      changeTrigger(newVisible);
    } else if (prevErrors.length !== errors.length || prevErrors.some(function (prevErr, index) {
      return prevErr !== errors[index];
    })) {
      forceUpdate({});
    }
  };

  React.useEffect(function () {
    if (!directly) {
      var timeout = setTimeout(update, 10);
      return function () {
        return clearTimeout(timeout);
      };
    }
  }, [errors]);

  if (directly) {
    update();
  }

  return [cacheRef.current.visible, cacheRef.current.errors];
}
export function toArray(candidate) {
  if (candidate === undefined || candidate === false) return [];
  return Array.isArray(candidate) ? candidate : [candidate];
}
export function getFieldId(namePath, formName) {
  if (!namePath.length) return undefined;
  var mergedId = namePath.join('_');
  return formName ? "".concat(formName, "_").concat(mergedId) : mergedId;
}
export function useForm(form) {
  var _useRcForm = useRcForm(),
      _useRcForm2 = _slicedToArray(_useRcForm, 1),
      rcForm = _useRcForm2[0];

  var wrapForm = React.useMemo(function () {
    return form || _extends(_extends({}, rcForm), {
      __INTERNAL__: {},
      scrollToField: function scrollToField(name) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var namePath = toArray(name);
        var fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name);
        var node = fieldId ? document.getElementById(fieldId) : null;

        if (node) {
          scrollIntoView(node, _extends({
            scrollMode: 'if-needed',
            block: 'nearest'
          }, options));
        }
      }
    });
  }, [form, rcForm]);
  return [wrapForm];
}
//# sourceMappingURL=util.js.map

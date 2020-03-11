function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import classNames from 'classnames';
import FilterFilled from '@ant-design/icons/FilterFilled';
import Menu from '../../../menu';
import Checkbox from '../../../checkbox';
import Radio from '../../../radio';
import Dropdown from '../../../dropdown';
import FilterDropdownMenuWrapper from './FilterWrapper';
import useSyncState from '../useSyncState';
var SubMenu = Menu.SubMenu,
    MenuItem = Menu.Item;

function hasSubMenu(filters) {
  return filters.some(function (_ref) {
    var children = _ref.children;
    return children;
  });
}

function renderFilterItems(filters, prefixCls, filteredKeys, multiple) {
  return filters.map(function (filter, index) {
    if (filter.children) {
      return React.createElement(SubMenu, {
        key: filter.value || index,
        title: filter.text,
        popupClassName: "".concat(prefixCls, "-dropdown-submenu")
      }, renderFilterItems(filter.children, prefixCls, filteredKeys, multiple));
    }

    var Component = multiple ? Checkbox : Radio;
    return React.createElement(MenuItem, {
      key: filter.value !== undefined ? filter.value : index
    }, React.createElement(Component, {
      checked: filteredKeys.includes(String(filter.value))
    }), React.createElement("span", null, filter.text));
  });
}

function FilterDropdown(props) {
  var prefixCls = props.prefixCls,
      column = props.column,
      dropdownPrefixCls = props.dropdownPrefixCls,
      columnKey = props.columnKey,
      filterMultiple = props.filterMultiple,
      filterState = props.filterState,
      triggerFilter = props.triggerFilter,
      locale = props.locale,
      children = props.children,
      getPopupContainer = props.getPopupContainer;
  var filterDropdownVisible = column.filterDropdownVisible,
      onFilterDropdownVisibleChange = column.onFilterDropdownVisibleChange;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var filtered = !!(filterState && (filterState.filteredKeys || filterState.forceFiltered));

  var triggerVisible = function triggerVisible(newVisible) {
    setVisible(newVisible);

    if (onFilterDropdownVisibleChange) {
      onFilterDropdownVisibleChange(newVisible);
    }
  };

  var mergedVisible = typeof filterDropdownVisible === 'boolean' ? filterDropdownVisible : visible; // ===================== Select Keys =====================

  var propFilteredKeys = filterState && filterState.filteredKeys;

  var _useSyncState = useSyncState(propFilteredKeys || []),
      _useSyncState2 = _slicedToArray(_useSyncState, 2),
      getFilteredKeysSync = _useSyncState2[0],
      setFilteredKeysSync = _useSyncState2[1];

  var onSelectKeys = function onSelectKeys(_ref2) {
    var selectedKeys = _ref2.selectedKeys;
    setFilteredKeysSync(selectedKeys);
  };

  React.useEffect(function () {
    onSelectKeys({
      selectedKeys: propFilteredKeys || []
    });
  }, [propFilteredKeys]); // ====================== Open Keys ======================

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      openKeys = _React$useState4[0],
      setOpenKeys = _React$useState4[1];

  var openRef = React.useRef();

  var onOpenChange = function onOpenChange(keys) {
    openRef.current = window.setTimeout(function () {
      setOpenKeys(keys);
    });
  };

  var onMenuClick = function onMenuClick() {
    window.clearTimeout(openRef.current);
  };

  React.useEffect(function () {
    return function () {
      window.clearTimeout(openRef.current);
    };
  }, []); // ======================= Submit ========================

  var internalTriggerFilter = function internalTriggerFilter(keys) {
    triggerVisible(false);
    var mergedKeys = keys && keys.length ? keys : null;

    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }

    triggerFilter({
      column: column,
      key: columnKey,
      filteredKeys: mergedKeys
    });
  };

  var onConfirm = function onConfirm() {
    internalTriggerFilter(getFilteredKeysSync());
  };

  var onReset = function onReset() {
    internalTriggerFilter([]);
  };

  var onVisibleChange = function onVisibleChange(newVisible) {
    triggerVisible(newVisible); // Default will filter when closed

    if (!newVisible && !column.filterDropdown) {
      onConfirm();
    }
  }; // ======================== Style ========================


  var dropdownMenuClass = classNames(_defineProperty({}, "".concat(dropdownPrefixCls, "-menu-without-submenu"), !hasSubMenu(column.filters || [])));
  var dropdownContent;

  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: "".concat(dropdownPrefixCls, "-custom"),
      setSelectedKeys: function setSelectedKeys(selectedKeys) {
        return onSelectKeys({
          selectedKeys: selectedKeys
        });
      },
      selectedKeys: getFilteredKeysSync(),
      confirm: onConfirm,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    dropdownContent = React.createElement(React.Fragment, null, React.createElement(Menu, {
      multiple: filterMultiple,
      prefixCls: "".concat(dropdownPrefixCls, "-menu"),
      className: dropdownMenuClass,
      onClick: onMenuClick,
      onSelect: onSelectKeys,
      onDeselect: onSelectKeys,
      selectedKeys: getFilteredKeysSync() || [],
      getPopupContainer: getPopupContainer,
      openKeys: openKeys,
      onOpenChange: onOpenChange
    }, renderFilterItems(column.filters, prefixCls, getFilteredKeysSync(), filterMultiple)), React.createElement("div", {
      className: "".concat(prefixCls, "-dropdown-btns")
    }, React.createElement("a", {
      className: "".concat(prefixCls, "-dropdown-link confirm"),
      onClick: onConfirm
    }, locale.filterConfirm), React.createElement("a", {
      className: "".concat(prefixCls, "-dropdown-link clear"),
      onClick: onReset
    }, locale.filterReset)));
  }

  var menu = React.createElement(FilterDropdownMenuWrapper, {
    className: "".concat(prefixCls, "-dropdown")
  }, dropdownContent);
  var filterIcon;

  if (typeof column.filterIcon === 'function') {
    filterIcon = column.filterIcon(filtered);
  } else if (column.filterIcon) {
    filterIcon = column.filterIcon;
  } else {
    filterIcon = React.createElement(FilterFilled, null);
  }

  return React.createElement("div", {
    className: classNames("".concat(prefixCls, "-column"))
  }, React.createElement("span", {
    className: "".concat(prefixCls, "-column-title")
  }, children), React.createElement("span", {
    className: classNames("".concat(prefixCls, "-trigger-container"), _defineProperty({}, "".concat(prefixCls, "-trigger-container-open"), mergedVisible)),
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, React.createElement(Dropdown, {
    overlay: menu,
    trigger: ['click'],
    visible: mergedVisible,
    onVisibleChange: onVisibleChange,
    getPopupContainer: getPopupContainer,
    placement: "bottomRight"
  }, React.createElement("span", {
    role: "button",
    tabIndex: -1,
    className: classNames("".concat(prefixCls, "-trigger"), {
      active: filtered
    })
  }, filterIcon))));
}

export default FilterDropdown;
//# sourceMappingURL=FilterDropdown.js.map

import * as React from 'react';
var SizeContext = React.createContext(undefined);
export var SizeContextProvider = function SizeContextProvider(_ref) {
  var children = _ref.children,
      size = _ref.size;
  return React.createElement(SizeContext.Consumer, null, function (originSize) {
    return React.createElement(SizeContext.Provider, {
      value: size || originSize
    }, children);
  });
};
export default SizeContext;
//# sourceMappingURL=SizeContext.js.map

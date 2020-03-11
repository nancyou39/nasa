import * as React from 'react';
import Result from '..';
describe('Result.typescript', function () {
  it('status', function () {
    var result = React.createElement(React.Fragment, null, React.createElement(Result, {
      status: "404",
      title: "404",
      subTitle: "Sorry, the page you visited does not exist."
    }), React.createElement(Result, {
      status: 404,
      title: "404",
      subTitle: "Sorry, the page you visited does not exist."
    }));
    expect(result).toBeTruthy();
  });
});
//# sourceMappingURL=type.test.js.map

/* eslint-disable no-unused-expressions */
import * as React from 'react';
import Form from '..';
import Input from '../../input';
describe('Form.typescript', function () {
  it('Form.Item', function () {
    var form = React.createElement(Form, null, React.createElement(Form.Item, {
      name: "test"
    }, React.createElement(Input, null)));
    expect(form).toBeTruthy();
  });
});
/* eslint-enable */
//# sourceMappingURL=type.test.js.map

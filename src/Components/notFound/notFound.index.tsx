import { Button, Result } from 'antd';
import React from 'react';

// Display when the route doesn't exists.
const NotFound = (): JSX.Element => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};
export default NotFound;
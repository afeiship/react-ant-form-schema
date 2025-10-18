import ReactAntdFormSchema from '@jswork/react-ant-form-schema/src/main';
import '@jswork/react-ant-form-schema/src/style.scss';
import React from 'react';
import { Button } from 'antd';

function App() {
  const meta = {
    columns: 1,
    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'password', label: 'Password', widget: 'password' },
    ],
  };

  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <ReactAntdFormSchema meta={meta} onFinish={(values) => console.log(values)}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </ReactAntdFormSchema>
    </div>
  );
}

export default App;

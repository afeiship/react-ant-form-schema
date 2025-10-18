# react-ant-form-schema
> Antd form builder for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-ant-form-schema
```

## usage
  ```js
  import ReactAntdFormSchema from '@jswork/react-ant-form-schema';
  import '@jswork/react-ant-form-schema/dist/style.scss';
  import React, { useEffect } from 'react';
  import { Button, Form } from 'antd';

  function App() {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const meta = {
      columns: 1,
      fields: [
        { key: 'username', label: 'User Name' },
        { key: 'password', label: 'Password', widget: 'password' },
      ],
    };

    useEffect(() => {
      // simulate async fetch data
      setLoading(true);
      setTimeout(() => {
        form.setFieldsValue({
          username: 'admin-aric',
          password: '123456-update',
        });
        setLoading(false);
      }, 500);
    }, []);

    return (
      <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
        <div className="badge badge-warning absolute right-0 top-0 m-4">Build Time: {BUILD_TIME}</div>
        <ReactAntdFormSchema
          className="mx-auto wp-8 p-5 bg-slate-200 rounded-lg"
          footerClassName="mb-0"
          loading={loading}
          form={form}
          meta={meta}
          onFinish={(values) => console.log(values)}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </ReactAntdFormSchema>
      </div>
    );
  }

  export default App;
  ```

## preview
- https://afeiship.github.io/react-ant-form-schema/

## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-form-schema/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-ant-form-schema
[version-url]: https://npmjs.org/package/@jswork/react-ant-form-schema

[license-image]: https://img.shields.io/npm/l/@jswork/react-ant-form-schema
[license-url]: https://github.com/afeiship/react-ant-form-schema/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-ant-form-schema
[size-url]: https://github.com/afeiship/react-ant-form-schema/blob/master/dist/react-ant-form-schema.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-ant-form-schema
[download-url]: https://www.npmjs.com/package/@jswork/react-ant-form-schema

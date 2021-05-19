import React from 'react';
import { Form, Button } from 'antd';
import FormBuilder from 'antd-form-builder';
import ReactUploadSelf from '@jswork/react-upload-self';
import nx from '@jswork/next';

FormBuilder.defineWidget('react-upload-self', ({ value, onChange }) => {
  const _value = nx.get(value, 'blobs[0]');
  return (
    <ReactUploadSelf
      value={_value}
      onChange={(e) => {
        console.log(e);
        onChange({ target: { value: e.target.value.blobs[0] } });
      }}
    />
  );
});

export default () => {
  const meta = {
    initialValues: {
      username: 'admin',
      password: '123123'
    },
    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'photo', label: 'Yourphoto', widget: 'react-upload-self' },
      { key: 'password', label: 'Password', widget: 'password' }
    ]
  };

  console.dir(FormBuilder);

  const handleFinish = React.useCallback((values) => {
    console.log('Submit: ', values);
  }, []);

  return (
    <Form onFinish={handleFinish}>
      <FormBuilder meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

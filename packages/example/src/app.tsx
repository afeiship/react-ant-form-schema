import ReactAntdFormSchema from '@jswork/react-ant-form-schema/src/main';
import React, { useEffect } from 'react';
import { Button, Card, Form } from 'antd';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';

function App() {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const meta: NiceFormMeta = {
    columns: 1,
    viewMode: false,
    rowGap: 10,
    initialValues: {
      username: 'admin-init',
      password: '123456-initial',
      cities: [],
    },
    fields: [
      { key: 'username', label: 'User Name', help: 'Please enter your username', required: true },
      { key: 'password', label: 'Password', widget: 'password' },
      {
        key: 'cities',
        label: 'Cities',
        widget: 'form-list',
        listItemMeta: {
          widget: 'select',
          options: ['Beijing', 'Shanghai', 'Nanjing'],
        },
      },
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
    <Card title="React Antd Form Schema" className="mx-auto wp-8" loading={loading}>
      <div className="badge badge-warning absolute right-0 top-0 m-4">Build Time: {BUILD_TIME}</div>
      <ReactAntdFormSchema
        className="p-5 bg-slate-200 rounded-lg"
        footerClassName="mb-0"
        form={form}
        meta={meta}
        onFinish={(values) => console.log(values)}>
        <NiceForm
          meta={{
            fields: [{ key: 'ext-single-field', widgetProps: { placeholder: 'Single Field' } }],
          }}
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </ReactAntdFormSchema>
    </Card>
  );
}

export default App;

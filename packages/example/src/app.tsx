import ReactAntdFormSchema, { GroupsMode } from '@jswork/react-ant-form-schema/src/main';
import React, { useEffect } from 'react';
import { Button, Card, Form, Space } from 'antd';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';

function App() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  // Standard mode example
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

  // Shared groups data
  const groupsData = [
    {
      title: 'Personal Information',
      meta: {
        fields: [
          { key: 'firstName', label: 'First Name', required: true },
          { key: 'lastName', label: 'Last Name', required: true },
        ],
      } as NiceFormMeta,
    },
    {
      title: 'Account Information',
      meta: {
        fields: [
          { key: 'email', label: 'Email', type: 'email', required: true },
          { key: 'phone', label: 'Phone Number' },
        ],
      } as NiceFormMeta,
    },
    {
      title: 'Contact Information',
      meta: {
        fields: [
          { key: 'address', label: 'Address' },
          { key: 'city', label: 'City' },
        ],
      } as NiceFormMeta,
    },
  ];

  // Groups mode (fieldset)
  const metaWithGroups = {
    columns: 1,
    rowGap: 10,
    initialValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'New York',
    },
    groups: groupsData,
  };

  // Groups mode (tabs)
  const metaWithTabs = {
    columns: 1,
    rowGap: 10,
    groupsMode: GroupsMode.Tabs,
    tabProps: {
      type: 'card',
      size: 'large',
      tabBarStyle: { marginBottom: 16 },
    } as const,
    initialValues: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      address: '456 Oak Ave',
      city: 'Los Angeles',
    },
    groups: groupsData,
  };

  useEffect(() => {
    // simulate async fetch data
    setLoading(true);
    setTimeout(() => {
      form.setFieldsValue({
        username: 'admin-aric',
        password: '123456-update',
      });
      form2.setFieldsValue({
        firstName: 'John',
        lastName: 'Doe',
      });
      form3.setFieldsValue({
        firstName: 'Jane',
        lastName: 'Smith',
      });
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="mx-auto wp-8 mt-10">
      <div className="badge badge-warning absolute right-0 top-0 m-4">Build Time: {BUILD_TIME}</div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Standard Mode */}
        <Card
          title="Standard Mode"
          classNames={{ body: 'bg-gray-100' }}
          loading={loading}>
          <ReactAntdFormSchema
            className="p-5"
            form={form}
            meta={meta}
            onFinish={(values) => console.log('Standard form:', values)}>
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
        {/* Groups Mode - Fieldset */}
        <Card
          title="Groups Mode (Fieldset)"
          classNames={{ body: 'bg-gray-100' }}
          loading={loading}>
          <ReactAntdFormSchema
            className="p-5"
            form={form2}
            meta={metaWithGroups}
            onFinish={(values) => console.log('Fieldset form:', values)}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </ReactAntdFormSchema>
        </Card>
        {/* Groups Mode - Tabs */}
        <Card
          title="Groups Mode (Tabs)"
          classNames={{ body: 'bg-gray-100' }}
          loading={loading}>
          <ReactAntdFormSchema
            className="p-5"
            form={form3}
            meta={metaWithTabs}
            onFinish={(values) => console.log('Tabs form:', values)}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </ReactAntdFormSchema>
        </Card>
      </Space>
    </div>
  );
}

export default App;

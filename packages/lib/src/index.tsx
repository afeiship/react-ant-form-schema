import cx from 'classnames';
import React, { type ReactNode } from 'react';
import { Form, FormInstance } from 'antd';
import DefaultForm from './components/default-form';
import FieldsetGroups from './components/fieldset-groups';
import TabsGroups from './components/tabs-groups';
import { ReactAntdFormSchemaProps } from './types';

const CLASS_NAME = 'react-ant-form-schema';
const DEFAULT_META = {
  vertical: {
    labelWidth: 24,
  },
  // 这个是 nice-form-react 默认的 meta 数据，其它设置不生效
  // wrapperProps.labelCol.span 这个属性是 deprecated 的，请使用 labelWidth
  horizontal: {
    labelWidth: 4,
  },
};

const defaultProps: Partial<ReactAntdFormSchemaProps> = {
  header: null,
  layout: 'horizontal',
};

const ReactAntdFormSchema = React.forwardRef<FormInstance, ReactAntdFormSchemaProps>(
  (props, ref) => {
    const { className, meta, header, children, actionsClassName, layout, ...rest } = {
      ...defaultProps,
      ...props,
    };
    const footerNode = children as ReactNode;
    const defaultMeta = DEFAULT_META[layout!];

    // Check if groups mode is enabled
    const isGroupsMode = meta.groups && meta.groups.length > 0;
    const groupsMode = meta.groupsMode || 'fieldset';

    // Render form content based on mode
    const renderContent = () => {
      if (isGroupsMode) {
        if (groupsMode === 'tabs') {
          return <TabsGroups groups={meta.groups!} defaultMeta={defaultMeta} tabProps={meta.tabProps} />;
        }
        // fieldset mode (default)
        return <FieldsetGroups groups={meta.groups!} defaultMeta={defaultMeta} />;
      }
      // standard mode
      return <DefaultForm meta={{ ...defaultMeta, ...meta }} />;
    };

    return (
      <Form
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        layout={layout}
        ref={ref}
        {...rest}>
        {header}
        {renderContent()}
        <Form.Item
          wrapperCol={{ offset: layout === 'horizontal' ? defaultMeta?.labelWidth : 0 }}
          className={actionsClassName}
          style={{ marginBottom: 0 }}>
          {footerNode}
        </Form.Item>
      </Form>
    );
  },
);

export default ReactAntdFormSchema;

import cx from 'classnames';
import React, { ReactNode } from 'react';
import { Form, FormInstance, FormProps, Tabs, TabsProps } from 'antd';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';
import { deepMerge } from './utils';

export type GroupsMode = 'fieldset' | 'tabs';

export type NiceFormGroup = {
  /**
   * The group title displayed in legend.
   */
  title: string;
  /**
   * The form meta for this group.
   */
  meta: NiceFormMeta;
};

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

export type ReactAntdFormSchemaMeta = NiceFormMeta & {
  /**
   * Form groups for grouped mode.
   * When groups is provided, fields will be rendered in groups.
   */
  groups?: NiceFormGroup[];
  /**
   * Display mode for groups.
   * - 'fieldset': Render groups as fieldset/legend elements
   * - 'tabs': Render groups as tabs
   */
  groupsMode?: GroupsMode;
  /**
   * Props to pass to Tabs component when groupsMode is 'tabs'.
   */
  tabProps?: TabsProps;
};

export type ReactAntdFormSchemaProps = {
  /**
   * The form schema meta data.
   */
  meta: ReactAntdFormSchemaMeta;
  /**
   * The header content.
   */
  header?: ReactNode;
  /**
   * The form actions className.
   */
  actionsClassName?: string;
} & FormProps;

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
    const _meta = deepMerge(DEFAULT_META[layout!], meta) as NiceFormMeta;
    const _offset = layout === 'horizontal' ? _meta?.labelWidth : 0;

    // Check if groups mode is enabled
    const isGroupsMode = meta.groups && meta.groups.length > 0;
    const groupsMode = meta.groupsMode || 'fieldset';

    const renderGroupsContent = () => {
      if (groupsMode === 'tabs') {
        const tabItems = meta.groups!.map((group, index) => {
          const groupMeta = deepMerge(DEFAULT_META[layout!], group.meta) as NiceFormMeta;
          return {
            key: String(index),
            label: group.title,
            children: <NiceForm meta={groupMeta} />,
          };
        });
        return (
          <Tabs
            items={tabItems}
            className="react-ant-form-schema-tabs"
            {...meta.tabProps}
          />
        );
      } else {
        // fieldset mode (default)
        return (
          <div className="react-ant-form-schema-groups">
            {meta.groups?.map((group, index) => {
              const groupMeta = deepMerge(DEFAULT_META[layout!], group.meta) as NiceFormMeta;
              return (
                <fieldset key={index} className="react-ant-form-schema-fieldset">
                  <legend className="react-ant-form-schema-legend">{group.title}</legend>
                  <NiceForm meta={groupMeta} />
                </fieldset>
              );
            })}
          </div>
        );
      }
    };

    return (
      <Form
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        layout={layout}
        ref={ref}
        {...rest}>
        {header}
        {isGroupsMode ? renderGroupsContent() : <NiceForm meta={_meta} />}
        <Form.Item
          wrapperCol={{ offset: _offset }}
          className={actionsClassName}
          style={{ marginBottom: 0 }}>
          {footerNode}
        </Form.Item>
      </Form>
    );
  },
);

export default ReactAntdFormSchema;

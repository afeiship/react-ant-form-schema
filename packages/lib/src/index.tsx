import cx from 'classnames';
import React, { ReactNode } from 'react';
import { Form, FormInstance, FormProps } from 'antd';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';
import { deepMerge } from './utils';

const CLASS_NAME = 'react-ant-form-schema';
const DEFAULT_META = {
  layout: 'vertical',
  wrapperProps: {
    labelCol: {
      span: 4,
    },
  },
};

export type ReactAntdFormSchemaProps = {
  /**
   * The form schema meta data.
   */
  meta: NiceFormMeta;
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
};

const ReactAntdFormSchema = React.forwardRef<FormInstance, ReactAntdFormSchemaProps>(
  (props, ref) => {
    const { className, meta, header, children, actionsClassName, layout, ...rest } = {
      ...defaultProps,
      ...props,
    };
    const footerNode = children as ReactNode;
    const _meta = deepMerge(DEFAULT_META, meta) as NiceFormMeta;
    const _layout = layout || _meta?.layout;
    const _offset = _layout === 'horizontal' ? _meta?.wrapperProps?.labelCol?.span : 0;

    return (
      <Form
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        layout={_layout}
        ref={ref}
        {...rest}>
        {header}
        <NiceForm meta={_meta} />
        <Form.Item
          wrapperCol={{ offset: _offset }}
          className={actionsClassName}
          style={{ marginBottom: 0 }}>
          {footerNode}
        </Form.Item>
      </Form>
    );
  }
);

export default ReactAntdFormSchema;

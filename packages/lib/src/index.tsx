import cx from 'classnames';
import React, { FC, ReactNode } from 'react';
import { Form, FormProps } from 'antd';
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
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * The form schema meta data.
   */
  meta: NiceFormMeta;
  /**
   * The header content.
   */
  header?: ReactNode;
  /**
   * The footer content.
   */
  footer?: ReactNode;
  /**
   * The form content.
   */
  footerClassName?: string;
} & FormProps;

const defaultProps = {
  className: '',
  header: null,
  footer: null,
  footerClassName: '',
};

const ReactAntdFormSchema: FC<ReactAntdFormSchemaProps> = (props) => {
  const { className, meta, header, footer, children, footerClassName, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const footerNode = footer || (children as ReactNode);
  const _meta = deepMerge(DEFAULT_META, meta);
  const _offset = _meta?.wrapperProps?.labelCol?.span || 4;

  return (
    <Form data-component={CLASS_NAME} className={cx(CLASS_NAME, className)} {...rest}>
      {header}
      <NiceForm meta={_meta} />
      <Form.Item
        wrapperCol={{ offset: _offset }}
        className={footerClassName}
        style={{ marginBottom: 0 }}>
        {footerNode}
      </Form.Item>
    </Form>
  );
};

export default ReactAntdFormSchema;

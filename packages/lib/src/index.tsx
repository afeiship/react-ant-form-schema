import cx from 'classnames';
import React, { Component, ReactNode } from 'react';
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
   * The extended className for component.
   * @default ''
   */
  className?: string;
  meta: NiceFormMeta;
  header?: ReactNode;
  footer?: ReactNode;
} & FormProps;


export default class ReactAntdFormSchema extends Component<ReactAntdFormSchemaProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {};
  private formRef = React.createRef<FormInstance<any>>();

  render() {
    const { className, meta, header, footer, children, ...rest } = this.props;
    const footerNode = footer || children as ReactNode;
    const _meta = deepMerge(DEFAULT_META, meta);
    const _offset = _meta?.wrapperProps?.labelCol?.span || 4;

    return (
      <Form ref={this.formRef}
            data-component={CLASS_NAME}
            className={cx(CLASS_NAME, className)}
            {...rest}>
        {header}
        <NiceForm meta={_meta} />
        <Form.Item wrapperCol={{ offset: _offset }} style={{ marginBottom: 0 }}>
          {footerNode}
        </Form.Item>
      </Form>
    );
  }
}

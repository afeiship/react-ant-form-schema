import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactList from '@feizheng/react-list';
import noop from '@feizheng/noop';
import deepEqual from 'deep-equal';
import { Form, Button, Input } from 'antd';
import get from 'lodash.get';

const CLASS_NAME = 'react-ant-form-schema';
const submitProps = { type: 'primary', htmlType: 'submit', children: 'Save' };

const DEFAULT_TEMPLATE = ({ index, item }, cb) => {
  const rules = get(item, 'options.rules', []);
  return (
    <Form.Item
      name={item.field}
      rules={rules}
      className={`${CLASS_NAME}__field`}
      {...item.formLayout}
      key={index}
      label={item.label}
      children={cb()}
      {...item.options}
    />
  );
};

export default class ReactAntForm extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * Default fileds value object.
     */
    initialValue: PropTypes.object,
    /**
     * Form schema.
     */
    items: PropTypes.array,
    /**
     * The form field template.
     */
    template: PropTypes.func,
    /**
     * Default item component.
     */
    defaultComponent: PropTypes.any,
    /**
     * The onSubmit event.
     */
    onSubmit: PropTypes.func,
    /**
     * The form filed onChange event.
     */
    onChange: PropTypes.func,
    /**
     * The item filed onChange event.
     */
    onFieldChange: PropTypes.func,
    /**
     * When component did mount.
     */
    onLoad: PropTypes.func,
    /**
     * The formLayout for antd.Form.
     */
    formLayout: PropTypes.object,
    /**
     * The formLayout for last form item (eg: like actions).
     */
    tailLayout: PropTypes.object,
    /**
     * The submit props.
     */
    submit: PropTypes.object,
    /**
     * The reset props.
     */
    reset: PropTypes.object
  };

  static defaultProps = {
    initialValue: {},
    items: [],
    template: DEFAULT_TEMPLATE,
    defaultComponent: Input,
    onSubmit: noop,
    onChange: noop,
    onFieldChange: noop,
    onLoad: noop,
    submit: submitProps
  };

  get formView() {
    const { items } = this.props;
    return <ReactList items={items} template={this.template} />;
  }

  get actionView() {
    const { tailLayout, submit, reset, children } = this.props;
    if (!submit && !reset) return children || null;
    return (
      <Form.Item
        {...tailLayout}
        className={`${CLASS_NAME}__actions`}
        colon={false}>
        <Button {...submit} />
        {reset && <Button onClick={this.handleReset} {...reset} />}
      </Form.Item>
    );
  }

  componentDidMount() {
    const { onLoad, initialValue } = this.props;
    const { setFieldsValue } = this.form;
    setFieldsValue(initialValue);
    onLoad({
      target: this.form
    });
  }

  shouldComponentUpdate(inProps) {
    const { setFields } = this.form;
    const { fieldsValue } = inProps;
    if (!deepEqual(fieldsValue, this.props.fieldsValue)) {
      setFields(fieldsValue);
    }
    return true;
  }

  handleSubmit = (inEvent) => {
    inEvent.preventDefault();
    const { onSubmit } = this.props;
    this.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  handleReset = () => {
    const { initialValue } = this.props;
    this.form.resetFields();
    this.form.setFieldsValue(initialValue);
  };

  handleItemChange = (inItem, inEvent) => {
    const { onChange, onFieldChange } = this.props;
    const value = this.form.getFieldsValue();
    const { field } = inItem;

    onFieldChange({ target: { field, value: inEvent.target.value } });
    onChange({ target: { field, value } });
  };

  template = ({ index, item }) => {
    const { template, defaultComponent } = this.props;
    const { component, props } = item;
    const ItemComponent = component || defaultComponent;
    const cb = () => {
      return (
        <ItemComponent
          onChange={this.handleItemChange.bind(this, item)}
          {...props}
        />
      );
    };
    return template({ index, item }, cb);
  };

  render() {
    const {
      className,
      initialValue,
      items,
      template,
      defaultComponent,
      onSubmit,
      onChange,
      onFieldChange,
      onLoad,
      formLayout,
      tailLayout,
      submit,
      reset,
      form,
      ...props
    } = this.props;
    return (
      <Form
        {...formLayout}
        ref={(form) => (this.form = form)}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        onSubmit={this.handleSubmit}
        {...props}>
        {this.formView}
        {this.actionView}
      </Form>
    );
  }
}
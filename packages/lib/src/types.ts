import { TabsProps } from 'antd';
import { NiceFormMeta } from '@ebay/nice-form-react';
import { ReactNode } from 'react';
import { FormProps } from 'antd';

export enum GroupsMode {
  Fieldset = 'fieldset',
  Tabs = 'tabs',
}

export type NiceFormGroup = {
  /**
   * The group title displayed in legend or tab.
   */
  title: string;
  /**
   * The form meta for this group.
   */
  meta: NiceFormMeta;
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

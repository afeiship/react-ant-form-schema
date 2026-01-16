import React from 'react';
import { Tabs, TabsProps } from 'antd';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';
import { NiceFormGroup } from '../types';

export type TabsGroupsProps = {
  groups: NiceFormGroup[];
  defaultMeta: Record<string, any>;
  tabProps?: TabsProps;
};

const TabsGroups = ({ groups, defaultMeta, tabProps }: TabsGroupsProps) => {
  const tabItems = groups.map((group) => {
    const groupMeta = { ...defaultMeta, ...group.meta } as NiceFormMeta;
    return {
      key: group.title,
      label: group.title,
      children: <NiceForm meta={groupMeta} />,
    };
  });

  return (
    <Tabs
      items={tabItems}
      className="react-ant-form-schema-tabs"
      {...tabProps}
    />
  );
};

export default TabsGroups;

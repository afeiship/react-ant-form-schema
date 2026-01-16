import React from 'react';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';
import { NiceFormGroup } from '../types';

export type FieldsetGroupsProps = {
  groups: NiceFormGroup[];
  defaultMeta: Record<string, any>;
};

const FieldsetGroups = ({ groups, defaultMeta }: FieldsetGroupsProps) => {
  return (
    <div className="react-ant-form-schema-groups">
      {groups.map((group, index) => {
        const groupMeta = { ...defaultMeta, ...group.meta } as NiceFormMeta;
        return (
          <fieldset key={index} className="react-ant-form-schema-fieldset">
            <legend className="react-ant-form-schema-legend">{group.title}</legend>
            <NiceForm meta={groupMeta} />
          </fieldset>
        );
      })}
    </div>
  );
};

export default FieldsetGroups;

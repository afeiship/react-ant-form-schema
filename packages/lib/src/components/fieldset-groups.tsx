import React from 'react';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';
import { NiceFormGroup } from '../types';
import cx from 'classnames';

export type FieldsetGroupsProps = {
  groups: NiceFormGroup[];
  defaultMeta: Record<string, unknown>;
  fieldsetsSx?: {
    container?: string;
    fieldset?: string;
    legend?: string;
  }
};

const FieldsetGroups = ({ groups, defaultMeta, fieldsetsSx }: FieldsetGroupsProps) => {
  return (
    <div className={cx('react-ant-form-schema-fieldset-groups', fieldsetsSx?.container)}>
      {groups.map((group, index) => {
        const groupMeta = { ...defaultMeta, ...group.meta } as NiceFormMeta;
        return (
          <fieldset key={index} className={fieldsetsSx?.fieldset}>
            <legend className={fieldsetsSx?.legend}>{group.title}</legend>
            <NiceForm meta={groupMeta} />
          </fieldset>
        );
      })}
    </div>
  );
};

export default FieldsetGroups;

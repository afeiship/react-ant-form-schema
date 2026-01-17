import React from 'react';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';
import { NiceFormGroup } from '../types';
import cx from 'classnames';

export type FieldsetGroupsProps = {
  groups: NiceFormGroup[];
  defaultMeta: Record<string, unknown>;
  fieldsetSx?: {
    container?: string;
    fieldset?: string;
    legend?: string;
  }
};

const FieldsetGroups = ({ groups, defaultMeta, fieldsetSx }: FieldsetGroupsProps) => {
  return (
    <div className={cx('react-ant-form-schema-fieldset-groups', fieldsetSx?.container)}>
      {groups.map((group, index) => {
        const groupMeta = { ...defaultMeta, ...group.meta } as NiceFormMeta;
        return (
          <fieldset key={index} className={fieldsetSx?.fieldset}>
            <legend className={fieldsetSx?.legend}>{group.title}</legend>
            <NiceForm meta={groupMeta} />
          </fieldset>
        );
      })}
    </div>
  );
};

export default FieldsetGroups;

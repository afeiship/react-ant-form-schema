import React from 'react';
import NiceForm, { NiceFormMeta } from '@ebay/nice-form-react';

export type DefaultFormProps = {
  meta: NiceFormMeta;
};

const DefaultForm = ({ meta }: DefaultFormProps) => {
  return <NiceForm meta={meta} />;
};

export default DefaultForm;

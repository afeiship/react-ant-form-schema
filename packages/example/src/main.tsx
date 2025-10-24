import React from 'react';
import ReactDOM from 'react-dom/client';
import { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';

niceFormConfig.addAdapter(antdAdapter);

import App from './app';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

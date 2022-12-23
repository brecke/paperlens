// eslint-disable-next-line import/no-unassigned-import
import './wdyr';

import React from 'react';
// eslint-disable-next-line n/file-extension-in-import
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App.js';
import './index.scss';
import store from './store';

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);

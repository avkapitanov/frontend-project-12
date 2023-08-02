import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import init from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const dom = await init();
  root.render(<React.StrictMode>{dom}</React.StrictMode>);
};

await app();
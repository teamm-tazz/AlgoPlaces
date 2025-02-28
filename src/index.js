import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';

import App from './components/App';
import './styles/tailwind.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);

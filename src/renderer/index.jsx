import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import MenuContextProvider from './contexts/memuContext';



ReactDOM.render(
  <MenuContextProvider>
    <App />
  </MenuContextProvider>,
  document.getElementById('root'));

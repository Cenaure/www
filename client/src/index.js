import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import userStore from './store/userStore';
import deviceStore from './store/deviceStore';
import brandStore from './store/brandStore';
import typeStore from './store/typeStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value = {{
      user: new userStore(),
      device: new deviceStore(),
      brand: new brandStore(),
      type: new typeStore()
    }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
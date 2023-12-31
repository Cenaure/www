import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import userStore from './store/userStore';
import deviceStore from './store/deviceStore';
import brandStore from './store/brandStore';
import typeStore from './store/typeStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import serverError from './store/serverErrorStore.jsx';

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value = {{
      user: new userStore(),
      device: new deviceStore(),
      brand: new brandStore(),
      type: new typeStore(),
      server: new serverError()
    }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
)

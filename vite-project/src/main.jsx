import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import userStore from './store/userStore';
import deviceStore from './store/deviceStore';
import brandStore from './store/brandStore';
import typeStore from './store/typeStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import serverError from './store/serverErrorStore.jsx';
import basketStore from './store/basketStore.jsx';

export const Context = createContext(null);

const user = new userStore();
const device = new deviceStore();
const brand = new brandStore();
const type = new typeStore();
const basket = new basketStore();
const server = new serverError();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value = {{
      user,
      device,
      brand,
      type,
      basket,
      server
    }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './styles/index.scss';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

import { Provider } from 'react-redux';
import store from './store';
import Root from './components/layouts/Root/index.tsx';
import Home from './components/pages/Home/Home.tsx';
import Error from './components/pages/Error/Error.tsx';
import CardDetail from './components/elements/CardDetail/CardDetail.tsx';
// Test du composant login 04.07.2024
import Login from './components/elements/Login/Login.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
interface IUserData {
  name: string;
  uuid: string;
}

const authStore = createStore<IUserData>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route index element={<Home />} />

      {/* essaie du composant login 04.07.2024 */}
      <Route path="/login" element={<Login />} />

      {/* <Route path="/login" element={<Registration />} /> */}
      <Route path="/:slug" element={<CardDetail />} />
      <Route path="/404" element={<Error />} />

      <Route path="*" element={<Error />} />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider store={authStore}>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

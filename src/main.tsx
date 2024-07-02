import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './styles/index.scss';

import { Provider } from 'react-redux';
import store from './store';
import Root from './components/layouts/Root/index.tsx';
import Home from './components/pages/Home/Home.tsx';
import Error from './components/pages/Error/Error.tsx';
import CardDetail from './components/elements/CardDetail/CardDetail.tsx';
import Registration from './components/pages/Registration/Registration.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Registration />} />
      <Route path="/:slug" element={<CardDetail />} />
      <Route path="/404" element={<Error />} />

      <Route path="*" element={<Error />} />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

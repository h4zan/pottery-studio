import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Shop } from './pages/Shop/Shop';
import { Collections } from './pages/Collections/Collections';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { Workshops } from './pages/Workshops/Workshops';
import { Contact } from './pages/Contact/Contact';
import { Product } from './pages/Product/Product';
import { Collection } from './components/Collection/Collection';
import { Checkout } from './components/Checkout/Checkout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
      },
      { path: '/about', element: <About /> },
      {
        path: '/products',
        element: <Shop />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/collections',
        element: <Collections />,
      },
      {
        path: '/collection/:id',
        element: <Collection />,
      },
      { path: '/workshops', element: <Workshops /> },
      { path: '/contact', element: <Contact /> },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

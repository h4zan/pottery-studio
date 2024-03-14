import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import './App.css';
import { useEffect, useReducer } from 'react';
import { IActionType, ProductReducer } from './reducer/ProductReducer';
import { getProducts } from './services/strapiService';
import { ProductsContext } from './contexts/ProductContext/ProductContext';
import { ProductDispatchContext } from './contexts/ProductContext/ProductDispatchContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const [products, dispatch] = useReducer(ProductReducer, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const productsFromApi = await getProducts();
        dispatch({
          type: IActionType.GETALL,
          payload: JSON.stringify(productsFromApi),
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (products.length === 0) {
      getData();
    }
  }, [products, dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ProductsContext.Provider value={products}>
        <ProductDispatchContext.Provider value={dispatch}>
          <RouterProvider router={router}></RouterProvider>
        </ProductDispatchContext.Provider>
      </ProductsContext.Provider>{' '}
    </LocalizationProvider>
  );
}

export default App;

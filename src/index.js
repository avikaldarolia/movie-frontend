import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};
const theme = extendTheme({ colors });

root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </ChakraProvider>
);

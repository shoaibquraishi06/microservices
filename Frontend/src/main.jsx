
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { CartProvider } from "./context/CartContext";
import App from "./App";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
    <Provider store={store}>
    <CartProvider>
      <App />
    </CartProvider>
  </Provider>

    </BrowserRouter>
  </StrictMode>,
);

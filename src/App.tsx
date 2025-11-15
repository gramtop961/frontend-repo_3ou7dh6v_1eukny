import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AppProvider } from './state';
import './index.css';
import './styles.css';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

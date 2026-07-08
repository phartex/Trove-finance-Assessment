'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#13342F',
          color: '#fff',
          borderRadius: '12px',
          padding: '12px 24px',
        },
        success: {
          style: {
            background: '#059A83',
          },
        },
        error: {
          style: {
            background: '#BF221C',
          },
        },
      }}
    />
  );
}

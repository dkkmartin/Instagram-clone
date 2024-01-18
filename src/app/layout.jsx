import './globals.css';
import * as React from "react";
import { NextUIProvider } from '@nextui-org/react';

export const metadata = {
  title: 'Instagram clone',
  description: 'Instagram clone',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextUIProvider>
        
      </NextUIProvider>
      <body>{children}</body>
    </html>
  );
}

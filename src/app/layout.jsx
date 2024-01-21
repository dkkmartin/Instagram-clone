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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </NextUIProvider>
      <body>{children}</body>
    </html>
  );
}

'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Button, buttonGroup } from '@nextui-org/react';

export default function Home() {
  return (
    <NextUIProvider>
      <div className="container">
        <Button color="primary">Test</Button>
      </div>
    </NextUIProvider>
  );
}

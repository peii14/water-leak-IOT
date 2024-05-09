'use client';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

import '@/_styles/globals.css';

import Header from '@/_components/layout/navbar/Header';
import DismissableToast from '@/_components/shared/DismissableToast';
import Progress from '@/_components/shared/Progress';
import QueryProvider from '@/_components/shared/QueryProvider';

export default function LoginLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <QueryProvider>
        <Progress color='#282828'>
          <DismissableToast />
          <SessionProvider>
            <body>
              <Header />
              {children}
            </body>
          </SessionProvider>
        </Progress>
      </QueryProvider>
    </html>
  );
}

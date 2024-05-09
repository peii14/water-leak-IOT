import { Metadata } from 'next';
import * as React from 'react';

import '@/_styles/globals.css';

import DismissableToast from '@/_components/shared/DismissableToast';
import Progress from '@/_components/shared/Progress';
import QueryProvider from '@/_components/shared/QueryProvider';
import { siteConfig } from '@/_constants/config';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },

  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
  authors: [
    {
      name: 'Gayuh Kautaman',
      url: 'https://gayuh-kautaman.com',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id'>
      <QueryProvider>
        <DismissableToast />
        <Progress color='#0072BC'>
          <body>{children}</body>
        </Progress>
      </QueryProvider>
    </html>
  );
}

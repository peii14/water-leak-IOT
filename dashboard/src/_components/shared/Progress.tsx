'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Progress({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <>
      {children}
      <ProgressBar
        height='3px'
        color={color || '#F0F0F0'}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

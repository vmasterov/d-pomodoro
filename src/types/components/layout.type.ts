import type { ReactNode } from 'react';

export type TLayoutProps = {
  title: string;
  subtitle?: string;
  controls: ReactNode;
  content: ReactNode;
};

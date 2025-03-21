'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const queryClinet = new QueryClient();

export const QueryProvider = (props: Props) => {
  return (
    <QueryClientProvider client={queryClinet}>
      {props.children}
    </QueryClientProvider>
  );
};

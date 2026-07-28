import config from '../../../payload.config';
import '@payloadcms/ui/styles.css';
import { RootLayout } from '@payloadcms/next/layouts';
import React from 'react';

import { importMap } from './admin/importMap.js';
import './custom.css';

type Args = {
  children: React.ReactNode;
};

const serverFunction = async (args: any) => {
  'use server';
  const { handleServerFunctions } = await import('@payloadcms/next/layouts');
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;

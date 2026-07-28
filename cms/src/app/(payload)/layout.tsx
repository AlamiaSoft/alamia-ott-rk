import '@payloadcms/ui/styles.css';
import React from 'react';
import { RootLayout } from '@payloadcms/next/layouts';
import { handleServerFunctions } from '@payloadcms/next/utilities';
import config from '../../../payload.config';
import { importMap } from './importMap';
import './custom.css';

type Args = {
  children: React.ReactNode;
};

const serverFunction = async (args: any) => {
  'use server';
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

import React, { Component } from 'react';
import { } from 'react-native';
import BaseRoute from './BaseRoute';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import BaseContext from '../Context/BaseContext';

export default function Navigation(params) {
  return (
    <>
      <BaseContext>
        <PaperProvider>
          <BaseRoute />
          <Toast />
        </PaperProvider>
      </BaseContext>
    </>
  )
}
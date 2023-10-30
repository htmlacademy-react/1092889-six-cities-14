import React from 'react';
import {Header} from '../header/Header.tsx';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {getOffersMocks} from '../../mocks/offersMocks.ts';

export const App = () => (
  <React.Fragment>
    <Header/>
    <MainScreen cards={getOffersMocks(15)}/>
  </React.Fragment>
);

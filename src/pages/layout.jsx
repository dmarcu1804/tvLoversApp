import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

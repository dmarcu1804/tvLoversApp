import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Basket } from '../components/Basket';
import "./Layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="mainGrid">{children} <Basket /> </main>
      <Footer />
    </div>
  );
};

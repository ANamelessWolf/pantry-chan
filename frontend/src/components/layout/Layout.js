import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Container } from '@mui/material';

function Layout({ children }) {
  return (
    <div className="layout">
      <NavBar />
      <Container sx={{ minHeight: '80vh', py: 4 }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;

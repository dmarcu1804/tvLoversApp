import React from 'react';
import styles from './Header.module.css';
import { Container, Grid, Item } from '../Grid';

export const Header = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shows', href: '/shows' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className={styles.header}>
      <Container>
        <Grid>
          <Item xxlSpan={2} xlSpan={2} lgSpan={2} mdSpan={2} smSpan={12}>
            <h1 className={styles.logo}>TV App</h1>
          </Item>
          <Item xxlSpan={10} xlSpan={10} lgSpan={10} mdSpan={10} smSpan={12}>
            <nav>
              <ul className={styles.nav}>
                {navLinks.map((link) => (
                  <li key={link.name} className={styles.navItem}>
                    <a href={link.href} className={styles.navLink}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Item>
        </Grid>
      </Container>
    </header>
  );
};

import React from 'react';
import styles from './Footer.module.css';
import { Container, Grid, Item } from '../Grid';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Contact us', url: '/contact' },
  ];
  const socialMediaLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/tvshowapp' },
    { name: 'Twitter', url: 'https://www.twitter.com/tvshowapp' },
    { name: 'Instagram', url: 'https://www.instagram.com/tvshowapp' },
  ];

  return (
    <footer className={styles.footer}>
      <Container className={styles.footerContainer}>
        <Grid>
          <Item xxlSpan={3} xlSpan={3} lSpan={3} mSpan={2}>
            <ul className={styles.linksGroup}>
              <li className={styles.footerLinksHeader}>Footer links</li>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className={styles.link}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Item>
          <Item xxlSpan={3} xlSpan={3} lSpan={3} mSpan={2}>
            <ul className={styles.linksGroup}>
              <li className={styles.footerLinksHeader}>Follow us</li>
              {socialMediaLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className={styles.link}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Item>
          <Item xxlSpan={6} xlSpan={6} lSpan={6} mSpan={4}>
            <p className={styles.footerText}>Contact: info@tvshowapp.com</p>
          </Item>
        </Grid>
      </Container>
    </footer>
  );
};

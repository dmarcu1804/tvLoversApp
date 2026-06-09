import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NavBar from '.';

describe('Navbar component', () => {
  it('should navbar', () => {
    render(<NavBar />);
    const navBar = screen.getByTestId('navbar');
    expect(navBar).toBeInTheDocument();
  });
});

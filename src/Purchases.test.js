import { render, screen } from '@testing-library/react';
import Purchases from './Purchases';

test('renders learn react link', () => {
  render(<Purchases />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

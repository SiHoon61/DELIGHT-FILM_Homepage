import { render, screen } from '@testing-library/react';

jest.mock('react-responsive-masonry', () => {
  const MockMasonry = ({ children }) => <div>{children}</div>;

  return {
    __esModule: true,
    default: MockMasonry,
    ResponsiveMasonry: MockMasonry,
  };
});

import App from './App';

beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal';
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  document.getElementById('modal')?.remove();
});

test('renders the Delight Film consultation entry point', () => {
  render(<App />);
  expect(
    screen.getByRole('button', { name: '실시간 상담' })
  ).toBeInTheDocument();
});

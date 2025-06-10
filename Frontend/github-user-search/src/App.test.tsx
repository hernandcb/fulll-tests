import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders search input with placeholder', () => {
    // Render the App component
    render(<App />);

    // Check if the input element is in the document
    expect(screen.getByPlaceholderText('Search input')).toBeInTheDocument();
  });

  it('Updates input value on change', async () => {
    // Render the App component
    render(<App />);

    const input = screen.getByPlaceholderText(
      'Search input',
    ) as HTMLInputElement;
    await userEvent.type(input, 'test user');

    expect(input.value).toBe('test user');
  });
});

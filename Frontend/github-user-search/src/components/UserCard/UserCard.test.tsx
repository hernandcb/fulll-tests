import { render, screen } from '@testing-library/react';
import type { User } from '../../types/User';
import { UserCard } from './UserCard';

// Mock user data
const mockUser: User = {
  login: 'testuser',
  id: 12345,
  avatar_url: 'https://example.com/avatar.jpg',
  url: 'github.com/testuser',
};

describe('Test UserCard component', () => {
  it('renders the user information', () => {
    // Prepare
    const mockToogleSelection = vi.fn();

    // Render the UserCard component
    render(
      <UserCard
        user={mockUser}
        selected={false}
        toogleSelection={mockToogleSelection}
      />,
    );

    // Check if the data is displayed correctly

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(
      screen.getByAltText(`Avatar of ${mockUser.login}`),
    ).toBeInTheDocument();
    expect(screen.getByText(mockUser.id.toString())).toBeInTheDocument();
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `https://github.com/${mockUser.login}`,
    );
  });

  it('renders the checkbox when editMode is true', () => {
    // Prepare
    const mockToogleSelection = vi.fn();

    // Render
    render(
      <UserCard
        user={mockUser}
        selected={false}
        toogleSelection={mockToogleSelection}
        editMode={true}
      />,
    );

    // Check if the checkbox is rendered
    const checkbox = screen.getByRole('checkbox');
    console.log(checkbox);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute(
      'aria-label',
      `Select user ${mockUser.login}`,
    );
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('calls toogleSelection when checkbox is clicked', () => {
    // Prepare
    const mockToogleSelection = vi.fn();

    // Render the UserCard component with editMode enabled
    render(
      <UserCard
        user={mockUser}
        selected={false}
        toogleSelection={mockToogleSelection}
        editMode={true}
      />,
    );

    // Find the checkbox and click it
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();

    // Check if the toogleSelection function was called with the correct user ID
    expect(mockToogleSelection).toHaveBeenCalledWith(mockUser.id);
  });

  it('is selected when the selected prop is true', () => {
    // Prepare
    const mockToogleSelection = vi.fn();

    // Render the UserCard component with selected prop set to true
    render(
      <UserCard
        user={mockUser}
        selected={true}
        toogleSelection={mockToogleSelection}
        editMode={true}
      />,
    );

    // Check if the checkbox is checked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });
});

import { render, screen } from '@testing-library/react';
import type { User } from '../../types/User';
import { UserCard } from './UserCard';

describe('Test UserCard component', () => {
  it('renders UserCard component', () => {
    // Prepare mock data
    const mockUser: User = {
      login: 'testuser',
      id: 12345,
      avatar_url: 'https://example.com/avatar.jpg',
      url: 'github.com/testuser',
    };

    // Mock the toogleSelection function
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
});

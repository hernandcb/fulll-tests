import userEvent from '@testing-library/user-event';
import App from './App';
import { render, screen, waitFor } from '@testing-library/react';
import * as useGithubSearchModule from './hooks/useGithubSearch';
import { vi, type Mock } from 'vitest';

// Mock the useGithubSearch hook
vi.mock('./hooks/useGithubSearch');

// Mock useDebounce to call immediately
vi.mock('./hooks/useDebounce', () => ({
  useDebounce: (fn: unknown) => fn,
}));

describe('App', () => {
  it('renders search input with placeholder', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search input')).toBeInTheDocument();
  });

  it('Updates input value on change', async () => {
    render(<App />);
    // Type in the search input
    const input = screen.getByPlaceholderText(
      'Search input',
    ) as HTMLInputElement;
    await userEvent.type(input, 'test user');

    // Assert
    expect(input.value).toBe('test user');
  });

  it('displays a message if the API limit was exceeded', async () => {
    (useGithubSearchModule.useGithubSearch as Mock).mockImplementation(() => ({
      loading: false,
      apiLimitExceeded: true, // simulate API limit exceeded here
      searchUsers: vi.fn().mockResolvedValue([]),
    }));

    render(<App />);
    const input = screen.getByPlaceholderText('Search input');
    await userEvent.type(input, 'abc');
    await waitFor(() => {
      expect(
        screen.getByText('GitHub API limit exceeded. Try again later.'),
      ).toBeInTheDocument();
    });
  });

  it('displays loading indicator while searching', async () => {
    (useGithubSearchModule.useGithubSearch as Mock).mockImplementation(() => ({
      loading: true,
      apiLimitExceeded: false, // simulate API limit exceeded here
      searchUsers: vi.fn().mockResolvedValue([]),
    }));

    render(<App />);
    const input = screen.getByPlaceholderText('Search input');
    await userEvent.type(input, 'abc');
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders user cards when users are returned', async () => {
    // Update the mock to return users
    const mockUsers = [
      { id: 1, login: 'user1', avatar_url: '', html_url: '' },
      { id: 2, login: 'user2', avatar_url: '', html_url: '' },
    ];

    (useGithubSearchModule.useGithubSearch as Mock).mockImplementation(() => ({
      loading: true,
      apiLimitExceeded: false, // simulate API limit exceeded here
      searchUsers: vi.fn().mockResolvedValue(mockUsers),
    }));

    render(<App />);
    const input = screen.getByPlaceholderText('Search input');
    await userEvent.type(input, 'user');

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });

  it('toggles "select all" functionality correctly', async () => {
    const mockUsers = [
      { id: 1, login: 'user1', avatar_url: '', html_url: '' },
      { id: 2, login: 'user2', avatar_url: '', html_url: '' },
    ];
    (useGithubSearchModule.useGithubSearch as Mock).mockImplementation(() => ({
      loading: false,
      apiLimitExceeded: false,
      searchUsers: vi.fn().mockResolvedValue(mockUsers),
    }));

    const { container } = render(<App />);
    const input = screen.getByPlaceholderText('Search input');

    await userEvent.type(input, 'user');
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });

    // Find and click the "Edit mode" checkbox
    const editModeCheckbox = container.querySelector('.edit-mode-toggle input');
    assert(editModeCheckbox);
    await userEvent.click(editModeCheckbox);

    // Find and click the "Select all" checkbox
    const selectAllCheckbox = container.querySelector(
      '.selected-items-count input',
    );
    assert(selectAllCheckbox);
    await userEvent.click(selectAllCheckbox);

    // All user checkboxes should be checked
    const userCheckboxes = container.querySelectorAll(
      '.results input[type="checkbox"]',
    );
    userCheckboxes.forEach((cb) => expect(cb).toBeChecked());

    // Unselect all
    await userEvent.click(selectAllCheckbox);
    console.log();
    userCheckboxes.forEach((cb) => expect(cb).not.toBeChecked());
  });

  it('handles deletion of selected users', async () => {
    const mockUsers = [
      { id: 1, login: 'user1', avatar_url: '', html_url: '' },
      { id: 2, login: 'user2', avatar_url: '', html_url: '' },
    ];
    (useGithubSearchModule.useGithubSearch as Mock).mockImplementation(() => ({
      loading: false,
      apiLimitExceeded: false,
      searchUsers: vi.fn().mockResolvedValue(mockUsers),
    }));

    const { container } = render(<App />);
    const input = screen.getByPlaceholderText('Search input');
    await userEvent.type(input, 'user');
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });

    // Find and click the "Edit mode" checkbox
    const editModeCheckbox = container.querySelector('.edit-mode-toggle input');
    assert(editModeCheckbox);
    await userEvent.click(editModeCheckbox);

    // Select the first user
    const userCheckboxes = container.querySelectorAll(
      '.results input[type="checkbox"]',
    );
    assert(userCheckboxes && userCheckboxes.length == 2);
    await userEvent.click(userCheckboxes[0]);
    expect(userCheckboxes[0]).toBeChecked();

    // Click the delete button
    const deleteButton = await screen.findByTitle('Delete selected users');
    assert(deleteButton);
    await userEvent.click(deleteButton);

    // Only the second user should remain
    await waitFor(() => {
      expect(screen.queryByText('user1')).not.toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });

  it('handles duplication of selected users', async () => {
    const mockUsers = [
      { id: 1, login: 'user1', avatar_url: '', html_url: '' },
      { id: 2, login: 'user2', avatar_url: '', html_url: '' },
    ];
    (useGithubSearchModule.useGithubSearch as Mock).mockImplementation(() => ({
      loading: false,
      apiLimitExceeded: false,
      searchUsers: vi.fn().mockResolvedValue(mockUsers),
    }));

    const { container } = render(<App />);
    const input = screen.getByPlaceholderText('Search input');
    await userEvent.type(input, 'user');
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });

    // Find and click the "Edit mode" checkbox
    const editModeCheckbox = container.querySelector('.edit-mode-toggle input');
    assert(editModeCheckbox);
    await userEvent.click(editModeCheckbox);

    // Select the first user
    const userCheckboxes = container.querySelectorAll(
      '.results input[type="checkbox"]',
    );
    assert(userCheckboxes && userCheckboxes.length == 2);
    await userEvent.click(userCheckboxes[0]);
    expect(userCheckboxes[0]).toBeChecked();

    // Click the duplicate button
    const duplicateButton = await screen.getByTitle('Duplicate selected users');
    await userEvent.click(duplicateButton);

    // The duplicated user should appear with "-copy" in the login
    await waitFor(() => {
      expect(screen.getByText('user1-copy')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });
});

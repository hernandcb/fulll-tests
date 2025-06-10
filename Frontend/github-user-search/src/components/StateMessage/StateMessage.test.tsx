import { render, screen } from '@testing-library/react';
import { StateMessage } from './StateMessage';

describe('State message component', () => {
  it('renders loading message when loading is true', () => {
    // Prepare props
    const props = {
      loading: true,
      apiLimitExceeded: false,
      userQuery: '',
      usersLength: 0,
    };

    // Render the component
    render(<StateMessage {...props} />);

    // Assert
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders api limit exceeded message when has reached limit', () => {
    // Prepare props
    const props = {
      loading: false,
      apiLimitExceeded: true,
      userQuery: '',
      usersLength: 0,
    };

    // Render the component
    render(<StateMessage {...props} />);

    // Assert
    expect(
      screen.getByText('GitHub API limit exceeded. Try again later.'),
    ).toBeInTheDocument();
  });

  it('renders an invitation to start typing when search box is empty', () => {
    // Prepare props
    const props = {
      loading: false,
      apiLimitExceeded: false,
      userQuery: '',
      usersLength: 0,
    };

    // Render the component
    render(<StateMessage {...props} />);

    // Assert
    expect(screen.getByText('Start typing to search')).toBeInTheDocument();
  });

  it('renders a message if no results were found', () => {
    // Prepare props
    const props = {
      loading: false,
      apiLimitExceeded: false,
      userQuery: 'test',
      usersLength: 0,
    };

    // Render the component
    render(<StateMessage {...props} />);

    // Assert
    expect(
      screen.getByText(`No users found for '${props.userQuery}'`),
    ).toBeInTheDocument();
  });
});

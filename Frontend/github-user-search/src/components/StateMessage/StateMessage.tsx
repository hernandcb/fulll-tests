import './StateMessage.css';

interface StateMessageProps {
  loading: boolean;
  apiLimitExceeded: boolean;
  userQuery: string;
  usersLength: number;
}

export const StateMessage: React.FC<StateMessageProps> = ({
  loading,
  apiLimitExceeded,
  userQuery,
  usersLength,
}) => {
  let message: string | null = null;

  if (loading) {
    message = 'Loading...';
  } else if (apiLimitExceeded) {
    message = 'GitHub API limit exceeded. Try again later.';
  } else if (userQuery === '') {
    message = 'Start typing to search';
  }
  if (userQuery !== '' && usersLength === 0) {
    message = `No users found for '${userQuery}'`;
  }

  return message ? <div className="state-message">{message}</div> : null;
};

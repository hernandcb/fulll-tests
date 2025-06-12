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
  if (loading) {
    return <div className="state-message">Loading...</div>;
  }

  if (apiLimitExceeded) {
    return (
      <div className="state-message">
        GitHub API limit exceeded. Try again later.
      </div>
    );
  }

  if (userQuery === '') {
    return <div className="state-message">Start typing to search</div>;
  }

  if (userQuery !== '' && usersLength === 0) {
    return (
      <div className="state-message">No results found for '{userQuery}'</div>
    );
  }
};

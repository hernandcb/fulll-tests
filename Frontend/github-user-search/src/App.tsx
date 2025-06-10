import { useState, type ChangeEvent } from 'react';
import { UserCard } from './components/UserCard';
import { useDebounce } from './hooks/useDebounce';
import { useGithubSearch } from './hooks/useGithubSearch';
import './App.css';
import { StateMessage } from './components/StateMessage';

function App() {
  const [userQuery, setUserQuery] = useState<string>('');
  const { users, loading, apiLimitExceeded, searchUsers } = useGithubSearch();
  const debouncedSendQuery = useDebounce(searchUsers, 500);

  const handleQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQueryValue = event.target.value;
    setUserQuery(newQueryValue);
    debouncedSendQuery(newQueryValue);
  };

  return (
    <div className="app">
      <header>Github search</header>
      <section className="search">
        <input
          type="text"
          placeholder="Search input"
          onChange={handleQueryChange}
          value={userQuery}
        />
      </section>

      <section className="results">
        <StateMessage
          loading={loading}
          apiLimitExceeded={apiLimitExceeded}
          userQuery={userQuery}
          usersLength={users.length}
        />

        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}

export default App;

import { useState, type ChangeEvent } from 'react';
import { UserCard } from './components/UserCard';
import { useDebounce } from './hooks/useDebounce';
import { useGithubSearch } from './hooks/useGithubSearch';
import './App.css';

function App() {
  const [userQuery, setUserQuery] = useState<string>('');
  const { users, loading, apiLimitExceeded, searchUsers } = useGithubSearch();
  const debouncedSendQuery = useDebounce(searchUsers, 500);

  const handleQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQueryValue = event.target.value;
    setUserQuery(newQueryValue);
    debouncedSendQuery(newQueryValue);
  };

  const getStateMessage = () => {
    if (loading) return <div>Loading...</div>;

    if (apiLimitExceeded)
      return <div>GitHub API limit exceeded. Try again later.</div>;

    if (userQuery === '') return <div>Start typing to search</div>;

    if (userQuery !== '' && users.length === 0)
      return <div>No users found for '{userQuery}'</div>;

    return null;
  };

  const stateMessage = getStateMessage();
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
        <div className="state-message">{stateMessage}</div>

        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}

export default App;

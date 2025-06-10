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

  const noUserQuery = !loading && !apiLimitExceeded && userQuery === '';
  const noResults =
    !loading && !apiLimitExceeded && userQuery !== '' && users.length === 0;

  return (
    <div id="app">
      <header>Github search</header>
      <section id="search">
        <input
          type="text"
          placeholder="Search input"
          onChange={handleQueryChange}
          value={userQuery}
        />
      </section>

      <section id="results">
        {noUserQuery && <div>Start typing to search</div>}
        {noResults && <div>There were no users found by '{userQuery}'</div>}
        {loading && <div>Loading...</div>}
        {!loading && apiLimitExceeded && (
          <div>
            Github API Limit exceded, wait some seconds before trying again.
          </div>
        )}
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}

export default App;

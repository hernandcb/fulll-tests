import { useState, type ChangeEvent } from 'react';
import githubService from './services/github';
import type { User } from './types/User';
import './App.css';
import { UserCard } from './components/UserCard';

function App() {
  const [userQuery, setUserQuery] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [apiLimitExceded, setApiLimitExceded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQueryValue = event.target.value;
    setUserQuery(newQueryValue);
    setApiLimitExceded(false);
    setLoading(true);
    setUsers([]);

    if (newQueryValue === '') {
      setLoading(false);
      return;
    }

    try {
      const usersReturned: User[] =
        await githubService.userSearch(newQueryValue);

      setUsers(usersReturned);
    } catch (error) {
      console.log('Github api limit exceded ', error);
      setApiLimitExceded(true);
    } finally {
      setLoading(false);
    }
  };

  const noUserQuery = !loading && !apiLimitExceded && userQuery === '';
  const noResults =
    !loading && !apiLimitExceded && userQuery !== '' && users.length === 0;

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
        {!loading && apiLimitExceded && (
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

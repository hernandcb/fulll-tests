import { useState, type ChangeEvent } from 'react';
import githubService from './services/github';
import './App.css';

function App() {
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [apiLimitExceded, setApiLimitExceded] = useState(false);

  const handleQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQueryValue = event.target.value;
    setUserQuery(newQueryValue);

    if (newQueryValue === '') {
      setUsers([]);
      setApiLimitExceded(false);
      return;
    }

    try {
      const usersReturned = await githubService.userSearch(newQueryValue);
      setUsers(usersReturned);
      setApiLimitExceded(false);
    } catch (error) {
      console.log('Github api limit exceded ', error);
      setApiLimitExceded(true);
      setUsers([]);
    }
  };

  const noUserQuery = !apiLimitExceded && userQuery === '';
  const noResults = !apiLimitExceded && userQuery !== '' && users.length === 0;

  return (
    <>
      <header>Github search</header>
      <main>
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
          {apiLimitExceded && (
            <div>
              Github API Limit exceded, wait some seconds before trying again.
            </div>
          )}
          {users.map((user) => (
            <article key={user.id} className="card-user">
              {user.login}
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;

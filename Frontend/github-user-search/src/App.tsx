import { useState, type ChangeEvent } from 'react';
import githubService from './services/github';
import './App.css';

interface User {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
}

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
          {loading && <div>Loading...</div>}
          {!loading && apiLimitExceded && (
            <div>
              Github API Limit exceded, wait some seconds before trying again.
            </div>
          )}
          {users.map((user) => (
            <article
              key={user.id}
              className="card-user"
              style={{
                textAlign: 'center',
                padding: '15px 0',
                fontSize: '12px',
                backgroundColor: '#d5d5d5',
                borderRadius: '10px',
                borderStyle: 'outset',
              }}
            >
              <img
                src={user.avatar_url}
                alt={`Avatar of ${user.login}`}
                className="avatar"
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
              <div className="user-id" style={{ margin: '5px 0' }}>
                {user.id}
              </div>
              <div
                className="user-login"
                style={{
                  margin: '5px 0',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  padding: '0 7px',
                }}
                title={user.login}
              >
                {user.login}
              </div>
              <div>
                <a
                  href={`https://github.com/${user.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <span
                    style={{
                      // border: '1px solid blue',
                      padding: '2px 5px',
                      backgroundColor: '#32a3fb',
                      borderRadius: '10%',
                    }}
                  >
                    View profile
                  </span>
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;

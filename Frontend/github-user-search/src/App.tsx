import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import githubService from './services/github';
import type { User } from './types/User';
import './App.css';
import { UserCard } from './components/UserCard';

/**
 * A simple debounce function that delays the execution of a function
 * until after a specified wait time has elapsed since the last time
 * it was invoked.
 *
 * Types inspired from: https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
 *
 * @param func - The function to debounce.
 * @param waitFor - The number of milliseconds to wait before invoking the function.
 * @returns A debounced version of the provided function.
 */
const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

function App() {
  const [userQuery, setUserQuery] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [apiLimitExceded, setApiLimitExceded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getUsersFromGithub = (query: string) => {
    setApiLimitExceded(false);
    setLoading(true);
    setUsers([]);

    if (query === '') {
      setLoading(false);
      return;
    }

    githubService
      .userSearch(query)
      .then((usersReturned: User[]) => {
        setUsers(usersReturned);
      })
      .catch((error) => {
        console.log('Github api limit exceeded ', error);
        setApiLimitExceded(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendQuery = useCallback(getUsersFromGithub, []);
  const debouncedSendQuery = useMemo(() => {
    return debounce(sendQuery, 500);
  }, [sendQuery]);

  const handleQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQueryValue = event.target.value;
    setUserQuery(newQueryValue);
    debouncedSendQuery(newQueryValue);
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

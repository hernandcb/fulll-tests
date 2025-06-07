import { useState, type ChangeEvent } from 'react';
import './App.css';

function App() {
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQueryValue = event.target.value;
    setUserQuery(newQueryValue);

    if (newQueryValue === '') {
      setUsers([]);
      return;
    }

    const params = new URLSearchParams();
    params.append('q', newQueryValue);

    fetch(`https://api.github.com/search/users?${params}`)
      .then((response) => response.json())
      .then((data) => setUsers(data.items));
  };

  const noUserQuery = userQuery === '';
  const noResults = userQuery !== '' && users.length === 0;

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

import './App.css';

const users = [
  {
    login: 'hernan',
    id: 15841,
    avatar_url: 'https://avatars.githubusercontent.com/u/15841?v=4',
    url: 'https://api.github.com/users/hernan',
  },
  {
    login: 'bodymovin',
    id: 11096607,
    avatar_url: 'https://avatars.githubusercontent.com/u/11096607?v=4',
    url: 'https://api.github.com/users/bodymovin',
  },
  {
    login: 'hernandev',
    id: 1143355,
    avatar_url: 'https://avatars.githubusercontent.com/u/1143355?v=4',
    url: 'https://api.github.com/users/hernandev',
  },
  {
    login: 'hernan604',
    id: 480616,
    avatar_url: 'https://avatars.githubusercontent.com/u/480616?v=4',
    url: 'https://api.github.com/users/hernan604',
  },
  {
    login: 'hernan066',
    id: 30220961,
    avatar_url: 'https://avatars.githubusercontent.com/u/30220961?v=4',
    url: 'https://api.github.com/users/hernan066',
  },
  {
    login: 'hgrecco',
    id: 278566,
    avatar_url: 'https://avatars.githubusercontent.com/u/278566?v=4',
    url: 'https://api.github.com/users/hgrecco',
  },
  {
    login: 'hernandw',
    id: 43607368,
    avatar_url: 'https://avatars.githubusercontent.com/u/43607368?v=4',
    url: 'https://api.github.com/users/hernandw',
  },
  {
    login: 'hernandoabella',
    id: 24196857,
    avatar_url: 'https://avatars.githubusercontent.com/u/24196857?v=4',
    url: 'https://api.github.com/users/hernandoabella',
  },
];

function App() {
  return (
    <>
      <header>Github search</header>
      <main>
        <section id="search">
          <input type="text" placeholder="Search input" />
        </section>
        <section id="results">
          {users.map((user) => (
            <article className="card-user">{user.login}</article>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;

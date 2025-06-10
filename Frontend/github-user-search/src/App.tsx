import { useEffect, useState, type ChangeEvent } from 'react';
import { UserCard } from './components/UserCard';
import { useDebounce } from './hooks/useDebounce';
import { useGithubSearch } from './hooks/useGithubSearch';
import './App.css';
import { StateMessage } from './components/StateMessage';

function App() {
  const [userQuery, setUserQuery] = useState<string>('');
  const { users, loading, apiLimitExceeded, searchUsers } = useGithubSearch();
  const [selectedUserIDs, setSelectedUserIDs] = useState<
    Record<number, boolean>
  >({});
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const debouncedSendQuery = useDebounce(searchUsers, 500);

  useEffect(() => {
    // Reset selected users when the user query changes
    setSelectedUserIDs({});
    setAllSelected(false);
  }, [users]);

  const handleQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQueryValue = event.target.value;
    setUserQuery(newQueryValue);
    debouncedSendQuery(newQueryValue);
  };

  const toogleCardSelection = (userId: number) => {
    setSelectedUserIDs((prevSelected) => ({
      ...prevSelected,
      [userId]: !prevSelected[userId],
    }));
  };

  const handleSelectAllChange = () => {
    const newSelectionState = !allSelected;
    setAllSelected(newSelectionState);
    setSelectedUserIDs(
      users.reduce(
        (acc, user) => ({ ...acc, [user.id]: newSelectionState }),
        {},
      ),
    );
  };

  const numberOfCardsSelected = Object.values(selectedUserIDs).reduce(
    (count, isSelected) => count + (isSelected ? 1 : 0),
    0,
  );

  console.log('Number of cards selected:', numberOfCardsSelected);
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

      {users.length > 0 && (
        <section className="actions">
          <div className="selected-count">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAllChange}
            />
            {numberOfCardsSelected > 0
              ? `Selected ${numberOfCardsSelected} user${numberOfCardsSelected > 1 ? 's' : ''}`
              : 'No users selected'}
          </div>
          <div className="options"></div>
        </section>
      )}

      <section className="results">
        <StateMessage
          loading={loading}
          apiLimitExceeded={apiLimitExceeded}
          userQuery={userQuery}
          usersLength={users.length}
        />

        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            selected={selectedUserIDs[user.id]}
            toogleSelection={toogleCardSelection}
          />
        ))}
      </section>
    </div>
  );
}

export default App;

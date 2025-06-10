import { useEffect, useState, type ChangeEvent } from 'react';
import { UserCard } from './components/UserCard';
import { useDebounce } from './hooks/useDebounce';
import { useGithubSearch } from './hooks/useGithubSearch';
import './App.css';
import { StateMessage } from './components/StateMessage';
import type { User } from './types/User';

function App() {
  const [userQuery, setUserQuery] = useState<string>('');
  const { loading, apiLimitExceeded, searchUsers } = useGithubSearch();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIDs, setSelectedUserIDs] = useState<
    Record<number, boolean>
  >({});
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const debouncedSendQuery = useDebounce(async (query: string) => {
    const returnedUsers = await searchUsers(query);
    setUsers(returnedUsers);
  }, 500);

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

  const handleDeleteSelected = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedUserIDs[user.id]),
    );
    setSelectedUserIDs({});
    setAllSelected(false);
  };

  const handleDuplicateSelected = () => {
    const selectedUsers = users.filter((user) => selectedUserIDs[user.id]);
    const duplicatedUsers = selectedUsers.map((user) => ({
      ...user,
      login: `${user.login}-copy`, // Modify the login to avoid conflicts
      id: user.id + Math.random(), // Generate a new unique ID
    }));
    setUsers((prevUsers) => [...prevUsers, ...duplicatedUsers]);
    setSelectedUserIDs({});
    setAllSelected(false);
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
          {numberOfCardsSelected > 0 && (
            <div className="options">
              <button onClick={handleDuplicateSelected}>Duplicate</button>
              <button onClick={handleDeleteSelected}>Delete</button>
            </div>
          )}
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

import { useEffect, useState, type ChangeEvent } from 'react';
import { UserCard } from './components/UserCard';
import { useDebounce } from './hooks/useDebounce';
import { useGithubSearch } from './hooks/useGithubSearch';
import { StateMessage } from './components/StateMessage';
import { SelectionActions } from './components/SelectionActions';
import type { User } from './types/User';
import './App.css';

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

  const toogleSelectAll = () => {
    const newSelectionState = !allSelected;
    setAllSelected(newSelectionState);
    setSelectedUserIDs(
      users.reduce(
        (acc, user) => ({ ...acc, [user.id]: newSelectionState }),
        {},
      ),
    );
  };

  const selectedCount = Object.values(selectedUserIDs).reduce(
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
        <SelectionActions
          selectedCount={selectedCount}
          allSelected={allSelected}
          onToogleSelectAll={toogleSelectAll}
          onDelete={handleDeleteSelected}
          onDuplicate={handleDuplicateSelected}
        />
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

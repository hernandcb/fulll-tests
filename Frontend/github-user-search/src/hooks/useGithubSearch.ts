import { useState } from 'react';
import type { User } from '../types/User';
import githubService from '../services/github';

export function useGithubSearch() {
  const [users, setUsers] = useState<User[]>([]);
  const [apiLimitExceeded, setApiLimitExceeded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const searchUsers = async (query: string) => {
    setApiLimitExceeded(false);
    setLoading(true);
    setUsers([]);

    if (query === '') {
      setLoading(false);
      return;
    }

    console.log(`Searching for users with query: ${query}`);

    try {
      const usersReturned = await githubService.userSearch(query);
      setUsers(usersReturned);
    } catch (error) {
      console.log('Github api limit exceeded ', error);
      setApiLimitExceeded(true);
    } finally {
      setLoading(false);
    }
  };
  return {
    users,
    apiLimitExceeded,
    loading,
    searchUsers,
  };
}

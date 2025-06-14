import { useState } from 'react';
import type { User } from '../types/User';
import githubService from '../services/github';

export function useGithubSearch(): {
  apiLimitExceeded: boolean;
  loading: boolean;
  searchUsers: (query: string) => Promise<User[]>;
} {
  const [apiLimitExceeded, setApiLimitExceeded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const searchUsers = async (query: string): Promise<User[]> => {
    setApiLimitExceeded(false);
    setLoading(true);

    if (query === '') {
      setLoading(false);
      return [];
    }

    console.log(`Searching for users with query: ${query}`);

    try {
      const usersReturned = await githubService.userSearch(query);
      return usersReturned;
    } catch (error) {
      console.log('Github api limit exceeded ', error);
      setApiLimitExceeded(true);
    } finally {
      setLoading(false);
    }
    return [];
  };
  return {
    apiLimitExceeded,
    loading,
    searchUsers,
  };
}

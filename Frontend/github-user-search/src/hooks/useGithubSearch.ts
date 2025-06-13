import { useState } from 'react';
import githubService from '../services/github';

export function useGithubSearch() {
  const [apiLimitExceeded, setApiLimitExceeded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const searchUsers = async (query: string) => {
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

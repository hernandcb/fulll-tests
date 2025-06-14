import { vi } from 'vitest';

export const useGithubSearch = vi.fn(() => ({
  loading: false,
  apiLimitExceeded: false,
  searchUsers: vi.fn().mockResolvedValue([]),
}));

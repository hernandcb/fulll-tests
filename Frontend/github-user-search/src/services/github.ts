const baseUrl = 'https://api.github.com';

async function userSearch(userQuery: string) {
  const params = new URLSearchParams();
  params.append('q', userQuery);

  try {
    const response = await fetch(
      `${baseUrl}/search/users?${params}&per_page=100`,
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub search rate limit exceeded');
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items ?? [];
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export default { userSearch };

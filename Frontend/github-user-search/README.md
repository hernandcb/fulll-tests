# GitHub User Search

This is a small React-based GitHub user search application allows users to search for GitHub profiles, select multiple results, and perform basic actions like duplication and deletion.

## Features

- **Search GitHub users** using the GitHub API
- **Debounced input** to reduce API calls
- Display loading, empty, or error states (including **API rate limit exceeded**)
- **Edit mode** to select individual or all user cards
- Perform **bulk actions**:
  - **Duplicate** selected users
  - **Delete** selected users
- **Responsive design**, suitable for small screens (min recommended size: **250x450**)

## Development Goals and Choices

This project was built following the requirements of the interview task:

- Use React with functional components and hooks
- Add search input with debounce
- Show messages for different states (loading, empty, error)
- Display results using a card UI
- Write unit tests using `vitest`
- Write responsive CSS
- Organize components cleanly for maintainability
- Use TypeScript with basic typing to validate API responses

### Additional Notes

- No infinite scroll was implemented (out of scope)
- Custom hooks (`useDebounce`, `useGithubSearch`) simplify separation of concerns
- TypeScript used to ensure correct typing for API responses
- Tests focus on **components and interactions**, not the hooks directly
- **Test coverage is high** but not 100%, especially in lower-level hooks

## Project Structure

```
src/
│
├── components/
│ ├── UserCard/
│ │ ├── UserCard.tsx # Displays GitHub user info in a card
│ │ ├── UserCard.css # Styles for the user card
│ │ └── UserCard.test.tsx # Unit tests for the user card
│ │
│ ├── StateMessage/
│ │ ├── StateMessage.tsx # Shows loading, error, or empty messages
│ │ ├── StateMessage.css # Styles for the message
│ │ └── StateMessage.test.tsx# Tests for message display
│ │
│ └── SelectionActions/
│ ├── SelectionActions.tsx # UI for select-all, delete, and duplicate actions
│ ├── SelectionActions.css # Styles for selection actions
│ └── SelectionActions.test.tsx# Unit tests for actions logic
│
├── hooks/
│ ├── useDebounce.ts # Debounce hook for delayed input handling
│ └── useGithubSearch.ts # Custom hook to query the GitHub users API
│
├── types/
│ └── User.ts # Type definition for GitHub user objects
│
├── App.tsx # Main application logic and component composition
├── App.test.tsx # Integration tests for App behavior
└── App.css # Application styles
```

> Each component lives in its own folder along with its corresponding CSS and test file. This helps keep styles, logic, and tests together for better maintainability and easier development.

## How to Run

```bash

# Install dependencies

npm install

# Run the development server

npm run dev

# Run unit tests

npm run test

# Check for lint errors

npm run lint

# Format the code

npm run format
```

## Dependencies

No dependencies added beyond development and formatting tools:

### Runtime

- Only standard React/Vite packages

### Development

- **Testing**:
  - \`vitest\`
  - \`@testing-library/react\`
  - \`@testing-library/user-event\`
- **Linting/Formatting**:
  - \`eslint\`
  - \`prettier\`

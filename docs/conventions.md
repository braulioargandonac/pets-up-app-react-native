# Coding Conventions - Frontend

## Nomenclature
- **Components:** `PascalCase`.
- **Hooks:** `camelCase`, prefix with `use`.
- **Props:** Suffix interfaces with `Props` (e.g., `PetDetailSheetProps`).

## Component Structure
- **Imports:** Group by: 1. React/Libs, 2. Contexts/Hooks, 3. Components, 4. Styles/Assets.
- **Logic:** Extract complex `useEffect` or data transformation logic into utility functions or hooks.
- **Render:** Keep the `return` JSX clean. If a sub-view is complex, extract it to a separate component or render function.

## Testing Standards
- **Tools:** `Jest` + `React Native Testing Library`.
- **Queries:** Prefer `getByText`, `getByLabelText` (accessibility first). Avoid `getByTestId` unless necessary.
- **Mocking:**
  - Mock `expo-router` navigation.
  - Mock API hooks (`useApi`) to return controlled data/errors.
- **Snapshots:** Use sparingly for UI stability, but rely on assertions for logic.

## State Management
- **Global:** Only for Auth and Catalog data.
- **Local:** `useState` for UI state (modals, inputs).
- **Server:** React Query (future) or custom hooks `isLoading/data/error` pattern.

## Styling
- **Glassmorphism:** Use `rgba` colors with blur effects where supported.
- **Theme:** Always use `useThemeColor` or `Colors` constants.
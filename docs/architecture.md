# Architecture Overview - PetsUp Frontend

## Design Philosophy
**Feature-First Architecture**. We group files by route/feature rather than by type, using Expo Router's file-based routing as the skeleton.

## Directory Strategy
- **`app/` (Routes):** Acts as the "Controller". Receives params, calls hooks, renders screens.
- **`components/screens/` (Views):** The actual page UI logic. Separated to keep the router clean.
- **`hooks/` (Logic):** Custom hooks encapsulate state and API logic (Separation of UI and Logic).
  - *Example:* `useMyPets` handles fetching, loading states, and error handling for the profile.

## Data Flow
- **AuthContext:** Holds the User Session. Exposes `refreshUser` to sync UI after edits.
- **API Layer:** Axios instance with Interceptors for JWT injection.

## Quality Assurance
- **Component Testing:** RNTL tests located in `__tests__` directories or co-located.
- **Hook Testing:** `renderHook` from RNTL for custom logic (like `useMyPets`).
# 🐶 Dog Explorer

A client-side Single-Page Application built with **React** and **React Router** that lets users browse dog breeds, view photo galleries, and save favorite breeds. Built for **Web Systems and Technologies – Final Project**.

## API Used
- **Dog CEO API** – https://dog.ceo/dog-api/ (free, no API key required)
  - `GET /breeds/list/all`
  - `GET /breed/{breed}/images/random`
  - `GET /breed/{breed}/images` and `GET /breed/{breed}/{sub}/images`

## Features
- **Search** breeds by keyword
- **Filter** (with/without sub-breeds) and **sort** (A–Z / Z–A)
- **Pagination** for breeds and photo galleries
- **Favorites** saved in `localStorage` (persist after reload)
- Loading spinners/skeletons and error banners with Retry
- Routes: `/` Home, `/breed/:breed` Details, `/favorites`

## Setup & Installation
```bash
git clone <your-repo-url>
cd dog-explorer
npm install
cp .env.example .env
npm run dev
```
Open http://localhost:5173

## Environment Variables
Dog CEO API needs **no API key**. The base URL is configurable in `.env`:
```
VITE_DOG_API_URL=https://dog.ceo/api
```

## Team Contributions
| Member | Contributions |
|--------|---------------|
| Name 1 | e.g. API layer, Home page, search & filters |
| Name 2 | e.g. Details page, favorites/localStorage, styling |

## Git Workflow
Feature branches + Pull Requests only (no direct commits to `main`). Commit prefixes: `feat:`, `fix:`, `style:`, `docs:`.

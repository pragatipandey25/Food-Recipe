# Food Recipe

A small React + Vite application that lets users browse, search and view recipes using TheMealDB API.

## Features

- Curated sliders for staff picks and trending meals
- Category-based filtering and search
- Recipe detail view with ingredients and instructions
- Includes an "Indian Favorites" section (uses TheMealDB)

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Project Structure (important files)

- `src/main.jsx` — app entry
- `src/App.jsx` — main router and filters
- `src/components/HomeView.jsx` — home page sliders and sections
- `src/components/TredingRecipe.jsx` — trending slider component
- `src/components/useFetch.js` — fetch hook and `API_URL`

## API

This project uses TheMealDB public API (`https://www.themealdb.com/api/json/v1/1/`).

Note: Some area filters use the country name rather than an adjective. For example the area parameter for Indian recipes is `a=India` (not `a=Indian`). The home view was updated to use `filter.php?a=India` so the "Indian Favorites" slider shows results. See `src/components/HomeView.jsx` for the change.

## Troubleshooting

- If a slider shows no results, open the browser console to check network requests. The fetch hook is in `src/components/useFetch.js`.
- If TheMealDB returns `{"meals":null}`, try running the equivalent API in a browser to confirm the area or query.

## Contributing

Feel free to open issues or submit PRs. Small improvements:

- Add more curated areas or categories
- Add graceful empty-state UI for sliders with no results

## License

MIT

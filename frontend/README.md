# Pantry Planner Frontend

This is the frontend of the Pantry Planner application.  
Built with **React 18+, JavaScript, Redux Toolkit, React Router v6, Axios, MUI**, and **SCSS**.

---

## 📦 Tech Stack

- React 18+
- Redux Toolkit
- React Router v6
- Axios
- MUI (Material UI)
- SCSS (no Bootstrap)

---

## 🚀 Getting Started

Go to the `frontend` folder:

```bash
cd frontend
npm install
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Pages

- `/` – Home
- `/food` – Manage foods
- `/inventory` – Track inventory
- `/recipes` – View and create recipes
- `/settings` – App settings

## Workaround

### 🧠 Redux Store

Global state is handled via Redux Toolkit (/store folder).

### ➕ How to add a new slice:

1. Create a new file in src/store/ (e.g., ingredientSlice.js):

```js
import { createSlice } from '@reduxjs/toolkit';

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: { items: [] },
  reducers: {
    setIngredients: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { setIngredients } = ingredientSlice.actions;
export default ingredientSlice.reducer;

``` 
 
2. Import and add it to the store in src/store/index.js:

```js
import ingredientReducer from './ingredientSlice';

export default configureStore({
  reducer: {
    ...,
    ingredient: ingredientReducer
  }
});
```

### 🧩 How to add a new component

Create a file in src/components/ or src/components/layout/ if it's UI-related.

Example: src/components/MyCard.js

```js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function MyCard({ title, content }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography>{content}</Typography>
      </CardContent>
    </Card>
  );
}

export default MyCard;
```

Import it where needed:

```js
import MyCard from '../components/MyCard';
```
🌍 Environment Config

Frontend uses .env (in frontend/) to configure API base URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

In your axios.js:

```js
baseURL: process.env.REACT_APP_API_URL
```

## 🧪 Testing

All routing is handled client-side
SCSS is globalized via index.scss
MUI handles component styling and layout

## 📁 Structure

```
src/
 ├── api/
 ├── components/
 ├── views/
 ├── store/
 ├── index.scss
 └── App.js
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

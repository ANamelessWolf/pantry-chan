# Pantry Planner Backend

This is the **Pantry Planner API backend**:  
A Node.js + Express + TypeScript + MongoDB application for managing food ingredients, inventories, and recipes.

## 🛠 Technology Stack
- Node.js 23
- Express.js
- TypeScript
- MongoDB (Docker)
- Mongoose
- Swagger (API Documentation)
- JWT Authentication
- Docker Compose (for MongoDB)

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/ANamelessWolf/pantry-chan.git
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file at the root:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=yourSuperSecretKey
```
## Running Backend

### 🐳 Running MongoDB with Docker

There are two compose file, to just use the mongo DB use the provided docker-compose-mongo.yml to start MongoDB easily:

```bash
docker compose -f docker-compose-mongo.yml up -d
```

✅ MongoDB will be running at mongodb://localhost:27017.

Check with:

```bash
docker ps
```

### 🏗 Running the Backend Locally

After MongoDB is running, start the server:

```bash
npm run dev
```

✅ Server will run on http://localhost:5000.

### 🗄 Running the Database Migrations

Seed initial Food Categories and Units into the database:

```bash
npm run migrate
```

✅ After this, your MongoDB will have base data populated.

### 📑 Accessing the Swagger API Documentation

Once server is running:

Open your browser and go to:
http://localhost:5000/api/docs/

You will find a complete interactive API documentation with:

- Food Endpoints
- Inventory Endpoints
- Recipes Endpoints
- Categories
- Units
- Authentication (Login/Register)

✅ You can test the endpoints directly from Swagger UI!

## Work around

### ➕ Adding a New Endpoint (New Controller/Route)

Create a new Controller in src/controllers/ (e.g., ingredient.controller.ts).

Define your business logic functions (e.g., createIngredient, listIngredients).

Add routes in src/routes/index.ts:

```ts
router.get('/ingredient', listIngredients);
router.post('/ingredient', createIngredient);
```

### Add the Swagger documentation:

Create a file inside src/docs/ (e.g., ingredient.docs.ts)

Document your routes using OpenAPI syntax.

Update src/swagger/swaggerOptions.ts if needed (if adding new schemas).

✅ Done!

### 🧩 Adding a New Database Model

Create a new model inside src/models/ (e.g., ingredient.model.ts).

```ts
import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const IngredientSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  nutrients: { type: Object }
});

export const Ingredient = model('Ingredient', IngredientSchema);
```

Create related controller, service, and routes.

Document the model in `src/schemas/` for Swagger if needed.

✅ Done!

### 📥 Adding a New Migration

Add a new JSON file inside `src/migrations/data/` (e.g., ingredients.json).

Update `src/migrations/runMigrations.ts`:

```ts
import ingredients from './data/ingredients.json';
// Later inside runMigrations()
await Ingredient.insertMany(ingredients);
```

Re-run migrations:

```bash
npm run migrate
```

✅ Done!

## ⚡ Scripts

Command	Purpose

|Command|Description|
|--|--|
|`npm run dev`|Start server with auto-reload (ts-node-dev)|
|`npm run build`|Compile TypeScript files|
|`npm run start`|Run compiled JavaScript|
|`npm run migrate`|Upload migration data to MongoDB|

## 📦 Project Structure

src/
 ├── config/
 ├── controllers/
 ├── docs/
 ├── middleware/
 ├── migrations/
 ├── models/
 ├── routes/
 ├── schemas/
 ├── swagger/
 ├── types/
 ├── utils/
 ├── app.ts
 └── server.ts

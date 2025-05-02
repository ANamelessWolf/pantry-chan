# pantry-chan (Full Stack App)

pantry-chan is a full-stack web application that helps users:

- Track their food inventory
- See detailed nutritional data
- Automatically suggest or build cooking recipes based on available ingredients

## 🧱 Tech Stack

| Layer      | Tools |
|------------|-------|
| Frontend   | React 18+, JavaScript, Redux Toolkit, Axios, React Router v6, MUI, SCSS |
| Backend    | Node.js, Express, TypeScript, MongoDB, Mongoose, Swagger |
| Dev Tools  | Docker, Docker Compose, .env, Swagger UI |

---

## 🚀 How to Run the App Locally

1. **Clone the repository**:

```bash
https://github.com/ANamelessWolf/pantry-chan.git
cd pantry-chan
```

2. **Start MongoDB (Dockerized):**:

```bash
docker compose -f docker-compose-mongo.yml up -d
```

3. **Install backend and frontend dependencies:**

```bash
cd backend && npm install
cd ../frontend && npm install
```

4. **Set environment variables**

Create .env in both /backend and /frontend

backend/.env:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=yourSuperSecretKey
```

frontend/.env:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. **Run the app (both backend and frontend together)**

From the root:

```bash
npm run dev
```

6. **This runs both frontend and backend with concurrently.**

Run database migration: This uploads food categories and unit data into MongoDB

```bash
npm run migrate
```

## 🔍 API Documentation

Swagger UI available at:
http://localhost:5000/api/docs

Use it to:

- Test endpoints (e.g., /food, /recipes)
- Check schemas and parameters
- Debug API responses

## 📦 Project Structure

```
/backend/
 ├── src/
 /frontend/
 ├── src/
 /docker-compose-mongo.yml
 /package.json (root dev runner)
 ```
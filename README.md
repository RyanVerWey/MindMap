# Mind Map Builder  
_Full Stack Application (ReactJS + NodeJS + MongoDB)_

---

## Overview

Mind Map Builder is a full-stack web application for visually creating, editing, saving, and managing mind maps. Users can build maps with nodes and edges, load templates, and store multiple maps in a MongoDB database.

---

## Features

- Create nodes with labels, descriptions, type, width, and height
- Connect nodes by specifying a parent node
- Delete nodes or edges
- Save mind maps under friendly names
- Load saved maps from a dropdown
- Delete maps from the database
- Load predefined templates (frontend workflow, bug fix workflow)
- Toggle canvas grid for alignment
- Responsive React frontend
- Modular Express backend with MongoDB integration

---

## Technologies

**Frontend:**
- ReactJS
- Axios (API requests)
- [React Flow](https://reactflow.dev/) (`@xyflow/react`) for visualization
- nanoid (unique node IDs)

**Backend:**
- NodeJS
- Express
- Mongoose (MongoDB ORM)
- MongoDB (local or remote)

---

## Project Structure

```
ROOT
│
├── /mind-map         # React frontend
│   └── /src
│       ├── /components
│       │   ├── NodeControlPanel.jsx
│       │   ├── MindMapCanvas.jsx
│       │   ├── EditNodeModal.jsx
│       │   └── EdgeEditModal.jsx
│       ├── /pages
│       │   └── Project.jsx
│       ├── api.js
│       └── index.jsx
│
├── /server           # Node backend
│   ├── /models
│   │   └── MindMap.js
│   ├── /routes
│   │   └── mapRoutes.js
│   ├── server.js
│   └── .env
```

---

## Setup Instructions

### Backend (Server)

1. Navigate to `/server`
2. Install dependencies:
    ```bash
    npm install
    ```
3. Ensure MongoDB is running locally (or update `MONGO_URI` in `.env`)
4. Start the server:
    ```bash
    node server.js
    # or with nodemon:
    nodemon server.js
    ```
    Server runs at: [http://localhost:5000/api](http://localhost:5000/api)

### Frontend (Client)

1. Navigate to `/mind-map`
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the dev server:
    ```bash
    npm run dev
    ```
    Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | `/api/maps`             | List all saved map names           |
| GET    | `/api/map/:name`        | Retrieve a map by name             |
| POST   | `/api/map`              | Save or update a map               |
| DELETE | `/api/map/:name`        | Delete a map by name               |
| GET    | `/api/template/:name`   | Get a hardcoded template           |

Templates: `frontend-workflow`, `bug-fix-workflow`

---

## Frontend Components

- **NodeControlPanel.jsx**  
  Add nodes, set properties, connect to parent, save/load/delete maps, load templates

- **MindMapCanvas.jsx**  
  Visualize nodes/edges, edit via modals, toggle grid

- **EditNodeModal.jsx**  
  Edit node properties

- **EdgeEditModal.jsx**  
  Edit edge annotations or delete edges

- **Project.jsx**  
  Main page, manages app state

---

## Database Structure

**Collection:** `mindmap`

```js
{
  name: String,      // Unique map name
  nodes: Array,      // List of node objects
  edges: Array       // List of edge objects
}
```

---

## Code Design Highlights

- State managed with React `useState` and `useEffect`
- Centralized API calls via `api.js` (Axios)
- Modular backend routing (`mapRoutes.js`)
- Templates provided by backend for flexibility
- Error handling with alerts and console logs
- Confirmation prompts for destructive actions

---

## Testing the Application

1. Start MongoDB, backend, and frontend
2. Open [http://localhost:5173](http://localhost:5173)
3. Use the controls to create nodes and connect them
4. Save and load maps, test templates, delete maps
5. Toggle grid, edit nodes/edges, and verify MongoDB updates

---

Enjoy building your mind maps!

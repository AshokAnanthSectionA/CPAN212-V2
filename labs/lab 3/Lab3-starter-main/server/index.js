import express from 'express';
import fetch_router from './routers/fetch_router.js';
import save_router from './routers/save_router.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Import fileURLToPath

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(fetch_router);
app.use(save_router);

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/file', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
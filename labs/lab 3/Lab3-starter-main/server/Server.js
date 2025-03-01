import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';
import fetch from 'node-fetch'; // Import node-fetch

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Fetch a single random image from uploads
app.get('/fetch/single', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err || files.length === 0) {
      return res.status(404).send('No images found');
    }
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];
    res.sendFile(path.join(uploadsDir, randomFile));
  });
});

// Save a single file
app.post('/save/single', upload.single('file'), (req, res) => {
  res.send({ message: 'File uploaded successfully!' });
});

// Fetch multiple images from uploads
app.get('/fetch/multiple', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err || files.length === 0) {
      return res.status(404).send('No images found');
    }
    res.json(files);
  });
});

// Dog image upload endpoint (modified)
app.post('/api/upload-dog', async (req, res) => { // Make the handler async
  const dogImageUrl = req.body.imageUrl;
  console.log('Received dog image URL:', dogImageUrl);

  try {
    const response = await fetch(dogImageUrl);
    const buffer = await response.buffer(); // Get the image as a buffer

    const filename = `dog-${Date.now()}.jpg`; // Generate a unique filename
    const filepath = path.join(__dirname, 'uploads', filename);

    fs.writeFileSync(filepath, buffer); // Save the image to the uploads folder

    res.json({ message: 'Dog image uploaded successfully!', filename: filename });
  } catch (error) {
    console.error('Error uploading dog image:', error);
    res.status(500).json({ error: 'Failed to upload dog image' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// Sample image paths (replace with your actual image paths)
const imagePaths = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
];

app.get('/api/random-images', (req, res) => {
  const randomImages = _.sampleSize(imagePaths, 3); // Get up to 3 random images
  res.json(randomImages);
});

// Dog image upload endpoint
app.post('/api/upload-dog', (req, res) => {
  const dogImageUrl = req.body.imageUrl;
  console.log('Received dog image URL:', dogImageUrl);
  // Here you would typically save the image URL or download the image.
  res.json({ message: 'Dog image URL received successfully.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const express = require("express");
const app = express();
const PORT = 8000;

// Corrected logger function with next()
const logger = (req, res, next) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toUTCString();
  console.log(`[${formattedDate}] ${req.method} ${req.originalUrl}`);
  next();  // Ensures the request moves to the next handler
};

// Apply the logger middleware globally
app.use(logger);

// Define the "/" route correctly
app.get("/", (req, res) => {
  res.send("hello world");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("Page not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});

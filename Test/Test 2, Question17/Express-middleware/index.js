const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom middleware for /route_test
const testValidationMiddleware = (req, res, next) => {
  const currentDate = new Date().toUTCString();
  console.log(`[${currentDate}] Route Accessed: ${req.originalUrl}`);

  if (req.query.test_validation) {
    console.log(`test_validation value: ${req.query.test_validation}`);
  } else {
    console.log("test_validation parameter is missing.");
  }
  
  next(); // Proceed to the next middleware/route handler
};

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.get("/route_test", testValidationMiddleware, (req, res) => {
  res.send("Middleware executed successfully!");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

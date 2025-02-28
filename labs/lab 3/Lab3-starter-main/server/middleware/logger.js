// server/middleware/logger.js

// Option 1: Basic logging with console.log
const log = (message, level = 'info') => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
  };
  
  const loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    log(`${req.method} ${req.url}`, 'info');
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`, 'info');
    });
  
    next();
  };
  
  // Option 2: Using winston (if you want more advanced logging)
  // If you choose to use winston, install it: npm install winston
  /*
  import winston from 'winston';
  
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({ format: winston.format.simple() }),
      // Add other transports (e.g., file) if needed
    ],
  });
  
  const log = (message, level = 'info') => {
    logger.log({ level, message });
  };
  
  const loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    logger.log({ level: 'info', message: `${req.method} ${req.url}` });
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.log({ level: 'info', message: `${req.method} ${req.url} ${res.statusCode} ${duration}ms` });
    });
  
    next();
  };
  */
  
  export { log, loggerMiddleware };
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/paymentRoutes'));

// Start HTTPS server
const privateKey = fs.readFileSync('keys/privatekey.pem', 'utf8');
const certificate = fs.readFileSync('keys/certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
const PORT = process.env.PORT || 5000;

httpsServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

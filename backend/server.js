// server.js – (updated to load YAML Swagger spec)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load OpenAPI spec from docs/openapi.yaml instead of the old JSON file
const swaggerFile = YAML.load('./docs/openapi.yaml');

require('dotenv').config();
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3000;

// ────────────────────────────────────────────────────────────
// Middleware
// ────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ────────────────────────────────────────────────────────────
// Routes
// ────────────────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/session', sessionRoutes);

const reminderRoutes = require('./routes/reminderRoutes');
app.use('/api/reminders', reminderRoutes);

const goalRoutes = require('./routes/goalRoutes');
app.use('/api/goals', goalRoutes);

// Test route
app.get('/api/status', (req, res) => {
// Health‑check route
app.get('/api/status', (_, res) => {
  res.json({ message: 'API is running!' });
});

// Swagger UI – available at http://localhost:3000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ────────────────────────────────────────────────────────────
// Mongo connection & server start
// ────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

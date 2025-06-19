const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// ✅ Add this health check route here
app.get('/', (req, res) => {
  res.send('Backend is running');
});
// Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);
// Add these routes to your existing server.js
app.use('/api/files', require('./routes/files'));
app.use('/api/charts', require('./routes/charts'));





// Add this line with your other route imports
const adminRoutes = require('./routes/admin');

// Add this line with your other route uses
app.use('/api/admin', adminRoutes);




// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");

  // Start Server
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
}).catch((err) => {
  console.error("MongoDB connection failed:", err.message);
});

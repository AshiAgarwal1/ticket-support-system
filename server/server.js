const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API routes
// app.use('/api/tickets', require('./routes/ticketRoutes'));

const __dirname1 = path.resolve();

// Serve Vite build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname1, 'client', 'dist', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Redirect non-www to www
app.use((req, res, next) => {
  const host = req.hostname;
  // Check if it's the apex domain (non-www)
  if (host === 'smokengowa.com') {
    return res.redirect(301, `https://www.smokengowa.com${req.originalUrl}`);
  }
  next();
});

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

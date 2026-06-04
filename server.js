const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'html');
app.engine('html', (filePath, options, callback) => {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) return callback(err);
    return callback(null, content);
  });
});
app.set('views', path.join(__dirname, 'views'));

// Create directories if not exist
const dirs = ['uploads', 'downloads', 'templates/excel', 'templates/word', 'public/css', 'public/js', 'controllers', 'utils', 'routes'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'e-RDKK Gondang Server is running' });
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 e-RDKK Gondang Server running on http://localhost:${PORT}`);
  console.log(`📁 Templates directory: ${path.join(__dirname, 'templates')}`);
  console.log(`📤 Uploads directory: ${path.join(__dirname, 'uploads')}`);
  console.log(`📥 Downloads directory: ${path.join(__dirname, 'downloads')}\n`);
});

module.exports = app;

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration for local machine uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin@123',
  database: 'stream_store',
  waitForConnections: true,
  connectionLimit: 10,
});

// ================= API ENDPOINTS ================= //

// 0. Admin Login Endpoint (Fixes "Invalid credentials")
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hardcoded check for your specific admin email, or query your users table
    if (email === 'admin@stream.store' && password === 'admin@123') {
      return res.json({ 
        message: 'Login successful', 
        token: 'mock-jwt-admin-token-xyz', 
        user: { email, role: 'admin' } 
      });
    }

    // Optional: Check database users table if you store admins there
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND role = "admin"', [email]);
    if (rows.length > 0 && rows[0].password === password) {
      return res.json({ 
        message: 'Login successful', 
        token: 'mock-jwt-admin-token-xyz', 
        user: { email: rows[0].email, role: 'admin' } 
      });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1. Get all content (for Home, Movies, Series pages)
app.get('/api/content', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM content ORDER BY id DESC');
    const formatted = rows.map(r => ({
      id: r.id,
      type: r.type,
      title: r.title,
      genre: r.genre,
      year: r.year,
      released: r.released,
      rating: Number(r.rating),
      quality: r.quality,
      info: r.info,
      image: r.image ? (r.image.startsWith('http') ? r.image : `http://localhost:5000${r.image}`) : '',
      videoUrl: r.video_url ? (r.video_url.startsWith('http') ? r.video_url : `http://localhost:5000${r.video_url}`) : '',
      downloadBase: r.download_base
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get single content by ID
app.get('/api/content/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM content WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Content not found' });
    const r = rows[0];
    res.json({
      id: r.id,
      type: r.type,
      title: r.title,
      genre: r.genre,
      year: r.year,
      released: r.released,
      rating: Number(r.rating),
      quality: r.quality,
      info: r.info,
      image: r.image ? (r.image.startsWith('http') ? r.image : `http://localhost:5000${r.image}`) : '',
      videoUrl: r.video_url ? (r.video_url.startsWith('http') ? r.video_url : `http://localhost:5000${r.video_url}`) : '',
      downloadBase: r.download_base
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Upload / Create content (Handles poster and video files from local machine)
app.post('/api/content', upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'image', maxCount: 1 } // Supports alternate field name coming from form data
]), async (req, res) => {
  try {
    const { type, title, genre, year, released, rating, quality, info, downloadBase, imageUrl, videoUrl } = req.body;

    const posterFile = req.files?.poster?.[0] || req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    const imagePath = posterFile ? `/uploads/${posterFile.filename}` : (imageUrl || '');
    const videoPath = videoFile ? `/uploads/${videoFile.filename}` : (videoUrl || '');

    const query = `
      INSERT INTO content (type, title, genre, year, released, rating, quality, info, image, video_url, download_base)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      type || 'Movie',
      title,
      genre,
      year || new Date().getFullYear(),
      released || null,
      rating || 7.0,
      quality || 'HD',
      info,
      imagePath,
      videoPath,
      downloadBase
    ]);

    res.status(201).json({ id: result.insertId, message: 'Content uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete content
app.delete('/api/content/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM content WHERE id = ?', [req.params.id]);
    res.json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fixed port assignment (replaced undefined 'process.source')
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
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

// ================= UPLOAD DIRECTORY ================= //
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ================= MULTER CONFIG ================= //
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 } // 1 GB
});

// ================= MYSQL POOL (XAMPP) ================= //
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'stream_store',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ================= HELPERS ================= //
function buildFileUrl(filePath) {
  if (!filePath) return '';
  return filePath.startsWith('http') ? filePath : `http://localhost:5000${filePath}`;
}

function formatContent(r) {
  return {
    id: r.id,
    type: r.type,
    title: r.title,
    genre: r.genre,
    year: r.year,
    released: r.released,
    rating: Number(r.rating),
    quality: r.quality,
    info: r.info,
    image: buildFileUrl(r.image),
    poster: buildFileUrl(r.image),
    videoUrl: buildFileUrl(r.video_url),
    downloadBase: r.download_base,
    // Not in table, but frontend expects them:
    featured: false,
    trending: false,
    seasons: [],
    episodes: 0
  };
}

function normalizeReleased(value) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

// ================= API ENDPOINTS ================= //

// 0. Admin Login
app.post('/api/admin/login', async (req, res) => {
  const { email, password, username } = req.body;
  const loginEmail = email || username;

  try {
    if (loginEmail === 'admin@stream.store' && password === 'admin@123') {
      return res.json({
        message: 'Login successful',
        token: 'mock-jwt-admin-token-xyz',
        user: { email: loginEmail, role: 'admin' }
      });
    }

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND role = "admin"',
      [loginEmail]
    );

    if (rows.length > 0 && rows[0].password === password) {
      return res.json({
        message: 'Login successful',
        token: 'mock-jwt-admin-token-xyz',
        user: { email: rows[0].email, role: 'admin' }
      });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 1. Get all content
app.get('/api/content', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM content ORDER BY id DESC');
    res.json(rows.map(formatContent));
  } catch (err) {
    console.error('Get all content error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2. Get single content by ID
app.get('/api/content/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM content WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Content not found' });
    res.json(formatContent(rows[0]));
  } catch (err) {
    console.error('Get content error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 3. CREATE content (POST) — handles multipart/form-data
app.post(
  '/api/content',
  upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log('--- CREATE UPLOAD ---');
      console.log('Body:', req.body);
      console.log('Files:', Object.keys(req.files || {}));

      const {
        type, title, genre, year, released, rating,
        quality, info, description, downloadBase, imageUrl, videoUrl
      } = req.body;

      if (!title || !String(title).trim()) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const posterFile = req.files?.poster?.[0] || req.files?.image?.[0];
      const videoFile = req.files?.video?.[0];

      const imagePath = posterFile ? `/uploads/${posterFile.filename}` : (imageUrl || null);
      const videoPath = videoFile ? `/uploads/${videoFile.filename}` : (videoUrl || null);

      const query = `
        INSERT INTO content
          (type, title, genre, year, released, rating, quality, info, image, video_url, download_base)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await pool.query(query, [
        type || 'Movie',
        String(title).trim(),
        genre || null,
        year ? parseInt(year, 10) : new Date().getFullYear(),
        normalizeReleased(released),
        rating ? parseFloat(rating) : 7.0,
        quality || 'HD',
        info || description || null,
        imagePath,
        videoPath,
        downloadBase || null
      ]);

      console.log('✅ Content inserted, id =', result.insertId);
      res.status(201).json({ id: result.insertId, message: 'Content uploaded successfully' });
    } catch (err) {
      console.error('❌ Create error:', err.sqlMessage || err.message);
      res.status(500).json({
        error: err.sqlMessage || err.message,
        code: err.code || 'UNKNOWN'
      });
    }
  }
);

// 4. UPDATE content (PUT) — was MISSING in your original server.js
app.put(
  '/api/content/:id',
  upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log('--- UPDATE UPLOAD ---', req.params.id);
      console.log('Body:', req.body);
      console.log('Files:', Object.keys(req.files || {}));

      const { id } = req.params;
      const {
        type, title, genre, year, released, rating,
        quality, info, description, downloadBase, imageUrl, videoUrl
      } = req.body;

      // Get existing record so we don't wipe image/video when not re-uploaded
      const [existingRows] = await pool.query('SELECT * FROM content WHERE id = ?', [id]);
      if (existingRows.length === 0) {
        return res.status(404).json({ error: 'Content not found' });
      }
      const existing = existingRows[0];

      const posterFile = req.files?.poster?.[0] || req.files?.image?.[0];
      const videoFile = req.files?.video?.[0];

      const imagePath = posterFile
        ? `/uploads/${posterFile.filename}`
        : (imageUrl || existing.image);

      const videoPath = videoFile
        ? `/uploads/${videoFile.filename}`
        : (videoUrl || existing.video_url);

      const query = `
        UPDATE content SET
          type = ?, title = ?, genre = ?, year = ?, released = ?,
          rating = ?, quality = ?, info = ?, image = ?, video_url = ?, download_base = ?
        WHERE id = ?
      `;

      await pool.query(query, [
        type || existing.type,
        title ? String(title).trim() : existing.title,
        genre ?? existing.genre,
        year ? parseInt(year, 10) : existing.year,
        released !== undefined ? normalizeReleased(released) : existing.released,
        rating ? parseFloat(rating) : existing.rating,
        quality || existing.quality,
        info || description || existing.info,
        imagePath,
        videoPath,
        downloadBase ?? existing.download_base,
        id
      ]);

      console.log('✅ Content updated, id =', id);
      res.json({ id: Number(id), message: 'Content updated successfully' });
    } catch (err) {
      console.error('❌ Update error:', err.sqlMessage || err.message);
      res.status(500).json({
        error: err.sqlMessage || err.message,
        code: err.code || 'UNKNOWN'
      });
    }
  }
);

// 5. Delete content
app.delete('/api/content/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM content WHERE id = ?', [req.params.id]);
    res.json({ message: 'Content deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ================= ERROR HANDLER ================= //
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err.code, err.message);
    return res.status(400).json({ error: `Upload failed: ${err.message}`, code: err.code });
  }
  if (err) {
    console.error('Unexpected error:', err.message);
    return res.status(500).json({ error: err.message });
  }
  next();
});

// ================= STARTUP ================= //
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query('SELECT 1');
    conn.release();
    console.log('✅ MySQL connected to database: stream_store');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    console.error('Check XAMPP: MySQL running? root password "admin@123"? DB "stream_store" exists?');
    process.exit(1);
  }
})();
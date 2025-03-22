// server.js - Your main backend file
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection (could also use MySQL/PostgreSQL)
mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schemas
const ProjectSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  Img: String,
  Link: String,
  TechStack: [String],
  createdAt: { type: Date, default: Date.now }
});

const CertificateSchema = new mongoose.Schema({
  Title: String, 
  Img: String,
  createdAt: { type: Date, default: Date.now }
});

const CommentSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Create models
const Project = mongoose.model('Project', ProjectSchema);
const Certificate = mongoose.model('Certificate', CertificateSchema);
const Comment = mongoose.model('Comment', CommentSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// API Routes for Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const imgPath = req.file ? `/uploads/${req.file.filename}` : '';
    const project = new Project({
      ...req.body,
      Img: imgPath,
      TechStack: JSON.parse(req.body.TechStack || '[]'),
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes for Certificates
app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/certificates', upload.single('image'), async (req, res) => {
  try {
    const imgPath = req.file ? `/uploads/${req.file.filename}` : '';
    const certificate = new Certificate({
      Title: req.body.Title || 'Certificate',
      Img: imgPath
    });
    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes for Comments
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
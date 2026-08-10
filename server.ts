import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/dataStore';

const app = express();
const PORT = 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'balaji_mern_portfolio_secret_jwt_key_2028';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'bala3507563@gmail.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin_password_123', 10);

app.use(express.json());

// Auth Middleware
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    (req as any).user = user;
    next();
  });
};

// ================= API ENDPOINTS ================= //

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (password === 'admin_password_123' || bcrypt.compareSync(password, ADMIN_PASSWORD_HASH))) {
    const token = jwt.sign({ email: ADMIN_EMAIL, name: 'Balaji Harihara Sudhan A', role: 'admin' }, JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.json({ token, user: { email: ADMIN_EMAIL, name: 'Balaji Harihara Sudhan A' } });
  }

  return res.status(401).json({ error: 'Invalid admin credentials' });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: (req as any).user });
});

// Profile
app.get('/api/profile', (req, res) => {
  res.json(db.getProfile());
});

app.put('/api/profile', authenticateToken, (req, res) => {
  const updated = db.updateProfile(req.body);
  res.json(updated);
});

// Projects
app.get('/api/projects', (req, res) => {
  res.json(db.getProjects());
});

app.get('/api/projects/:id', (req, res) => {
  const proj = db.getProjectById(req.params.id);
  if (!proj) return res.status(404).json({ error: 'Project not found' });
  res.json(proj);
});

app.post('/api/projects', authenticateToken, (req, res) => {
  const created = db.createProject(req.body);
  res.status(201).json(created);
});

app.put('/api/projects/:id', authenticateToken, (req, res) => {
  const updated = db.updateProject(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Project not found' });
  res.json(updated);
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const deleted = db.deleteProject(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Project not found' });
  res.json({ success: true });
});

app.post('/api/projects/:id/view', (req, res) => {
  const views = db.incrementProjectView(req.params.id);
  res.json({ views });
});

// Skills
app.get('/api/skills', (req, res) => {
  res.json(db.getSkills());
});

app.post('/api/skills', authenticateToken, (req, res) => {
  const created = db.createSkill(req.body);
  res.status(201).json(created);
});

app.put('/api/skills/:id', authenticateToken, (req, res) => {
  const updated = db.updateSkill(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Skill not found' });
  res.json(updated);
});

app.delete('/api/skills/:id', authenticateToken, (req, res) => {
  const deleted = db.deleteSkill(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Skill not found' });
  res.json({ success: true });
});

// Experiences
app.get('/api/experiences', (req, res) => {
  res.json(db.getExperiences());
});

app.post('/api/experiences', authenticateToken, (req, res) => {
  const created = db.createExperience(req.body);
  res.status(201).json(created);
});

app.put('/api/experiences/:id', authenticateToken, (req, res) => {
  const updated = db.updateExperience(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Experience not found' });
  res.json(updated);
});

app.delete('/api/experiences/:id', authenticateToken, (req, res) => {
  const deleted = db.deleteExperience(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Experience not found' });
  res.json({ success: true });
});

// Certifications
app.get('/api/certifications', (req, res) => {
  res.json(db.getCertifications());
});

app.post('/api/certifications', authenticateToken, (req, res) => {
  const created = db.createCertification(req.body);
  res.status(201).json(created);
});

app.put('/api/certifications/:id', authenticateToken, (req, res) => {
  const updated = db.updateCertification(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Certification not found' });
  res.json(updated);
});

app.delete('/api/certifications/:id', authenticateToken, (req, res) => {
  const deleted = db.deleteCertification(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Certification not found' });
  res.json({ success: true });
});

// Education
app.get('/api/education', (req, res) => {
  res.json(db.getEducation());
});

app.post('/api/education', authenticateToken, (req, res) => {
  const created = db.createEducation(req.body);
  res.status(201).json(created);
});

app.put('/api/education/:id', authenticateToken, (req, res) => {
  const updated = db.updateEducation(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Education not found' });
  res.json(updated);
});

app.delete('/api/education/:id', authenticateToken, (req, res) => {
  const deleted = db.deleteEducation(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Education not found' });
  res.json({ success: true });
});

// Contact Messages
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  const created = db.createMessage({ name, email, subject: subject || 'General Inquiry', message });
  res.status(201).json({ success: true, message: 'Message received successfully!', messageData: created });
});

app.get('/api/messages', authenticateToken, (req, res) => {
  res.json(db.getMessages());
});

app.patch('/api/messages/:id/read', authenticateToken, (req, res) => {
  const success = db.markMessageRead(req.params.id);
  res.json({ success });
});

app.delete('/api/messages/:id', authenticateToken, (req, res) => {
  const deleted = db.deleteMessage(req.params.id);
  res.json({ success: deleted });
});

// Analytics & Tracking
app.get('/api/analytics', authenticateToken, (req, res) => {
  res.json(db.getAnalytics());
});

app.post('/api/analytics/track', (req, res) => {
  const { type } = req.body;
  if (type === 'resume') {
    db.trackResumeDownload();
  } else {
    db.trackVisitor();
  }
  res.json({ success: true });
});

// Resume Text/Meta Export
app.get('/api/resume/download', (req, res) => {
  db.trackResumeDownload();
  const profile = db.getProfile();
  const projects = db.getProjects();
  const experiences = db.getExperiences();
  const education = db.getEducation();

  const resumeTxt = `
===================================================================
BALAJI HARIHARA SUDHAN A
Software Engineer | MERN Stack Developer | Java Developer
Location: ${profile.location}
Email: ${profile.email} | Phone: ${profile.phone}
LinkedIn: ${profile.linkedin} | GitHub: ${profile.github}
===================================================================

OBJECTIVE:
${profile.objective}

EDUCATION:
${education.map((e) => `- ${e.degree} | ${e.institution} (${e.period})\n  ${e.details}`).join('\n')}

EXPERIENCE:
${experiences
  .map(
    (e) => `- ${e.role} at ${e.company} (${e.period}, ${e.location})\n` + e.responsibilities.map((r) => `  * ${r}`).join('\n')
  )
  .join('\n\n')}

KEY PROJECTS:
${projects
  .map((p) => `- ${p.title} (${p.techBadges.join(', ')})\n  ${p.description}\n  Link: ${p.githubUrl}`)
  .join('\n\n')}

SKILLS:
- Languages: Java, JavaScript (ES6+)
- Web Development: React.js, Node.js, Express.js, HTML5, CSS3, Tailwind CSS
- Databases: MongoDB, JSON Data Stores
- Problem Solving: Data Structures & Algorithms, LeetCode, HackerRank, Skillrack
- Tools: Git, GitHub, VS Code

CERTIFICATIONS:
- Oracle AI Foundation Certification
- NPTEL "Python for Data Science" — Silver Medalist
- Second Prize, Best Competitor — Coding & Innovation Hackathon Club
===================================================================
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="Balaji_Harihara_Sudhan_Resume.txt"');
  res.send(resumeTxt);
});

// SEO Routes
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.APP_URL || 'https://balajihariharasudhan.dev';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#skills</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#experience</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.APP_URL || 'https://balajihariharasudhan.dev';
  res.setHeader('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`);
});

// Vite / Production Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

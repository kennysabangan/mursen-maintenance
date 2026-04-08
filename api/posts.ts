import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'src', 'blogs');

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  const slug = req.query.slug as string | undefined;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  if (method === 'GET' && !slug) {
    try {
      const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
      const posts = files.map(file => {
        const content = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf-8');
        return { filename: file, content };
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read posts directory' });
    }
    return;
  }

  if (method === 'GET' && slug) {
    try {
      const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
      const file = files.find(f => f.replace('.md', '') === slug);
      if (!file) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      const content = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf-8');
      res.status(200).json({ filename: file, content });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read post' });
    }
    return;
  }

  if (method === 'POST') {
    const { filename, content } = req.body;
    if (!filename || !content) {
      res.status(400).json({ error: 'Filename and content required' });
      return;
    }

    try {
      const filePath = path.join(BLOGS_DIR, filename);
      if (fs.existsSync(filePath)) {
        res.status(409).json({ error: 'File already exists' });
        return;
      }
      fs.writeFileSync(filePath, content, 'utf-8');
      res.status(201).json({ success: true, filename });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
    return;
  }

  if (method === 'PUT' && slug) {
    const { content, newFilename } = req.body;
    if (!content) {
      res.status(400).json({ error: 'Content required' });
      return;
    }

    try {
      const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
      const oldFile = files.find(f => f.replace('.md', '') === slug);
      if (!oldFile) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      const oldPath = path.join(BLOGS_DIR, oldFile);
      const targetFilename = newFilename || oldFile;
      const newPath = path.join(BLOGS_DIR, targetFilename);

      fs.writeFileSync(newPath, content, 'utf-8');

      if (targetFilename !== oldFile) {
        fs.unlinkSync(oldPath);
      }

      res.status(200).json({ success: true, filename: targetFilename });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
    return;
  }

  if (method === 'DELETE' && slug) {
    try {
      const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
      const file = files.find(f => f.replace('.md', '') === slug);
      if (!file) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      fs.unlinkSync(path.join(BLOGS_DIR, file));
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}

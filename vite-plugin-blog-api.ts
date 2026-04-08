import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

const BLOGS_DIR = path.resolve(__dirname, 'src/blogs');

function blogApiPlugin(): Plugin {
  return {
    name: 'blog-api',
    configureServer(server) {
      server.middlewares.use('/api/posts', (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        // Parse URL to get slug from path like /api/posts/some-slug
        const url = new URL(req.url || '/', `http://${req.headers.host}`);
        const slug = url.pathname.replace(/^\//, '');

        if (req.method === 'GET' && !slug) {
          // List all posts - return filename, and raw content
          const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
          const posts = files.map(file => {
            const content = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf-8');
            return { filename: file, content };
          });
          res.end(JSON.stringify(posts));
          return;
        }

        if (req.method === 'GET' && slug) {
          // Get single post by slug
          const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
          const file = files.find(f => f.replace('.md', '') === slug);
          if (!file) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Post not found' }));
            return;
          }
          const content = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf-8');
          res.end(JSON.stringify({ filename: file, content }));
          return;
        }

        if (req.method === 'PUT' && slug) {
          // Update post
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { content, newFilename } = JSON.parse(body);
              const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
              const oldFile = files.find(f => f.replace('.md', '') === slug);
              if (!oldFile) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Post not found' }));
                return;
              }
              const oldPath = path.join(BLOGS_DIR, oldFile);
              const targetFilename = newFilename || oldFile;
              const newPath = path.join(BLOGS_DIR, targetFilename);

              // Write new content
              fs.writeFileSync(newPath, content, 'utf-8');

              // If filename changed, delete old file
              if (targetFilename !== oldFile) {
                fs.unlinkSync(oldPath);
              }

              res.end(JSON.stringify({ success: true, filename: targetFilename }));
            } catch (e) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
          });
          return;
        }

        if (req.method === 'DELETE' && slug) {
          // Delete post
          const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
          const file = files.find(f => f.replace('.md', '') === slug);
          if (!file) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Post not found' }));
            return;
          }
          fs.unlinkSync(path.join(BLOGS_DIR, file));
          res.end(JSON.stringify({ success: true }));
          return;
        }

        if (req.method === 'POST' && !slug) {
          // Create new post
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { filename, content } = JSON.parse(body);
              const filePath = path.join(BLOGS_DIR, filename);
              if (fs.existsSync(filePath)) {
                res.statusCode = 409;
                res.end(JSON.stringify({ error: 'File already exists' }));
                return;
              }
              fs.writeFileSync(filePath, content, 'utf-8');
              res.end(JSON.stringify({ success: true, filename }));
            } catch (e) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });
    },
  };
}

export default blogApiPlugin;

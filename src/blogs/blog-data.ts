import matter from 'gray-matter';
import { marked } from 'marked';
import type { BlogPost } from './types';

// Dynamically import all markdown files in the blogs directory
const modules = import.meta.globEager('./*.md?raw');

function parseBlogPost(path: string, content: string): BlogPost {
  const { data, content: markdown } = matter(content);
  const html = marked.parse(markdown, { async: false }) as string;

  return {
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    image: data.image as string,
    category: data.category as string,
    readTime: data.readTime as string,
    slug: data.slug as string,
    author: data.author as string,
    tags: data.tags as string[],
    content: html,
    contentRaw: markdown,
  };
}

const posts: BlogPost[] = Object.entries(modules)
  .filter(([path]) => path.endsWith('.md'))
  .map(([path, module]: [string, { default: string }]) => parseBlogPost(path, module.default))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default posts;
export const getPostBySlug = (slug: string) => posts.find(p => p.slug === slug);
export const getPostsByCategory = (category: string) =>
  category === 'All' ? posts : posts.filter(p => p.category === category);

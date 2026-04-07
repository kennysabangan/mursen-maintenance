export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  slug: string;
  author: string;
  tags: string[];
  content: string; // rendered HTML
  contentRaw: string; // markdown (optional, not needed for display)
}

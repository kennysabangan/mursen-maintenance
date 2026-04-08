import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowLeft, Share2, Tag, ChevronRight } from 'lucide-react';
import posts from '../blogs/blog-data';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPjxwYXRoIGQ9Ik01MCAyNUwyNSA0NXYzNWg1MHYtMzVINTB6bTI1IDEwaC0xMHYxNWgxMHYtMTV6IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="section text-center">
        <div className="container-app">
          <h1 className="text-3xl font-bold text-surface-900 mb-4">Post not found</h1>
          <Link to="/blog" className="inline-flex items-center gap-2 text-brand-600 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const siteUrl = 'https://mursenmaintenance.com';

  return (
    <>
      <Helmet>
        <title>{post.title} | Mursen Maintenance Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${siteUrl}/blog/${post.slug}`} />
      </Helmet>

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <section className="section-alt pb-0">
          <div className="container-app">
            <nav className="text-sm text-stone-500 flex items-center gap-2 mb-6">
              <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-stone-900 font-medium">{post.category}</span>
            </nav>
          </div>
        </section>

        {/* Hero */}
        <section className="section pt-0">
          <div className="container-app">
            <article className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 text-sm text-stone-500 mb-4">
                <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-h1 text-surface-900 mb-6 tracking-tight">{post.title}</h1>

              <p className="text-xl text-stone-500 leading-relaxed mb-8">{post.excerpt}</p>
            </article>
          </div>
        </section>

        {/* Featured Image */}
        <div className="container-app mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMAGE; }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="section-alt">
          <div className="container-app">
            <div className="max-w-3xl mx-auto">
              <div
                className="prose prose-stone prose-lg max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-h2 prose-h1:mb-6
                  prose-h2:text-h3 prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-h4 prose-h3:mt-8 prose-h3:mb-3
                  prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:my-6 prose-ul:ml-0 prose-ul:pl-0 prose-ul:list-none
                  prose-li:mb-3 prose-li:pl-0 prose-li:relative prose-li:pl-6 prose-li:before:absolute prose-li:before:left-0 prose-li:before:content-['•'] prose-li:before:text-brand-600 prose-li:before:font-bold
                  prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-surface-900
                  prose-code:bg-stone-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-stone-800
                  prose-pre:bg-stone-900 prose-pre:text-stone-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto
                  prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-stone-600
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>

        {/* Author & Share */}
        <section className="section">
          <div className="container-app">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-2xl p-6 border border-stone-100 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                  <span className="text-brand-700 font-bold text-lg">{post.author.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-surface-900">{post.author}</div>
                  <div className="text-sm text-stone-500">Mursen Maintenance Team</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone-500 font-medium">Share:</span>
                <button className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors" aria-label="Share on Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors" aria-label="Share on Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors" aria-label="Copy link" onClick={() => navigator.clipboard.writeText(`${siteUrl}/blog/${post.slug}`)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section bg-stone-50">
            <div className="container-app">
              <h2 className="text-2xl font-bold text-surface-900 mb-8 tracking-tight">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(rp => (
                  <article key={rp.slug} className="bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="h-32 overflow-hidden">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMAGE; }} />
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-stone-400 mb-2">{rp.category}</div>
                      <h3 className="text-base font-bold text-surface-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                        <Link to={`/blog/${rp.slug}`}>{rp.title}</Link>
                      </h3>
                      <Link to={`/blog/${rp.slug}`} className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium">
                        Read more <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <section className="section">
          <div className="container-app text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-stone-600 hover:text-brand-600 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

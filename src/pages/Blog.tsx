import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Clock, Tag, ChevronRight } from 'lucide-react';
import posts from '../blogs/blog-data';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPjxwYXRoIGQ9Ik01MCAyNUwyNSA0NXYzNWg1MHYtMzVINTB6bTI1IDEwaC0xMHYxNWgxMHYtMTV6IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+';

const categories = ['All', 'Seasonal Maintenance', 'Rental Tips', 'Smart Home', 'DIY Tips', 'Property Care'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();

  const filteredPosts = useMemo(() =>
    activeCategory === 'All'
      ? posts
      : posts.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>Property Maintenance Blog | Mursen Maintenance</title>
        <meta name="description" content="Expert insights on property maintenance, rental tips, and home care from Mursen Maintenance." />
        <link rel="canonical" href={`https://mursenmaintenance.com/blog`} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="section bg-white border-b border-stone-100">
          <div className="container-app">
            <nav className="text-sm text-stone-500 mb-6 flex items-center gap-2">
              <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-stone-900 font-medium">Blog</span>
            </nav>
            <div className="max-w-3xl">
              <h1 className="text-h2 text-surface-900 mb-4 tracking-tight">Insights & Tips</h1>
              <p className="text-lg text-surface-500 leading-relaxed">
                Expert advice on property maintenance, rental management, and keeping your home in peak condition.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="section-alt">
          <div className="container-app">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-brand-600 text-white shadow-glow-brand'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-300 hover:text-brand-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured Post */}
            {featuredPost && activeCategory === 'All' && (
              <article className="mb-16 bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-card hover:shadow-card-hover transition-all duration-300 group">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-brand-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                        <Tag className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-stone-500 mb-4">
                      <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-surface-900 mb-4 leading-tight group-hover:text-brand-700 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-surface-500 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 group/link"
                    >
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Grid */}
            {gridPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {gridPosts.map(post => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-2xl border border-stone-100 shadow-soft overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur text-stone-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-surface-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-stone-500 mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-brand-600 text-sm font-semibold hover:text-brand-700"
                      >
                        Read more
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-stone-500">No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section bg-stone-900 text-white">
          <div className="container-app text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Stay Informed</h2>
            <p className="text-stone-300 mb-8">
              Get the latest property maintenance tips and Mursen updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-stone-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

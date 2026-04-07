import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Shield, Award, Building2, Star, MessageSquare, ArrowRight, User, MessageCircle, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Contact Us | Mursen Maintenance - Covington KY';
  const seoDescription = 'Get in touch with Mursen Maintenance in Covington KY. Call (859) 555-0123 or email hello@mursenmaintenance.com. Fully insured, bonded, and trusted by 24+ property owners.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="Covington contact, property maintenance contact, rental maintenance Kentucky" />
        <link rel="canonical" href={`${siteUrl}/contact`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/contact`} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="Mursen Maintenance" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
      </Helmet>
      <div className="min-h-screen bg-white">
      {/* Header — clean, light */}
      <section className="relative bg-brand-600 text-white py-24 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About Us &amp; Contact</h1>
          <p className="text-lg text-brand-100 max-w-2xl mx-auto leading-relaxed">
            We built the maintenance solution we wish we had for our own rental properties.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg text-stone-600 leading-relaxed">
              We started managing our own rental properties in Covington and got frustrated with the same maintenance nightmares you face — no-shows, inflated quotes, emergency repairs at 2 AM, and contractors who don't communicate.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed">
              So we built the solution we wish existed — a maintenance service that treats every property like a business operation. We developed the 75-point inspection system, the same-technician guarantee, and the vendor concierge network to make property maintenance predictable, professional, and hands-off.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed">
              We're Covington locals. We care about this community. Your property matters to us because we live here too — and because we've been in your shoes.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Shield, title: 'Reliability', desc: 'We show up. On time. Every time. It is non-negotiable.', color: 'brand' },
              { icon: Star, title: 'Transparency', desc: 'Clear pricing, photo evidence, no hidden fees. Ever.', color: 'orange' },
              { icon: Award, title: 'Quality', desc: 'We do it right the first time, or we fix it free.', color: 'teal' },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="text-center">
                  <div className={`w-14 h-14 bg-${value.color}-50 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-7 h-7 text-${value.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-lg text-stone-900 mb-2">{value.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-20 px-6 bg-stone-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-10">Fully Credentialed. Fully Committed.</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { label: 'Fully Insured', sub: 'Commercial General Liability', icon: Shield, color: 'brand' },
              { label: 'Bonded', sub: '$1M surety bond', icon: Award, color: 'teal' },
              { label: 'Licensed', sub: 'KY Trade Licenses', icon: Building2, color: 'orange' },
              { label: 'BBB Accredited', sub: 'A+ Rating', icon: Star, color: 'brand' },
            ].map((badge, i) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={i} className="bg-white px-6 py-5 rounded-xl border border-stone-100 shadow-soft min-w-[160px] hover:shadow-card transition-shadow duration-300">
                  <BadgeIcon className={`w-6 h-6 text-${badge.color}-600 mx-auto mb-3`} />
                  <div className="text-sm font-semibold text-stone-900">{badge.label}</div>
                  <div className="text-xs text-stone-500 mt-1">{badge.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Get In Touch</h2>
            <p className="text-lg text-stone-500">We respond within 2 hours during business hours.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-14">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-8 tracking-tight">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: 'Phone', value: '(859) 555-0123', href: 'tel:+18595550123' },
                    { icon: Mail, label: 'Email', value: 'hello@mursenmaintenance.com', href: 'mailto:hello@mursenmaintenance.com' },
                    { icon: MapPin, label: 'Office', value: '123 Main Street, Covington, KY 41011' },
                    { icon: Clock, label: 'Business Hours', value: 'Mon–Fri, 8am–6pm EST' },
                  ].map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ItemIcon className="w-5 h-5 text-brand-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-stone-700 text-sm">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="text-brand-600 hover:text-brand-700 font-medium transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-stone-600 text-sm">{item.value}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Assessment CTA */}
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-teal-700 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">Quick Assessment</h4>
                    <p className="text-sm text-stone-600 mb-3">Tell us about your property and we'll get back to you with a custom plan.</p>
                    <Link to="/assessment" className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-sm group">
                      Schedule Free Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-8 tracking-tight">Send a Message</h3>
              {formSubmitted ? (
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-10 text-center">
                  <Check className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-brand-800 mb-2 tracking-tight">Message Sent!</h3>
                  <p className="text-stone-600 mb-6">We'll get back to you within 2 hours.</p>
                  <button onClick={() => setFormSubmitted(false)} className="text-brand-600 hover:text-brand-700 font-semibold">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-semibold text-stone-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        required
                        placeholder="John Smith"
                        className="input-field-icon"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-semibold text-stone-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        required
                        placeholder="john@example.com"
                        className="input-field-icon"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactMessage" className="block text-sm font-semibold text-stone-700 mb-2">
                      How can we help? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-stone-400 pointer-events-none" />
                      <textarea
                        id="contactMessage"
                        name="contactMessage"
                        required
                        rows={5}
                        placeholder="Tell us about your property maintenance needs..."
                        className="w-full pl-12 pr-4 py-3.5 border border-stone-200 rounded-xl bg-white text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:outline-none transition-all duration-200 shadow-soft resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-glow-brand focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-stone-400 text-center">We typically respond within 2 hours during business hours (Mon-Fri, 8am-6pm EST).</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

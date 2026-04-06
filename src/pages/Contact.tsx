import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Shield, Award, Building2, Star, MessageSquare, ArrowRight, User, MessageCircle, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary-800 to-surface-900 text-white py-28 px-6 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent-500/[0.05] rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">About Us & Contact</h1>
          <p className="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed">
            We built the maintenance solution we wish existed for our own 24 rental properties.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-surface-600 leading-relaxed mb-6">
              We started managing our own 24 rental properties in Covington and got frustrated with the same maintenance nightmares you face. No-shows, inflated quotes, emergency repairs between guest stays, and contractors who don't communicate.
            </p>
            <p className="text-lg text-surface-600 leading-relaxed mb-6">
              So we built the solution we wish existed — a maintenance service that treats rental properties like a business operation. We developed the 75-point inspection system, the same-technician guarantee, and the vendor concierge network to make property maintenance predictable, professional, and hands-off for owners.
            </p>
            <p className="text-lg text-surface-600 leading-relaxed mb-8">
              Today, we keep 24 rental properties guest-ready 365 days a year. And we're ready to do the same for your portfolio.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: Shield,
                title: 'Reliability',
                desc: 'We show up. On time. Every time. That is non-negotiable.',
                color: 'text-primary-700',
                bg: 'bg-primary-50',
              },
              {
                icon: Star,
                title: 'Transparency',
                desc: 'Clear pricing, photo evidence, no hidden fees. Ever.',
                color: 'text-accent-600',
                bg: 'bg-accent-50',
              },
              {
                icon: Award,
                title: 'Quality',
                desc: 'We do it right the first time, or we fix it free.',
                color: 'text-secondary-600',
                bg: 'bg-secondary-50',
              },
            ].map((value) => (
              <div key={value.title} className="text-center group">
                <div className={`w-16 h-16 ${value.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <h3 className="text-1.5rem font-bold text-surface-900 mb-2 tracking-tight">{value.title}</h3>
                <p className="text-surface-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-surface-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-surface-900 mb-3">Meet The Team</h2>
            <p className="text-lg text-surface-500 leading-relaxed">The people behind your property's care.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Mike Henderson',
                role: 'Lead Technician',
                bio: '15 years in property maintenance. Certified HVAC, plumbing, and electrical. Manages all 24 client properties personally.',
                avatar: 'M',
              },
              {
                name: 'Sarah Kim',
                role: 'Operations Manager',
                bio: 'Coordinates scheduling, vendor networks, and client communications. Former Airbnb host who knows the pain firsthand.',
                avatar: 'S',
              },
              {
                name: 'David Ross',
                role: 'Founder',
                bio: 'Built the Mursen system after managing 24 rentals himself. MBA, former property manager and landlord.',
                avatar: 'D',
              },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-surface-100 p-8 text-center shadow-soft hover:shadow-medium transition-shadow duration-300 group">
                <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-surface-900 text-lg tracking-tight">{member.name}</h3>
                <div className="text-sm text-secondary-600 font-semibold mb-3">{member.role}</div>
                <p className="text-surface-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 px-6 bg-primary-800 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-white mb-10">Credentials & Certifications</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { label: 'Fully Insured', sub: 'Commercial General Liability', icon: Shield },
              { label: 'Bonded', sub: '$1M surety bond', icon: Award },
              { label: 'Licensed', sub: 'KY Trade Licenses', icon: Building2 },
              { label: 'BBB Accredited', sub: 'A+ Rating', icon: Star },
            ].map((badge) => (
              <div key={badge.label} className="bg-white/10 backdrop-blur-sm px-6 py-5 rounded-2xl hover:bg-white/15 transition-colors cursor-default min-w-[160px]">
                <badge.icon className="w-6 h-6 text-accent-400 mx-auto mb-3" />
                <div className="text-sm font-bold">{badge.label}</div>
                <div className="text-xs text-surface-400 mt-1">{badge.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-surface-900 mb-3">Get In Touch</h2>
            <p className="text-lg text-surface-500 leading-relaxed">We respond within 2 hours during business hours.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-1.875rem font-bold text-surface-900 mb-8 tracking-tight">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: 'Phone', value: '(859) 555-0123', href: 'tel:+18595550123', active: true },
                    { icon: Mail, label: 'Email', value: 'hello@mursenmaintenance.com', href: 'mailto:hello@mursenmaintenance.com', active: true },
                    { icon: MapPin, label: 'Office', value: '123 Main Street, Covington, KY 41011', href: undefined },
                    { icon: Clock, label: 'Response Promise', value: 'We respond within 2 hours during business hours.', href: undefined },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-surface-700 text-sm">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-primary-700 hover:text-primary-800 font-medium cursor-pointer transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-surface-600">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Assessment CTA */}
              <div className="bg-surface-50 rounded-2xl p-6 border border-surface-100">
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-surface-900 mb-1">Quick Assessment</h4>
                    <p className="text-sm text-surface-500 mb-3">Tell us about your property and we'll get back to you with a custom plan.</p>
                    <Link to="/assessment" className="inline-flex items-center gap-1 text-primary-700 hover:text-primary-800 font-semibold text-sm cursor-pointer transition-colors">
                      Schedule Free Assessment <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-1.875rem font-bold text-surface-900 mb-8 tracking-tight">Send a Message</h3>
              {formSubmitted ? (
                <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-10 text-center">
                  <Check className="w-12 h-12 text-secondary-500 mx-auto mb-4" />
                  <h3 className="text-1.5rem font-bold text-secondary-800 mb-2 tracking-tight">Message Sent!</h3>
                  <p className="text-surface-500 mb-6">We'll get back to you within 2 hours.</p>
                  <button onClick={() => setFormSubmitted(false)} className="text-primary-700 hover:text-primary-800 font-semibold cursor-pointer transition-colors">
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
                    <label htmlFor="contactName" className="block text-sm font-semibold text-surface-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300 pointer-events-none" />
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        required
                        placeholder="John Smith"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-semibold text-surface-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300 pointer-events-none" />
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        required
                        placeholder="john@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactMessage" className="block text-sm font-semibold text-surface-700 mb-2">
                      How can we help? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-surface-300 pointer-events-none" />
                      <textarea
                        id="contactMessage"
                        name="contactMessage"
                        required
                        rows={5}
                        placeholder="Tell us about your property maintenance needs..."
                        className="w-full pl-12 pr-4 py-4 border border-surface-200 rounded-2xl bg-white text-surface-700 placeholder:text-surface-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 focus:outline-none transition-all duration-200 shadow-sm resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-surface-900 hover:bg-primary-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-surface-400 text-center">We typically respond within 2 hours during business hours (Mon-Fri, 8am-6pm EST).</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

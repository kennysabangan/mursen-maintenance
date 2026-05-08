import { useState } from 'react';
import { CalendarDays, Home, Phone, Mail, MapPin, User, Users, MessageSquare, CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PHONE_DISPLAY = '(859) MURSEN-1';
const PHONE_HREF = 'tel:+18596877361';
const EMAIL = 'hi@mursen.com';

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  units: string;
  howHeard: string;
  dateTime: string;
};

const initialFormData: FormData = {
  name: '', email: '', phone: '', address: '',
  propertyType: '', units: '', howHeard: '', dateTime: '',
};

export default function AssessmentBooking() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const siteUrl = 'https://mursen.com';
  const seoTitle = 'Book a Free 15-Min Walk-Through | Mursen';
  const seoDescription = 'Free property walk-through, on-the-spot quote, no high-pressure pitch. Just a real number. Covington KY · Cincinnati metro.';

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <link rel="canonical" href={`${siteUrl}/assessment`} />
        </Helmet>
        <section className="bg-cream-100 min-h-[80vh] flex items-center justify-center py-20">
          <div className="container-tight">
            <div className="card-cream text-center">
              <div className="w-16 h-16 bg-rust-500 text-cream-50 rounded-md flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="eyebrow mb-3 justify-center">Walk-Through Booked</p>
              <h2 className="heading-2 text-balance mb-4">
                We'll be in touch <span className="accent-serif font-normal text-rust-500">within 2 hours.</span>
              </h2>
              <p className="text-ink-500 mb-8 leading-relaxed">
                A real human will call to confirm your time and ask a few questions about your property. No high-pressure pitch. Just a real number.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData(initialFormData); }}
                className="btn-link"
              >
                Book another walk-through <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`${siteUrl}/assessment`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
      </Helmet>

      {/* HERO */}
      <section className="bg-cream-100 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="container-app">
          <div className="flex items-start justify-between mb-12">
            <p className="eyebrow">Get Started</p>
            <span className="page-meta hidden md:inline">Free Walk-Through · 04/04</span>
          </div>
          <h1 className="heading-display mb-8 text-balance max-w-5xl">
            BOOK A FREE
            <br />
            <span className="accent-serif font-normal text-rust-500">15-min walk-through.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-700 max-w-2xl leading-relaxed mb-8">
            We'll quote your home, walk your property, and lock in your launch pricing on the spot. No high-pressure pitch. Just a real number.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <span className="pill-rust">Free · No obligation</span>
            <span className="pill-outline">2-hour response</span>
            <span className="pill-outline">Photo report included</span>
          </div>
        </div>
      </section>

      {/* FORM + STATS */}
      <section className="bg-cream-50 border-y border-ink-900/10 py-20 md:py-24">
        <div className="container-app">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">
            {/* Form */}
            <div className="card-cream">
              <p className="eyebrow mb-3">Tell us about your home</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[-0.02em] mb-8">Quick property snapshot.</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField label="Full Name" name="name" type="text" placeholder="John Smith" icon={User} value={formData.name} onChange={handleChange} required />
                  <FormField label="Email" name="email" type="email" placeholder="john@example.com" icon={Mail} value={formData.email} onChange={handleChange} required />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <FormField label="Phone" name="phone" type="tel" placeholder="(859) 555-0123" icon={Phone} value={formData.phone} onChange={handleChange} required />
                  <FormField label="Property Address" name="address" type="text" placeholder="123 Main St, City, KY" icon={MapPin} value={formData.address} onChange={handleChange} required />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-700 mb-2">Property Type *</label>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
                    <select name="propertyType" required value={formData.propertyType} onChange={handleChange} className="select-field">
                      <option value="">Select property type</option>
                      <option value="single-family">Single-Family Home</option>
                      <option value="duplex">Duplex</option>
                      <option value="multi-family">Multi-Family (3+ units)</option>
                      <option value="condo">Condo</option>
                      <option value="str">Short-Term Rental (Airbnb/VRBO)</option>
                      <option value="personal">My Own Home</option>
                    </select>
                  </div>
                </div>

                {formData.propertyType === 'multi-family' && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-700 mb-2">Number of Units *</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
                      <input type="number" name="units" required min="3" value={formData.units} onChange={handleChange} className="input-field-icon" placeholder="3" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-700 mb-2">How did you hear about us?</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
                    <select name="howHeard" value={formData.howHeard} onChange={handleChange} className="select-field">
                      <option value="">Select an option</option>
                      <option value="google">Google Search</option>
                      <option value="facebook">Facebook</option>
                      <option value="referral">Referral</option>
                      <option value="airbnb">Airbnb host forum</option>
                      <option value="local">Local search</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-700 mb-2">Preferred Date & Time *</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
                    <input type="datetime-local" name="dateTime" required value={formData.dateTime} onChange={handleChange} className="input-field-icon" />
                  </div>
                </div>

                <button type="submit" className="btn-primary-lg w-full">
                  Schedule Walk-Through <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-ink-400 text-center">We respond within 2 hours · Mon–Fri 8am–6pm EST</p>
              </form>
            </div>

            {/* Side panel */}
            <div className="space-y-4">
              <div className="card-dark">
                <p className="eyebrow-light mb-4">What to expect</p>
                <ul className="space-y-3 text-cream-100/85 text-sm">
                  {[
                    '15-minute property walk-through',
                    'Detailed photo report within 24h',
                    'Flat-rate quote — no surprise pricing',
                    'No obligation, no high-pressure pitch',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-rust-300 font-black flex-shrink-0">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-cream">
                <p className="eyebrow mb-4">Or call us directly</p>
                <a href={PHONE_HREF} className="block font-black text-2xl tracking-[-0.02em] text-ink-900 hover:text-rust-500 transition-colors mb-2">{PHONE_DISPLAY}</a>
                <p className="text-sm text-ink-500 mb-4">Real human answers · Mon–Fri 8am–6pm</p>
                <div className="pt-4 border-t border-ink-900/10 space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-ink-700">
                    <Clock className="w-3.5 h-3.5 text-rust-500" />
                    Same-day or next-day scheduling
                  </p>
                  <p className="flex items-center gap-2 text-ink-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-rust-500" />
                    Insured · Bonded · Licensed
                  </p>
                  <p className="flex items-center gap-2 text-ink-700">
                    <Mail className="w-3.5 h-3.5 text-rust-500" />
                    {EMAIL}
                  </p>
                </div>
              </div>

              <div className="bg-rust-500 text-cream-50 rounded-md p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream-100/80 mb-2">Launch Pricing</p>
                <p className="accent-serif text-base leading-relaxed">
                  Sign up before season-end and lock your monthly rate for 12 months. We're capping new homeowners at 50 this quarter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FormField({ label, name, type, placeholder, icon: Icon, value, onChange, required }: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-700 mb-2">
        {label} {required && '*'}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
        <input type={type} id={name} name={name} required={required} value={value} onChange={onChange} placeholder={placeholder} className="input-field-icon" />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { CalendarDays, Home, Phone, Mail, MapPin, User, Users, MessageSquare, CheckCircle2, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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
  name: '',
  email: '',
  phone: '',
  address: '',
  propertyType: '',
  units: '',
  howHeard: '',
  dateTime: '',
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

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Free Property Assessment | Mursen Maintenance';
  const seoDescription = 'Book a free 75-point property health assessment. Get a detailed photo report within 24 hours. No obligation. Servicing Covington KY and surrounding areas.';

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content="free property assessment, Covington property inspection, rental property health check" />
          <link rel="canonical" href={`${siteUrl}/assessment`} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${siteUrl}/assessment`} />
          <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
          <meta property="og:site_name" content="Mursen Maintenance" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDescription} />
          <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        </Helmet>
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center animate-fade-up">
          <div className="bg-white rounded-2xl p-12 shadow-card border border-stone-100">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-brand-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">Assessment Scheduled!</h2>
            <p className="text-stone-500 mb-8 leading-relaxed">
              We'll contact you within 2 hours to confirm your appointment. Get ready for a comprehensive 75-point inspection!
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData(initialFormData); }}
              className="text-brand-600 hover:text-brand-700 font-semibold cursor-pointer transition-colors inline-flex items-center gap-1"
            >
              Schedule Another Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
  }

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="free property assessment, Covington property inspection, rental property health check" />
        <link rel="canonical" href={`${siteUrl}/assessment`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/assessment`} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="Mursen Maintenance" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
      </Helmet>
      <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative bg-brand-600 text-white py-24 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 text-brand-50">
            <Sparkles className="w-4 h-4" />
            Free · No Obligation · 24hr Report
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Free Property Health Assessment
          </h1>
          <p className="text-lg text-brand-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            A comprehensive 75-point inspection with a detailed photo report. We identify every issue that could cost you money down the road.
          </p>
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl border border-brand-500">
            <span className="text-lg">
              <span className="text-brand-200 line-through">$399</span>
              <span className="mx-2 text-brand-300">→</span>
              <span className="text-white font-extrabold text-2xl">Free</span>
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-6 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-card border border-stone-100">
            <h2 className="text-2xl font-bold text-stone-900 mb-8 tracking-tight">Tell Us About Your Property</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Full Name" name="name" type="text" placeholder="John Smith" icon={User} value={formData.name} onChange={handleChange} required />
                <FormField label="Email" name="email" type="email" placeholder="john@example.com" icon={Mail} value={formData.email} onChange={handleChange} required />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Phone" name="phone" type="tel" placeholder="(859) 555-0123" icon={Phone} value={formData.phone} onChange={handleChange} required />
                <FormField label="Property Address" name="address" type="text" placeholder="123 Main St, Covington, KY" icon={MapPin} value={formData.address} onChange={handleChange} required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Property Type <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                  <select
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="select-field"
                  >
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
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Number of Units <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                    <input type="number" name="units" required min="3" value={formData.units} onChange={handleChange} className="input-field-icon" placeholder="3" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">How did you hear about us?</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                  <select name="howHeard" value={formData.howHeard} onChange={handleChange} className="select-field">
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="facebook">Facebook</option>
                    <option value="referral">Referral from another owner</option>
                    <option value="airbnb">Airbnb host forum</option>
                    <option value="local">Local search</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Preferred Date &amp; Time <span className="text-red-500">*</span></label>
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                  <input type="datetime-local" name="dateTime" required value={formData.dateTime} onChange={handleChange} className="input-field-icon" />
                </div>
              </div>

              <button type="submit" className="w-full btn-primary-lg mt-4">
                <CalendarDays className="w-5 h-5" />
                Schedule Free Assessment
              </button>
              <p className="text-xs text-stone-400 text-center">
                By submitting, you agree to our terms and privacy policy. We respond within 2 hours.
              </p>
            </form>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: Shield, title: '75-Point Check', desc: 'Thorough inspection' },
              { icon: CalendarDays, title: 'Photo Report', desc: 'Digital in 24hr' },
              { icon: Mail, title: '$399 Value', desc: 'Always free' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-5 text-center border border-stone-100 shadow-soft">
                  <Icon className="w-6 h-6 text-brand-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-sm text-stone-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-stone-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

function FormField({
  label, name, type, placeholder, icon: Icon, value, onChange, required,
}: {
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
      <label htmlFor={name} className="block text-sm font-semibold text-stone-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
        <input
          type={type}
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field-icon"
        />
      </div>
    </div>
  );
}

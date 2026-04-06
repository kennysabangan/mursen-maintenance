import { useState } from 'react';
import { CalendarDays, Home, Phone, Mail, MapPin, User, Users, MessageSquare, CheckCircle2, Gift, DollarSign, ArrowRight, Sparkles, Shield } from 'lucide-react';

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

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center animate-scale-in">
          <div className="bg-white rounded-3xl p-12 shadow-soft border border-surface-100">
            <div className="w-20 h-20 bg-secondary-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-secondary-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-surface-900 mb-3 tracking-tight">Assessment Scheduled!</h2>
            <p className="text-surface-500 mb-8 leading-relaxed">
              We will contact you within 2 hours to confirm your appointment. Get ready for a comprehensive 75-point inspection!
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData(initialFormData); }}
              className="text-primary-700 hover:text-primary-800 font-semibold cursor-pointer transition-colors inline-flex items-center gap-1"
            >
              Schedule Another Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 to-surface-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent-500/[0.04] rounded-full blur-[120px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent-500/20 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 text-accent-400">
            <Sparkles className="w-4 h-4" />
            Free · No Obligation · 24 Hours
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Free Property<br />Health Assessment
          </h1>
          <p className="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            A comprehensive 75-point inspection with a detailed photo report. We identify every issue that could cost you money.
          </p>
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/10">
            <DollarSign className="w-6 h-6 text-surface-400" />
            <span className="text-lg">
              <span className="text-surface-400 line-through">$399 Value</span>
              <span className="mx-2 text-surface-500">→</span>
              <span className="text-accent-400 font-extrabold text-2xl">$0</span>
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-6 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-surface-100">
            <h2 className="text-2xl font-extrabold text-surface-900 mb-8 tracking-tight">Tell Us About Your Property</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <FormField label="Full Name" name="name" type="text" placeholder="John Smith" icon={User} value={formData.name} onChange={handleChange} required />
                <FormField label="Email" name="email" type="email" placeholder="john@example.com" icon={Mail} value={formData.email} onChange={handleChange} required />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <FormField label="Phone" name="phone" type="tel" placeholder="(859) 555-0123" icon={Phone} value={formData.phone} onChange={handleChange} required />
                <FormField label="Property Address" name="address" type="text" placeholder="123 Main St, Covington, KY" icon={MapPin} value={formData.address} onChange={handleChange} required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-2">Property Type <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300 pointer-events-none" />
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
                  </select>
                </div>
              </div>

              {formData.propertyType === 'multi-family' && (
                <div>
                  <label className="block text-sm font-semibold text-surface-700 mb-2">Number of Units <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300 pointer-events-none" />
                    <input type="number" name="units" required min="3" value={formData.units} onChange={handleChange} className="input-field" placeholder="3" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-2">How did you hear about us?</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300 pointer-events-none" />
                  <select name="howHeard" value={formData.howHeard} onChange={handleChange} className="select-field">
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="facebook">Facebook</option>
                    <option value="referral">Referral from another owner</option>
                    <option value="airbnb">Airbnb host forum</option>
                    <option value="local">Local property manager</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-2">Preferred Date & Time <span className="text-red-500">*</span></label>
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300 pointer-events-none" />
                  <input type="datetime-local" name="dateTime" required value={formData.dateTime} onChange={handleChange} className="input-field" />
                </div>
              </div>

              <button type="submit" className="w-full btn-primary-lg mt-4">
                <CalendarDays className="w-5 h-5" />
                Schedule Free Assessment
              </button>
              <p className="text-xs text-surface-400 text-center">
                By submitting, you agree to our terms and privacy policy. We respond within 2 hours.
              </p>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Shield, title: '75-Point Check', desc: 'Thorough on-site inspection' },
              { icon: CalendarDays, title: 'Photo Report', desc: 'Digital report in 24hr' },
              { icon: Gift, title: '$399 Value', desc: '100% free, zero obligation' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 text-center border border-surface-100 shadow-soft hover:shadow-medium transition-all duration-300">
                <item.icon className="w-6 h-6 text-primary-700 mx-auto mb-3" />
                <h3 className="font-bold text-sm text-surface-900 mb-1">{item.title}</h3>
                <p className="text-xs text-surface-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-3xl p-8 text-center border border-surface-100 shadow-soft">
            <p className="text-sm text-surface-400 mb-2">Or book directly via Calendly</p>
            <div className="h-32 flex items-center justify-center text-surface-200 text-sm border-2 border-dashed border-surface-200 rounded-2xl">
              Calendly widget — add your event URL here
            </div>
          </div>
        </div>
      </section>
    </div>
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
      <label htmlFor={name} className="block text-sm font-semibold text-surface-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300 pointer-events-none" />
        <input
          type={type}
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
      </div>
    </div>
  );
}

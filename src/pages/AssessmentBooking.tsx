import { useState } from 'react';
import { CalendarDays, Home, Phone, Mail, MapPin, User, Users, MessageSquare, Clock, Check, Gift, DollarSign } from 'lucide-react';

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
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center bg-white border border-slate-200 rounded-2xl p-12 shadow-lg">
          <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-secondary-600" />
          </div>
          <h2 className="text-2xl font-bold text-primary-800 mb-3">Assessment Requested!</h2>
          <p className="text-slate-600 mb-6">We'll contact you within 2 hours to confirm your appointment. Get ready for a 75-point inspection!</p>
          <button
            onClick={() => { setSubmitted(false); setFormData(initialFormData); }}
            className="text-primary-600 hover:text-primary-700 font-semibold cursor-pointer"
          >
            ← Schedule Another Assessment
          </button>
        </div>
      </div>
    );
  }

  const fields: { label: string; name: keyof FormData; type: string; placeholder: string; icon: React.ComponentType<{ className?: string }>; required?: boolean; options?: { value: string; label: string }[] }[] = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Smith', icon: User, required: true },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@example.com', icon: Mail, required: true },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '(859) 555-0123', icon: Phone, required: true },
    { label: 'Property Address', name: 'address', type: 'text', placeholder: '123 Main St, Covington, KY', icon: MapPin, required: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary-600 to-slate-900 text-white py-16 px-6 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            100% Free • No Obligation
          </div>
          <h1 className="heading-xl text-white mb-4 text-balance">
            Free Property Health Assessment
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto ml-auto leading-relaxed text-balance">
            Get a comprehensive 75-point inspection with a photo report. We'll identify every maintenance issue that could cost you money or hurt your reviews.
          </p>
          <div className="mt-6 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
            <DollarSign className="w-6 h-6 text-slate-400" />
            <span className="text-sm">
              Value: <span className="line-through text-slate-400">$399</span>
              {' '}→ <span className="text-accent-400 font-bold text-lg">Your Price: $0</span>
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10">
            <p className="text-center text-slate-500 text-sm mb-8">
              After the assessment, we'll present your customized Mursen Property Guardian plan if it makes sense for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {fields.slice(0, 2).map((field) => (
                  <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleChange} />
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {fields.slice(2, 4).map((field) => (
                  <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleChange} />
                ))}
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="propertyType" className="block text-sm font-semibold text-slate-700 mb-2">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-slate-700 cursor-pointer transition"
                  >
                    <option value="">Select property type</option>
                    <option value="single-family">Single-family Home</option>
                    <option value="duplex">Duplex</option>
                    <option value="multi-family">Multi-family (3+ units)</option>
                    <option value="condo">Condo</option>
                    <option value="str">Short-term Rental (Airbnb/VRBO)</option>
                  </select>
                </div>
              </div>

              {/* Units */}
              {formData.propertyType === 'multi-family' && (
                <div>
                  <label htmlFor="units" className="block text-sm font-semibold text-slate-700 mb-2">
                    Number of Units <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input
                      type="number"
                      id="units"
                      name="units"
                      required
                      min="3"
                      value={formData.units}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-700"
                      placeholder="3"
                    />
                  </div>
                </div>
              )}

              {/* How Heard */}
              <div>
                <label htmlFor="howHeard" className="block text-sm font-semibold text-slate-700 mb-2">
                  How did you hear about us?
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select
                    id="howHeard"
                    name="howHeard"
                    value={formData.howHeard}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-slate-700 cursor-pointer transition"
                  >
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

              {/* DateTime */}
              <div>
                <label htmlFor="dateTime" className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Assessment Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="datetime-local"
                    id="dateTime"
                    name="dateTime"
                    required
                    value={formData.dateTime}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
              >
                <span className="flex items-center justify-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Schedule Free Assessment
                </span>
              </button>
              <p className="text-xs text-slate-400 text-center">
                By submitting, you agree to our terms and privacy policy. We respond within 2 hours.
              </p>
            </form>
          </div>

          {/* What to Expect */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { icon: Clock, title: '2-3 Hours On-Site', desc: 'Thorough 75-point inspection of your entire property' },
              { icon: MapPin, title: 'Photo Report', desc: 'Detailed digital report with photo evidence of every item' },
              { icon: Gift, title: '$399 Value Free', desc: 'Zero cost, zero obligation. No pressure sales pitch' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <item.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Calendly Placeholder */}
          <div className="mt-12 bg-white p-8 rounded-xl border-2 border-dashed border-slate-300 text-center">
            <p className="text-slate-400 text-sm">Or book directly via Calendly</p>
            <div className="mt-4 h-48 flex items-center justify-center text-slate-300 text-sm">
              [Calendly inline widget — add your event URL here]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({
  field,
  value,
  onChange,
}: {
  field: { label: string; name: keyof FormData; type: string; placeholder: string; icon: React.ComponentType<{ className?: string }>; required?: boolean };
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}) {
  const Icon = field.icon;
  return (
    <div>
      <label htmlFor={field.name} className="block text-sm font-semibold text-slate-700 mb-2">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type={field.type}
          id={field.name}
          name={field.name}
          required={field.required}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-700 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

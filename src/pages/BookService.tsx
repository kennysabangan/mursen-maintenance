import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, Leaf, Droplets, Sparkles, Wrench, ArrowRight, Upload } from 'lucide-react';

export default function BookService() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    // Service-specific fields
    lotSize: '',
    preferredStartDate: '',
    surfaces: [] as string[],
    photoUpload: null as File | null,
    windowCount: '',
    interiorExterior: 'exterior',
    workDescription: '',
    priorityLevel: 'normal',
  });

  const services = [
    { id: 'lawn', name: 'Lawn Care', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'power-wash', name: 'Power Washing', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'windows', name: 'Window Cleaning', icon: Sparkles, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'handyman', name: 'Handyman', icon: Wrench, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (surface: string) => {
    setFormData({
      ...formData,
      surfaces: formData.surfaces.includes(surface)
        ? formData.surfaces.filter(s => s !== surface)
        : [...formData.surfaces, surface],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photoUpload: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Stripe payment & Supabase booking storage
    console.log('Booking submission:', { selectedService, ...formData });
    alert('Booking submitted! We\'ll contact you within 24 hours to confirm.');
  };

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Book A Service — Mursen Maintenance';
  const seoDescription = 'Book lawn care, power washing, window cleaning, or handyman services. Simple form, transparent pricing, fast scheduling.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`${siteUrl}/book`} />
      </Helmet>

      <section className="section bg-gray-50 min-h-screen">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Book A Service
            </h1>
            <p className="text-lg text-gray-500">
              Simple booking, transparent pricing, fast scheduling. Let\'s get started.
            </p>
          </div>

          {/* Step 1: Select Service */}
          {!selectedService && (
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 uppercase">Step 1: What Do You Need?</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex items-center gap-4 ${service.bg} border-2 border-transparent hover:border-brand-400 rounded-2xl p-6 text-left transition-all cursor-pointer`}
                  >
                    <div className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center`}>
                      <service.icon className={`w-7 h-7 ${service.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-gray-900 uppercase tracking-wide">{service.name}</h3>
                      <p className="text-sm text-gray-500">Click to continue</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Service-Specific Form */}
          {selectedService && (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <h2 className="font-display text-2xl font-bold text-gray-900 uppercase">
                  {services.find(s => s.id === selectedService)?.name} Booking
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedService('')}
                  className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
                >
                  Change Service
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="(859) 555-0123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Service Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="123 Main St, Covington, KY 41011"
                  />
                </div>
              </div>

              {/* Service-Specific Fields */}
              {selectedService === 'lawn' && (
                <div className="space-y-5 mb-6 pt-6 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Approximate Lot Size</label>
                    <select
                      name="lotSize"
                      value={formData.lotSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Select lot size</option>
                      <option value="small">Small (under 5,000 sq ft)</option>
                      <option value="medium">Medium (5,000–10,000 sq ft)</option>
                      <option value="large">Large (10,000+ sq ft)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Start Date</label>
                    <input
                      type="date"
                      name="preferredStartDate"
                      value={formData.preferredStartDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              )}

              {selectedService === 'power-wash' && (
                <div className="space-y-5 mb-6 pt-6 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Surfaces to Clean</label>
                    <div className="space-y-2">
                      {['Driveway', 'Walkway', 'Patio/Deck', 'Home Exterior', 'Garage Floor', 'Fence'].map(surface => (
                        <label key={surface} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.surfaces.includes(surface)}
                            onChange={() => handleCheckboxChange(surface)}
                            className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                          />
                          <span className="text-sm text-gray-700">{surface}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Photo Upload (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-brand-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="photoUpload"
                      />
                      <label htmlFor="photoUpload" className="text-sm text-gray-600 cursor-pointer">
                        {formData.photoUpload ? formData.photoUpload.name : 'Click to upload photos'}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'windows' && (
                <div className="space-y-5 mb-6 pt-6 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Approximate Window Count</label>
                    <input
                      type="number"
                      name="windowCount"
                      value={formData.windowCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., 15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service Type</label>
                    <select
                      name="interiorExterior"
                      value={formData.interiorExterior}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="exterior">Exterior Only ($120)</option>
                      <option value="both">Interior + Exterior ($200)</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedService === 'handyman' && (
                <div className="space-y-5 mb-6 pt-6 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Work Description *</label>
                    <textarea
                      name="workDescription"
                      value={formData.workDescription}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Describe what needs to be done. Be as detailed as possible. Include any specific materials or tools needed."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Priority Level</label>
                    <select
                      name="priorityLevel"
                      value={formData.priorityLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="normal">Normal (within 5–7 days)</option>
                      <option value="priority">Priority (within 2–3 days, +$50)</option>
                      <option value="emergency">Emergency (same-day/next-day, +$200)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Photo Upload (Recommended)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-brand-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="photoUploadHandyman"
                      />
                      <label htmlFor="photoUploadHandyman" className="text-sm text-gray-600 cursor-pointer">
                        {formData.photoUpload ? formData.photoUpload.name : 'Click to upload photos'}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-lg min-h-[56px]"
              >
                Submit Booking Request
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                We\'ll review your request and contact you within 24 hours to confirm scheduling and pricing.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

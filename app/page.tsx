'use client';

import { useState } from 'react';
import { ChevronDown, Phone, Mail, MapPin, Clock, CheckCircle, Menu, X, Star, Heart, Shield } from 'lucide-react';
type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredTime: string;
  agreeContact: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredTime: '',
    agreeContact: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please tell us what brings you here';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Please provide more details (at least 10 characters)';
    }

    if (!formData.preferredTime.trim()) {
      errors.preferredTime = 'Preferred contact time is required';
    }

    if (!formData.agreeContact) {
      errors.agreeContact = 'You must agree to be contacted to proceed';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (validateForm()) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 2000); // Simulate async submission
  }
};
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  if (formErrors[field]) {
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  }
};

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  setMobileMenuOpen(false);
};


  const services = [
    {
      title: "Anxiety & Stress Management",
      description: "Learn practical tools to manage anxiety, overwhelm, and everyday stress through evidence-based therapy approaches.",
      fee: "$200 / individual session",
      image: "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: <Heart className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Relationship Counseling", 
      description: "Navigate communication issues, emotional distance, or conflict patterns and build stronger, more fulfilling connections.",
      fee: "$240 / couples session",
      image: "https://images.pexels.com/photos/1024859/pexels-photo-1024859.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: <Star className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Trauma Recovery",
      description: "Heal from past traumatic experiences in a safe, supportive environment with specialized trauma-informed care.",
      fee: "$200 / individual session", 
      image: "https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    }
  ];

  const faqs = [
    {
      question: "Do you accept insurance?",
      answer: "I don't directly accept insurance, but I provide a detailed superbill that you can submit to your insurance provider for potential reimbursement. Many clients receive partial or full reimbursement depending on their out-of-network benefits."
    },
    {
      question: "Are online sessions available?",
      answer: "Yes, I offer secure virtual sessions via Zoom for clients throughout California. Online therapy has been shown to be just as effective as in-person sessions and provides greater flexibility for busy schedules."
    },
    {
      question: "What is your cancellation policy?",
      answer: "I require a minimum of 24-hour notice to cancel or reschedule appointments. Late cancellations or no-shows will be charged the full session fee, as this time cannot be offered to other clients."
    },
    {
      question: "How long are therapy sessions?",
      answer: "Individual therapy sessions are 50 minutes, and couples sessions are 80 minutes. This allows adequate time to explore issues deeply while maintaining a structured therapeutic framework."
    },
    {
      question: "How often should I attend therapy?",
      answer: "Most clients benefit from weekly sessions initially. As progress is made, we may adjust to bi-weekly or monthly sessions. The frequency depends on your specific needs, goals, and circumstances."
    }
  ];

  const testimonials = [
    {
      text: "Dr. Blake helped me develop tools to manage my anxiety that I use every day. Her approach is both professional and deeply caring.",
      author: "Sarah M.",
      role: "Individual Therapy Client"
    },
    {
      text: "Working with Dr. Blake transformed our relationship. We learned to communicate in ways we never thought possible.",
      author: "Mike & Jennifer",
      role: "Couples Therapy Clients"
    },
    {
      text: "The safe space Dr. Blake created allowed me to process trauma I'd carried for years. I'm finally free.",
      author: "David L.",
      role: "Trauma Recovery Client"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-800">
              Dr. Serena Blake, <span className="text-blue-600">PsyD</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('hero')} className="nav-link">Home</button>
              <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
              <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="nav-link">Testimonials</button>
              <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3 pt-4">
                <button onClick={() => scrollToSection('hero')} className="nav-link text-left">Home</button>
                <button onClick={() => scrollToSection('about')} className="nav-link text-left">About</button>
                <button onClick={() => scrollToSection('services')} className="nav-link text-left">Services</button>
                <button onClick={() => scrollToSection('testimonials')} className="nav-link text-left">Testimonials</button>
                <button onClick={() => scrollToSection('faq')} className="nav-link text-left">FAQ</button>
                <button onClick={() => scrollToSection('contact')} className="nav-link text-left">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Pastel Yellow Textured Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"></div>
        
        {/* Concrete Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        ></div>
        
        {/* Subtle Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-yellow-100/30"></div>
        
        {/* Additional Texture Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='0.8'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3Ccircle cx='45' cy='45' r='1'/%3E%3Ccircle cx='15' cy='45' r='0.5'/%3E%3Ccircle cx='45' cy='15' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        ></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
              Feel Calmer, More Connected, and <span className="text-blue-600 font-normal">Empowered</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 font-light max-w-4xl mx-auto leading-relaxed">
              Professional therapy support from Dr. Serena Blake, PsyD — helping you navigate life's challenges with evidence-based care and compassionate guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[240px]"
              >
                Book a Free Consult
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-400 text-gray-700 rounded-full hover:border-gray-500 hover:bg-white/50 transition-all duration-300 font-medium text-lg min-w-[240px] backdrop-blur-sm"
              >
                Learn More About Dr. Blake
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-heading-2 text-gray-800 mb-8">About Dr. Serena Blake</h2>
              <div className="text-gray-600 space-y-6 text-body">
                <p>
                  Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA, with eight years of experience and over 500 client sessions. She blends evidence-based approaches—like cognitive-behavioral therapy and mindfulness—with compassionate, personalized care to help you overcome anxiety, strengthen relationships, and heal from trauma.
                </p>
                <p>
                  Whether you meet in her Maplewood Drive office or connect virtually via Zoom, Dr. Blake is committed to creating a safe, supportive space where you can explore your thoughts and feelings without judgment, develop practical coping strategies, and work toward lasting positive change.
                </p>
                <p>
                  Her approach combines clinical expertise with genuine warmth, ensuring that each session feels both professionally guided and personally meaningful.
                </p>
              </div>
              
              <div className="mt-10 space-y-4">
                <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <MapPin className="w-5 h-5 mr-4 text-blue-600 flex-shrink-0" />
                  <span>1287 Maplewood Drive, Los Angeles, CA 90026</span>
                </div>
                <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Phone className="w-5 h-5 mr-4 text-blue-600 flex-shrink-0" />
                  <span>(323) 555-0192</span>
                </div>
                <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Mail className="w-5 h-5 mr-4 text-blue-600 flex-shrink-0" />
                  <span>serena@blakepsychology.com</span>
                </div>
              </div>

              <div className="mt-10 p-6 bg-blue-50 rounded-2xl">
                <h3 className="text-heading-3 text-gray-800 mb-4">Office Hours</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium">In-person Sessions</div>
                      <div className="text-sm">Tuesday & Thursday, 10 AM–6 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Virtual Sessions (Zoom)</div>
                      <div className="text-sm">Monday, Wednesday & Friday, 1 PM–5 PM</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200 text-sm text-gray-500">
                  <strong>Experience:</strong> 8 years of practice • 500+ successful sessions
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
    
                  src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Dr. Serena Blake, Licensed Clinical Psychologist"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Sessions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 text-gray-800 mb-6">Therapy Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive, evidence-based therapy services tailored to your unique needs and goals, delivered with compassion and expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card group">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-heading-3 text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-blue-600 font-semibold text-lg">{service.fee}</div>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 text-gray-800 mb-6">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from clients who have found healing and growth through therapy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 text-gray-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about therapy and my practice</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="faq-button"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 text-gray-800 mb-6">Get In Touch</h2>
            <p className="text-gray-600 leading-relaxed">
              Simply fill out the brief fields below and Dr. Blake will be in touch with you soon, usually within one business day. This form is safe, private, and completely free.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
            {formSubmitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Thank You!</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Your message has been received. Dr. Blake will get back to you within one business day to schedule your free consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Your full name"
                  />
                  {formErrors.name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="your@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="(555) 234-5678"
                  />
                  {formErrors.phone && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    What brings you here? *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                      formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="How can I help you?"
                  />
                  {formErrors.message && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Preferred Contact Time */}
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Time *
                  </label>
                  <input
                    type="text"
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.preferredTime ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="e.g., Mornings, Afternoons, Evenings, Weekends"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Let us know when you're typically available for a call or consultation
                  </p>
                  {formErrors.preferredTime && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {formErrors.preferredTime}
                    </p>
                  )}
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeContact"
                    checked={formData.agreeContact}
                    onChange={(e) => handleInputChange('agreeContact', e.target.checked)}
                    className={`mt-1 w-4 h-4 text-blue-600 border-2 rounded focus:ring-blue-500 ${
                      formErrors.agreeContact ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <label htmlFor="agreeContact" className="text-sm text-gray-600 leading-relaxed">
                    I agree to be contacted by Dr. Serena Blake regarding my inquiry and understand that this form is secure and confidential *
                  </label>
                </div>
                {formErrors.agreeContact && (
                  <p className="text-red-600 text-sm flex items-center">
                    <span className="mr-1">⚠</span>
                    {formErrors.agreeContact}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-700 text-white hover:bg-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>

                {/* Privacy Notice */}
                <p className="text-center text-sm text-gray-500 leading-relaxed">
                  <span className="inline-flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    By clicking submit you consent to receive texts and emails from Dr. Serena Blake
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-max">
          <div className="text-center">
            <h3 className="text-3xl font-light mb-4">Dr. Serena Blake, <span className="text-blue-400">PsyD</span></h3>
            <p className="text-gray-400 mb-8 text-lg">Licensed Clinical Psychologist</p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <MapPin className="w-6 h-6 text-blue-400 mb-2" />
                <div className="text-gray-300">1287 Maplewood Drive</div>
                <div className="text-gray-300">Los Angeles, CA 90026</div>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="w-6 h-6 text-blue-400 mb-2" />
                <div className="text-gray-300">(323) 555-0192</div>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-6 h-6 text-blue-400 mb-2" />
                <div className="text-gray-300">serena@blakepsychology.com</div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-800 text-sm text-gray-500">
              <p>© 2025 Dr. Serena Blake, PsyD. All rights reserved.</p>
              <p className="mt-2">Licensed in California • PSY 12345</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

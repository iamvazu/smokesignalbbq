import React from 'react';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';


export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative bg-charcoal text-white pt-16 pb-8 border-t border-white/5 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/footer_bg.jpg"
          alt="BBQ Background_footer"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10 mb-16">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/10 flex flex-col lg:flex-row items-center gap-8 shadow-2xl">
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-fire mb-2">
              <span className="w-2 h-2 rounded-full bg-fire animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Smoked Intel</span>
            </div>
            <h3 className="text-3xl font-display text-cream italic mb-2 tracking-wide">BBQ Tips & Secrets</h3>
            <p className="text-gray-400 text-sm font-medium">Join 500+ pitmasters getting weekly smokehouse wisdom.</p>
          </div>

          <div className="w-full lg:w-auto min-w-[300px] sm:min-w-[400px]">
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';
                try {
                  const btn = form.querySelector('button');
                  if (btn) btn.disabled = true;
                  await (await import('axios')).default.post(`${API_URL}/newsletter/subscribe`, { email, source: 'footer' });
                  alert('Success! BBQ intel is on the way.');
                  form.reset();
                } catch (err) {
                  console.error(err);
                  alert('Failed to subscribe. Please try again.');
                } finally {
                  const btn = form.querySelector('button');
                  if (btn) btn.disabled = false;
                }
              }}
            >
              <input
                name="email"
                type="email"
                required
                placeholder="Entry tactical email..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-fire transition-all placeholder:text-gray-600"
              />
              <button
                type="submit"
                className="bg-fire text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-fire-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-fire/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-start">

          {/* Brand - Left */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <img
              src="/logo_final.png"
              alt="Smoke Signal BBQ"
              className="h-40 md:h-48 w-auto object-contain transition-transform hover:scale-105 duration-300 drop-shadow-2xl"
            />
            <p className="text-gray-400 font-body text-xs leading-relaxed max-w-xs text-center lg:text-left font-medium">
              Bangalore's Original American BBQ Truck. Serving authentic smoked meats and handmade sauces since 2011.
            </p>

            <Link to="/franchise" className="text-fire hover:text-white transition-colors text-lg font-display italic mt-2">
              Franchise Opportunity
            </Link>

            <div className="flex flex-col items-center lg:items-start gap-3 mt-2">
              {/* FSSAI Badge */}
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 group hover:border-fire/30 transition-all duration-300">
                <img
                  src="/fssai.png"
                  alt="FSSAI Licensed"
                  className="h-5 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/FSSAI_logo.svg/330px-FSSAI_logo.svg.png";
                  }}
                />
                <div className="h-4 w-px bg-white/10 mx-1" />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-body">
                  Lic. No <span className="text-cream">21224191000177</span>
                </p>
              </div>

              {/* Quality Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                  <p className="text-[8px] text-gray-500 font-extrabold uppercase tracking-[0.2em] font-body flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Antibiotic-Free
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                  <p className="text-[8px] text-gray-500 font-extrabold uppercase tracking-[0.2em] font-body flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-fire" />
                    Halal Certified
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Explore - Center */}
          <div className="flex flex-col items-center lg:items-start space-y-4 lg:pt-8">
            <h4 className="font-display text-xl text-fire tracking-wide">Explore</h4>
            <ul className="space-y-2 text-center lg:text-left">
              <li><Link to="/" className="text-cream hover:text-fire transition-colors text-sm font-medium">Home</Link></li>
              <li><Link to="/shop" className="text-cream hover:text-fire transition-colors text-sm font-medium">Shop</Link></li>
              <li><Link to="/events" className="text-cream hover:text-fire transition-colors text-sm font-medium">Events</Link></li>
              <li><Link to="/blog" className="text-cream hover:text-fire transition-colors text-sm font-medium">Blog</Link></li>
              <li><Link to="/#how-it-works" className="text-cream hover:text-fire transition-colors text-sm font-medium">How It Works</Link></li>
              <li><Link to="/#about" className="text-cream hover:text-fire transition-colors text-sm font-medium">About</Link></li>
              <li><Link to="/#contact" className="text-cream hover:text-fire transition-colors text-sm font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Contact & Hours - Right */}
          <div className="flex flex-col items-center lg:items-start space-y-6 lg:pt-8">
            <div className="text-center lg:text-left space-y-1">
              <h4 className="font-display text-xl text-fire tracking-wide">Opening Hours</h4>
              <p className="text-cream text-sm font-medium">Mon - Sun: 9:00 AM - 11:00 PM</p>
            </div>

            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all duration-300 group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href={`https://wa.me/91${CONTACT_INFO.phone}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 group">
                <Phone size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-start gap-3 text-gray-400 justify-center lg:justify-start text-xs">
                <MapPin className="text-fire mt-0.5 shrink-0" size={16} />
                <p className="leading-relaxed">{CONTACT_INFO.location}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400 justify-center lg:justify-start text-xs">
                <Phone className="text-fire shrink-0" size={16} />
                <p>+91 78998-70957</p>
              </div>
            </div>
          </div>

          {/* Delivery Areas */}
          <div className="flex flex-col items-center lg:items-start space-y-4 lg:pt-8">
            <h4 className="font-display text-xl text-fire tracking-wide">Delivery Areas</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <Link to="/services/catering-in-indiranagar" className="text-gray-400 hover:text-fire transition-colors text-[10px] font-bold uppercase tracking-widest">Indiranagar</Link>
              <Link to="/services/delivery-in-koramangala" className="text-gray-400 hover:text-fire transition-colors text-[10px] font-bold uppercase tracking-widest">Koramangala</Link>
              <Link to="/services/brisket-in-hsr-layout" className="text-gray-400 hover:text-fire transition-colors text-[10px] font-bold uppercase tracking-widest">HSR Layout</Link>
              <Link to="/services/ribs-in-whitefield" className="text-gray-400 hover:text-fire transition-colors text-[10px] font-bold uppercase tracking-widest">Whitefield</Link>
              <Link to="/services/catering-in-kammanahalli" className="text-gray-400 hover:text-fire transition-colors text-[10px] font-bold uppercase tracking-widest">Kammanahalli</Link>
              <Link to="/services/delivery-in-mg-road" className="text-gray-400 hover:text-fire transition-colors text-[10px] font-bold uppercase tracking-widest">MG Road</Link>
            </div>
            <p className="text-[9px] text-gray-500 italic mt-2">Serving 15+ areas in Bangalore.</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-gray-500 text-xs mb-4">
            &copy; {new Date().getFullYear()} Smoke Signal BBQ. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/terms" className="text-gray-600 hover:text-fire transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">Terms & Conditions</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-fire transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
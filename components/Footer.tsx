import React from 'react';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';


export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative bg-charcoal text-white pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/footer_bg.jpg"
          alt="BBQ Background_footer"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/50" />

      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 items-start">

          {/* Brand - Left */}
          <div className="flex flex-col items-center space-y-6">
            <img
              src="/logo_final.png"
              alt="Smoke Signal BBQ"
              className="h-64 md:h-72 w-auto object-contain transition-transform hover:scale-105 duration-300 drop-shadow-2xl"
            />
            <p className="text-gray-300 font-body text-sm leading-relaxed max-w-xs text-center font-medium">
              Bangalore's Original American BBQ Truck. Serving authentic smoked meats and handmade sauces since 2011.
            </p>
            <div className="flex flex-col items-center gap-3 mt-4">
              {/* FSSAI Badge */}
              <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 group hover:border-fire/30 transition-all duration-300">
                <img
                  src="/fssai.png"
                  alt="FSSAI Licensed"
                  className="h-6 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/FSSAI_logo.svg/330px-FSSAI_logo.svg.png";
                  }}
                />
                <div className="h-6 w-px bg-white/10 mx-1" />
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] font-body">
                  Lic. No <span className="text-cream">21224191000177</span>
                </p>
              </div>

              {/* Quality Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all duration-300">
                  <p className="text-[9px] text-gray-500 font-extrabold uppercase tracking-[0.2em] font-body flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    100% Antibiotic-Free
                  </p>
                </div>
                <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-fire/30 transition-all duration-300">
                  <p className="text-[9px] text-gray-500 font-extrabold uppercase tracking-[0.2em] font-body flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fire" />
                    Halal Certified
                  </p>
                </div>
              </div>
            </div>



          </div>

          {/* Explore - Center */}
          <div className="flex flex-col items-center md:items-start space-y-6 md:pt-8">
            <h4 className="font-display text-2xl text-fire tracking-wide">Explore</h4>
            <ul className="space-y-4 text-center md:text-left">
              <li><Link to="/" className="text-cream hover:text-fire transition-colors text-lg font-medium">Home</Link></li>
              <li><Link to="/shop" className="text-cream hover:text-fire transition-colors text-lg font-medium">Shop</Link></li>
              <li><Link to="/events" className="text-cream hover:text-fire transition-colors text-lg font-medium">Events</Link></li>
              <li><Link to="/blog" className="text-cream hover:text-fire transition-colors text-lg font-medium">Blog</Link></li>
              <li><Link to="/#how-it-works" className="text-cream hover:text-fire transition-colors text-lg font-medium">How It Works</Link></li>

              <li><Link to="/#about" className="text-cream hover:text-fire transition-colors text-lg font-medium">About</Link></li>
              <li><Link to="/#contact" className="text-cream hover:text-fire transition-colors text-lg font-medium">Contact</Link></li>
              <li className="pt-4 border-t border-white/5 opacity-50"><Link to="/terms" className="text-cream hover:text-fire transition-colors text-xs font-bold uppercase tracking-widest">Terms & Conditions</Link></li>
              <li className="opacity-50"><Link to="/privacy" className="text-cream hover:text-fire transition-colors text-xs font-bold uppercase tracking-widest">Privacy Policy</Link></li>
              <li><Link to="/franchise" className="text-fire hover:text-white transition-colors text-lg font-display italic">Franchise Opportunity</Link></li>
            </ul>

          </div>

          {/* Contact & Hours - Right */}
          <div className="flex flex-col items-center md:items-start space-y-8 md:pt-8">

            {/* Hours */}
            <div className="text-center md:text-left space-y-2">
              <h4 className="font-display text-2xl text-fire tracking-wide">Opening Hours</h4>
              <p className="text-cream text-lg font-medium">Mon - Sun: 9:00 AM - 11:00 PM</p>
              <p className="text-gray-500 text-sm italic">Open all week for your cravings.</p>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all duration-300 group">
                <Instagram size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group">
                <Facebook size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={`https://wa.me/91${CONTACT_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 group"
              >
                <Phone size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Location Info */}
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-start gap-3 text-gray-400 justify-center md:justify-start">
                <MapPin className="text-fire mt-1 shrink-0" size={20} />
                <p className="leading-relaxed">{CONTACT_INFO.location}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400 justify-center md:justify-start">
                <Phone className="text-fire shrink-0" size={20} />
                <p>+91 78998-70957</p>
              </div>

            </div>
          </div>

          {/* Top Delivery Locations (pSEO Hub) */}
          <div className="flex flex-col items-center md:items-start space-y-6 md:pt-8">
            <h4 className="font-display text-2xl text-fire tracking-wide">Delivery Areas</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <Link to="/services/catering-in-indiranagar" className="text-gray-400 hover:text-fire transition-colors text-xs font-bold uppercase tracking-widest">Catering Indiranagar</Link>
              <Link to="/services/delivery-in-koramangala" className="text-gray-400 hover:text-fire transition-colors text-xs font-bold uppercase tracking-widest">Delivery Koramangala</Link>
              <Link to="/services/brisket-in-hsr-layout" className="text-gray-400 hover:text-fire transition-colors text-xs font-bold uppercase tracking-widest">Brisket HSR Layout</Link>
              <Link to="/services/ribs-in-whitefield" className="text-gray-400 hover:text-fire transition-colors text-xs font-bold uppercase tracking-widest">Ribs Whitefield</Link>
              <Link to="/services/catering-in-kammanahalli" className="text-gray-400 hover:text-fire transition-colors text-xs font-bold uppercase tracking-widest">Catering Kammanahalli</Link>
              <Link to="/services/delivery-in-mg-road" className="text-gray-400 hover:text-fire transition-colors text-xs font-bold uppercase tracking-widest">Delivery MG Road</Link>
            </div>
            <p className="text-[10px] text-gray-500 italic mt-4">Serving across 15+ major areas in Bangalore.</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Smoke Signal BBQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
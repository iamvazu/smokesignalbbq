import React from 'react';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-burnt text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-16 items-start">

          {/* Brand - Left */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <img
              src="/logo_final.png"
              alt="Smoke Signal BBQ"
              className="h-48 md:h-56 w-auto object-contain transition-transform hover:scale-105 duration-300"
            />
            <p className="text-gray-400 font-body text-sm leading-relaxed max-w-xs text-center md:text-left">
              Bangalore's Original American BBQ Truck. Serving authentic smoked meats and handmade sauces since 2011.
            </p>
          </div>

          {/* Explore - Center */}
          <div className="flex flex-col items-center md:items-start space-y-6 md:pt-8">
            <h4 className="font-display text-2xl text-fire tracking-wide">Explore</h4>
            <ul className="space-y-4 text-center md:text-left">
              <li><a href="#" className="text-cream hover:text-fire transition-colors text-lg font-medium">Home</a></li>
              <li><a href="#menu" className="text-cream hover:text-fire transition-colors text-lg font-medium">Our Menu</a></li>
              <li><a href="#sauces" className="text-cream hover:text-fire transition-colors text-lg font-medium">Sauces</a></li>
              <li><a href="#story" className="text-cream hover:text-fire transition-colors text-lg font-medium">Our Story</a></li>
              <li><a href="#contact" className="text-cream hover:text-fire transition-colors text-lg font-medium">Contact</a></li>
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
                <p>+91 {CONTACT_INFO.phone}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Smoke Signal BBQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
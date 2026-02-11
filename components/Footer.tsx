import React from 'react';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-burnt text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center">
            <img
              src="/logo.jpg"
              alt="Smoke Signal BBQ"
              className="h-32 w-auto object-contain mb-2 mix-blend-screen invert grayscale contrast-200 brightness-200"
            />
            <p className="text-gray-400 font-body text-sm leading-relaxed max-w-xs">
              Bangalore's Original American BBQ Truck. Serving authentic smoked meats and handmade sauces since 2011.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-xl text-cream">Visit Us</h4>
            <div className="flex items-start gap-3 text-gray-400">
              <MapPin className="text-fire mt-1 shrink-0" size={18} />
              <p>{CONTACT_INFO.location}</p>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone className="text-fire shrink-0" size={18} />
              <p>+91 {CONTACT_INFO.phone}</p>
            </div>
          </div>

          {/* Hours/Social */}
          <div className="space-y-4">
            <h4 className="font-display text-xl text-cream">Opening Hours</h4>
            <p className="text-gray-400">Fri - Sun: 6:00 PM - 10:30 PM</p>
            <p className="text-gray-500 text-sm italic">Orders via WhatsApp open all week.</p>

            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center hover:bg-fire hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center hover:bg-fire hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
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
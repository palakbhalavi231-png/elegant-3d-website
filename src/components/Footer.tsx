import { useState, type FormEvent } from 'react';
import { Instagram, Facebook, Youtube, Check } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenIngredients: () => void;
}

export default function Footer({ onOpenAbout, onOpenIngredients }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#0f0d0d] text-[#e8deda] border-t border-[#2d2220] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <h2 className="font-serif text-4xl sm:text-5xl tracking-[0.2em] text-[#fbf6f4] uppercase font-normal">
            LUMORA
          </h2>
          <p className="text-xs sm:text-sm text-[#bdaaa4] tracking-widest uppercase font-light">
            Natural beauty. Lasting confidence.
          </p>

          {/* Social Icons matching screenshot */}
          <div className="flex items-center space-x-6 pt-4 text-[#caa79f]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5 stroke-[1.5]" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5 stroke-[1.5]" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="p-2 hover:text-white transition-colors"
            >
              {/* Custom Pinterest SVG */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.372-.053.224-.174.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.538.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 hover:text-white transition-colors"
            >
              <Youtube className="w-5 h-5 stroke-[1.5]" />
            </a>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="max-w-md mx-auto text-center space-y-3 pt-2">
          <span className="text-xs tracking-widest text-[#d89f91] uppercase font-medium">
            Receive The Lumora Gazette
          </span>
          <p className="text-xs text-[#a38c86]">
            Enjoy 15% off your inaugural ritual and early access to seasonal botanical harvests.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-[#1a1413] border border-[#3e2c2a] rounded-full px-4 py-2.5 text-xs text-white placeholder-[#7d6863] focus:outline-hidden focus:border-[#e8baa9]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#e8baa9] hover:bg-white text-[#1a1211] font-semibold text-xs transition flex items-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed</span>
                </>
              ) : (
                <span>Join</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Navigation Links matching screenshot */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-xs tracking-widest uppercase text-[#baa49e] pt-6 border-t border-[#2b201e]">
          <button
            onClick={() => scrollTo('collection')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Shop
          </button>
          <button
            onClick={onOpenAbout}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={onOpenIngredients}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Ingredients
          </button>
          <a
            href="mailto:concierge@lumoracosmetics.com"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-[#715c57] font-light">
          © {new Date().getFullYear()} Lumora. All rights reserved. Handcrafted formulations.
        </div>
      </div>
    </footer>
  );
}

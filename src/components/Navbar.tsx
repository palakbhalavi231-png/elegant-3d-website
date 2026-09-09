import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAbout: () => void;
  onOpenIngredients: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAbout,
  onOpenIngredients,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#121010]/90 backdrop-blur-md border-b border-[#302624]/60 py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-logo"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2"
        >
          <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.22em] text-[#fbf6f4] uppercase group-hover:text-[#e6b8a8] transition-colors">
            LUMORA
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-9 text-xs tracking-[0.14em] uppercase text-[#e2d0cc]">
          <button
            id="nav-link-home"
            onClick={() => scrollToSection('hero')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            id="nav-link-about"
            onClick={onOpenAbout}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            id="nav-link-products"
            onClick={() => scrollToSection('collection')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Products
          </button>
          <button
            id="nav-link-ingredients"
            onClick={() => scrollToSection('nature')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Ingredients
          </button>
          <button
            id="nav-link-contact"
            onClick={() => scrollToSection('footer')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right utility icons */}
        <div className="flex items-center space-x-5 text-[#f4ece9]">
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            aria-label="Search collection"
            className="p-1.5 hover:text-[#e6b8a8] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-1.5 hover:text-[#e6b8a8] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span
              id="nav-cart-count-badge"
              className="absolute -top-1 -right-1 text-[10px] font-sans font-semibold bg-[#e6b8a8] text-[#1c1413] w-4 h-4 rounded-full flex items-center justify-center leading-none"
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 hover:text-[#e6b8a8] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-[#161312] border-b border-[#362927] px-6 py-6 space-y-4 text-sm tracking-wider uppercase text-[#d6c4c0]"
        >
          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="block w-full text-left py-2 hover:text-white"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('collection')}
            className="block w-full text-left py-2 hover:text-white"
          >
            Products
          </button>
          <button
            onClick={() => scrollToSection('nature')}
            className="block w-full text-left py-2 hover:text-white"
          >
            Ingredients
          </button>
          <button
            onClick={() => scrollToSection('footer')}
            className="block w-full text-left py-2 hover:text-white"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}

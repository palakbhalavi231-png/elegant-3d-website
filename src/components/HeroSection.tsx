import { useState, useRef, type MouseEvent } from 'react';
import { Product } from '../types';
import PetalParticlesCanvas from './PetalParticlesCanvas';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  products: Product[];
  onOpen3DViewer: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExploreClick: () => void;
}

export default function HeroSection({
  products,
  onOpen3DViewer,
  onAddToCart,
  onExploreClick,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProduct = products[currentIndex] || products[0];

  // 3D tilt state
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 12;

    setTilt({
      x: tiltX,
      y: tiltY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen bg-[#151212] text-[#fbf6f4] pt-24 pb-16 overflow-hidden flex items-center"
    >
      {/* Three.js interactive 3D floating cherry blossom petals */}
      <PetalParticlesCanvas intensity="high" interactive={true} />

      {/* Atmospheric background glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-[#d89f91]/12 blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[360px] h-[360px] rounded-full bg-[#b87668]/10 blur-[100px]" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <span
                id="hero-eyebrow"
                className="text-xs sm:text-sm tracking-[0.25em] text-[#d8a396] uppercase font-medium block"
              >
                NATURAL BEAUTY
              </span>
              <h1
                id="hero-heading"
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.08]"
              >
                Discover
                <br />
                Your Glow
              </h1>
            </motion.div>

            <motion.p
              id="hero-subtext"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[#d8c3be] text-base sm:text-lg max-w-md font-light leading-relaxed"
            >
              Luminous lip glaze and botanical skincare crafted with nature’s finest bio-actives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="hero-shop-now-btn"
                onClick={onExploreClick}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e8baa9] to-[#d69989] text-[#1c1312] text-sm font-semibold tracking-wide shadow-xl shadow-[#e8baa9]/15 hover:shadow-[#e8baa9]/30 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-inspect-3d-btn"
                onClick={() => onOpen3DViewer(activeProduct)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs tracking-wider uppercase text-[#f2ddd7] backdrop-blur-sm transition cursor-pointer"
              >
                <Box className="w-4 h-4 text-[#e8baa9]" />
                <span>Inspect 3D</span>
              </button>
            </motion.div>

            {/* Bottom scroll pill */}
            <div className="hidden sm:flex items-center gap-3 pt-8 text-xs text-[#aa918b] tracking-wider uppercase">
              <div className="w-5 h-8 rounded-full border border-[#745e59] flex items-start justify-center p-1">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="w-1 h-2 rounded-full bg-[#e8baa9]"
                />
              </div>
              <span>Scroll to explore</span>
            </div>
          </div>

          {/* Right Column: 3D Product Showcase with Tilt, Glow, and Petals */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Slide counter indicator: 01 / 04 matching screenshot */}
            <div className="absolute top-0 right-0 sm:right-4 z-30 flex items-center gap-3 text-xs tracking-widest text-[#d8a396]">
              <span className="font-serif text-base font-semibold text-white">
                0{currentIndex + 1}
              </span>
              <span className="text-[#8e746e]">/</span>
              <span className="text-[#a0857f]">0{products.length}</span>
              <div className="h-10 w-[1px] bg-[#473734] ml-2" />
            </div>

            {/* 3D Interactive Card Container */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: '1200px',
              }}
              className="relative w-full max-w-[580px] aspect-[4/3] flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-150 ease-out flex items-center justify-center"
                >
                  {/* Product Image */}
                  <img
                    id="hero-product-image"
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center select-none"
                  />

                  {/* 3D dynamic specular sheen overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay transition-opacity"
                    style={{
                      background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.7) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Floating quick 3D badge */}
                  <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                    <button
                      id="hero-3d-quick-btn"
                      onClick={() => onOpen3DViewer(activeProduct)}
                      className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white flex items-center gap-1.5 hover:bg-black/80 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#e8baa9]" />
                      <span>{activeProduct.name}</span>
                    </button>

                    <button
                      id="hero-quick-add-btn"
                      onClick={() => onAddToCart(activeProduct)}
                      className="px-3 py-2 rounded-full bg-[#e8baa9] text-[#1c1312] text-xs font-semibold hover:bg-white transition"
                    >
                      Add ${activeProduct.price}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation Arrows */}
              <div className="absolute -bottom-6 sm:bottom-2 right-4 flex items-center gap-2 z-30">
                <button
                  id="hero-prev-btn"
                  onClick={prevSlide}
                  aria-label="Previous product"
                  className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white backdrop-blur-sm transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="hero-next-btn"
                  onClick={nextSlide}
                  aria-label="Next product"
                  className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white backdrop-blur-sm transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicator bar under product matching image */}
        <div className="mt-8 pt-4 border-t border-[#362a28]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Select ${p.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-10 bg-[#e8baa9]'
                    : 'w-2.5 bg-[#473734] hover:bg-[#6e5853]'
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-[#a0857f] tracking-wider uppercase font-light">
            Crafted in Grasse, France • 100% Botanical Bio-Actives
          </div>
        </div>
      </div>
    </section>
  );
}

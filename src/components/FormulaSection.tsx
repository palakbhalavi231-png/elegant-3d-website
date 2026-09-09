import { useState, useRef, type MouseEvent } from 'react';
import { Product } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Feather, Box } from 'lucide-react';
import { motion } from 'motion/react';

interface FormulaSectionProps {
  creamProduct: Product;
  onOpen3DViewer: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenTransparencyModal: () => void;
}

export default function FormulaSection({
  creamProduct,
  onOpen3DViewer,
  onAddToCart,
  onOpenTransparencyModal,
}: FormulaSectionProps) {
  // 3D tilt for the cream container
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="formula"
      className="relative bg-[#f8f4ef] text-[#1c1615] py-20 lg:py-28 overflow-hidden transition-colors"
    >
      {/* Soft warm ambient lighting background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] rounded-full bg-[#fae8dc]/60 blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-[480px] h-[480px] rounded-full bg-[#f3ded2]/50 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: The Formula Copy */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-3">
              <span
                id="formula-tag"
                className="text-xs sm:text-sm tracking-[0.25em] text-[#9b6659] uppercase font-semibold block"
              >
                THE FORMULA
              </span>
              <h2
                id="formula-heading"
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1a1312] tracking-tight leading-[1.12]"
              >
                Pure. Safe. Effective.
              </h2>
            </div>

            <p
              id="formula-desc"
              className="text-[#594844] text-base sm:text-lg leading-relaxed max-w-lg font-light"
            >
              Our products are made with clean, natural ingredients that nourish your
              skin and bring out your natural glow.
            </p>

            {/* Badges / Checkpoints matching reference layout */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 text-[#2b2220]">
                <div className="w-11 h-11 rounded-full bg-[#edd9ce]/70 border border-[#dbc0b4] flex items-center justify-center text-[#8e4f41] shrink-0 shadow-sm">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-base text-[#1c1514]">
                    100% Natural Ingredients
                  </h4>
                  <p className="text-xs text-[#715c57]">
                    Zero synthetic parabens, phthalates, artificial sulfates, or microplastics.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[#2b2220]">
                <div className="w-11 h-11 rounded-full bg-[#edd9ce]/70 border border-[#dbc0b4] flex items-center justify-center text-[#8e4f41] shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-base text-[#1c1514]">
                    Dermatologist Tested
                  </h4>
                  <p className="text-xs text-[#715c57]">
                    Rigorously evaluated for hypoallergenic biocompatibility on sensitive complexions.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[#2b2220]">
                <div className="w-11 h-11 rounded-full bg-[#edd9ce]/70 border border-[#dbc0b4] flex items-center justify-center text-[#8e4f41] shrink-0 shadow-sm">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-base text-[#1c1514]">
                    Cruelty Free
                  </h4>
                  <p className="text-xs text-[#715c57]">
                    Leaping Bunny certified, ethical sustainably farmed plant botanicals.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="formula-learn-more-btn"
                onClick={onOpenTransparencyModal}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#2b211f] text-[#201817] text-sm font-semibold tracking-wide hover:bg-[#201817] hover:text-white transition duration-200 cursor-pointer shadow-sm"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="formula-add-cream-btn"
                onClick={() => onAddToCart(creamProduct)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#e8baa9] text-[#1c1312] text-sm font-semibold hover:bg-[#dfa794] transition cursor-pointer shadow-sm"
              >
                <span>Add Cream — ${creamProduct.price}</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Cream Jar on Whipped Cream Swirl */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: '1200px' }}
              className="relative w-full max-w-[560px] aspect-[4/3] flex items-center justify-center"
            >
              <motion.div
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-[#ecd5cb]/80 bg-[#fbf6f3] transition-transform duration-150 ease-out flex items-center justify-center group"
              >
                {/* Radiant Cream visual matching the screenshot */}
                <img
                  id="formula-cream-image"
                  src={creamProduct.image}
                  alt={creamProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                />

                {/* Soft glow highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#201614]/30 via-transparent to-transparent pointer-events-none" />

                {/* Floating 3D Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-[#382b28] shadow-md flex items-center gap-1.5 border border-[#ecd5cb]">
                    <Sparkles className="w-3.5 h-3.5 text-[#a85848]" />
                    Whipped Velvet Texture
                  </span>

                  <button
                    id="formula-3d-btn"
                    onClick={() => onOpen3DViewer(creamProduct)}
                    className="bg-[#1c1514]/90 hover:bg-[#1c1514] text-[#f7e6e0] px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md flex items-center gap-1.5 transition"
                  >
                    <Box className="w-3.5 h-3.5 text-[#e8baa9]" />
                    Inspect 3D
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

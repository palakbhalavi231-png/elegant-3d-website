import { useState, useRef, type MouseEvent } from 'react';
import { Product, Ingredient } from '../types';
import { ArrowRight, Sparkles, Box, Shield, Droplets, Leaf, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NatureSectionProps {
  serumProduct: Product;
  ingredients: Ingredient[];
  onOpen3DViewer: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  onExploreAllIngredients: () => void;
}

export default function NatureSection({
  serumProduct,
  ingredients,
  onOpen3DViewer,
  onAddToCart,
  onSelectIngredient,
  onExploreAllIngredients,
}: NatureSectionProps) {
  const [activeHoverIngredient, setActiveHoverIngredient] = useState<Ingredient | null>(null);

  // 3D tilt for serum container
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

  const getIngredientIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'aloe vera':
        return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'green tea':
        return <Shield className="w-5 h-5 text-emerald-300" />;
      case 'vitamin c':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'jojoba oil':
        return <Droplets className="w-5 h-5 text-yellow-400" />;
      default:
        return <Leaf className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section
      id="nature"
      className="relative bg-[#0c1a14] text-[#f2ede4] py-20 lg:py-28 overflow-hidden"
    >
      {/* Botanical ambient dark emerald glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-900/20 blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#183a2c]/40 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3D Serum on Mossy Stone with Botanical Leaves */}
          <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
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
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-emerald-900/40 bg-[#091510] transition-transform duration-150 ease-out flex items-center justify-center group"
              >
                {/* Glow Serum Product Image */}
                <img
                  id="nature-serum-image"
                  src={serumProduct.image}
                  alt={serumProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                />

                {/* Dark natural vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating 3D Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="bg-emerald-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-200 shadow-md flex items-center gap-1.5 border border-emerald-700/50">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Cold-Pressed Elixir
                  </span>

                  <button
                    id="nature-3d-btn"
                    onClick={() => onOpen3DViewer(serumProduct)}
                    className="bg-black/75 hover:bg-black text-[#f3e6de] px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md flex items-center gap-1.5 transition border border-white/15"
                  >
                    <Box className="w-3.5 h-3.5 text-[#e8baa9]" />
                    Inspect 3D
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Nature's Ingredients Copy & 4 Circular Feature Badges */}
          <div className="lg:col-span-6 space-y-7 order-1 lg:order-2">
            <div className="space-y-3">
              <span
                id="nature-tag"
                className="text-xs sm:text-sm tracking-[0.25em] text-[#86caa4] uppercase font-semibold block"
              >
                NATURE'S INGREDIENTS
              </span>
              <h2
                id="nature-heading"
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.12]"
              >
                The Power of Nature
              </h2>
            </div>

            <p
              id="nature-desc"
              className="text-[#c1d9cb] text-base sm:text-lg leading-relaxed max-w-lg font-light"
            >
              Packed with botanical extracts, vitamins and antioxidants to give
              your skin the care it deserves.
            </p>

            {/* 4 Circular Ingredient Badges matching image */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 pt-2">
              {ingredients.map((ing) => (
                <button
                  key={ing.id}
                  id={`ingredient-card-${ing.id}`}
                  onClick={() => onSelectIngredient(ing)}
                  onMouseEnter={() => setActiveHoverIngredient(ing)}
                  onMouseLeave={() => setActiveHoverIngredient(null)}
                  className="group flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#11241c]/80 hover:bg-[#183328] border border-emerald-900/50 hover:border-emerald-600/60 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0a1711] border border-emerald-800/60 flex items-center justify-center mb-2.5 shadow-inner group-hover:scale-110 group-hover:border-emerald-400 transition-all">
                    {getIngredientIcon(ing.name)}
                  </div>
                  <span className="font-medium text-sm text-white group-hover:text-emerald-200">
                    {ing.name}
                  </span>
                  <span className="text-xs text-[#8ca89b] font-light mt-0.5">
                    {ing.action}
                  </span>
                </button>
              ))}
            </div>

            {/* Hover details box */}
            <div className="min-h-[50px]">
              <AnimatePresence mode="wait">
                {activeHoverIngredient ? (
                  <motion.div
                    key={activeHoverIngredient.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-xs text-emerald-100 flex items-center justify-between"
                  >
                    <span>
                      <strong>{activeHoverIngredient.name}</strong>: {activeHoverIngredient.description.slice(0, 105)}...
                    </span>
                    <span className="text-[11px] text-[#86caa4] underline ml-2 shrink-0">
                      Learn More
                    </span>
                  </motion.div>
                ) : (
                  <p className="text-xs text-[#809a8d] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-emerald-400" />
                    Click on any botanical active to inspect clinical purity & origins.
                  </p>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="nature-explore-btn"
                onClick={onExploreAllIngredients}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-emerald-700/80 text-emerald-100 text-sm font-semibold tracking-wide hover:bg-emerald-900/60 transition duration-200 cursor-pointer shadow-sm"
              >
                <span>Explore Ingredients</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="nature-add-serum-btn"
                onClick={() => onAddToCart(serumProduct)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#e8baa9] text-[#1c1312] text-sm font-semibold hover:bg-[#e2aa97] transition cursor-pointer shadow-sm"
              >
                <span>Add Serum — ${serumProduct.price}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

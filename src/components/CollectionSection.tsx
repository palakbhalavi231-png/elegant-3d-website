import { useState, useRef, type MouseEvent } from 'react';
import { Product } from '../types';
import { ArrowRight, Sparkles, Box, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface CollectionSectionProps {
  products: Product[];
  onOpen3DViewer: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function CollectionSection({
  products,
  onOpen3DViewer,
  onAddToCart,
}: CollectionSectionProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  // 3D tilt for trio container
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
      x: ((y - centerY) / centerY) * -6,
      y: ((x - centerX) / centerX) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const trioProduct = products.find((p) => p.category === 'bundle') || products[0];

  return (
    <section
      id="collection"
      className="relative bg-[#fceded] text-[#1c1413] py-20 lg:py-28 overflow-hidden"
    >
      {/* Soft warm pink ambient highlights */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#f8d7dc]/60 blur-[110px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#fae2e6]/70 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main "Shop the Look" banner matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column: Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span
                id="collection-tag"
                className="text-xs sm:text-sm tracking-[0.25em] text-[#9c5a61] uppercase font-semibold block"
              >
                OUR COLLECTION
              </span>
              <h2
                id="collection-heading"
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1a1112] tracking-tight leading-[1.12]"
              >
                Shop the Look
              </h2>
            </div>

            <p
              id="collection-desc"
              className="text-[#634b4e] text-base sm:text-lg leading-relaxed max-w-md font-light"
            >
              Find your perfect match from our exclusive collection of botanical skincare and luminous lip glazes.
            </p>

            <div className="pt-2">
              <button
                id="collection-view-all-btn"
                onClick={() => handleAdd(trioProduct)}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1c1314] text-white text-sm font-semibold tracking-wide hover:bg-[#382629] transition duration-200 cursor-pointer shadow-md"
              >
                <span>Add Ritual Trio — ${trioProduct.price}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Trio Product Visual */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: '1200px' }}
              className="relative w-full max-w-[620px] aspect-[16/9] flex items-center justify-center"
            >
              <motion.div
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-[#eed1d6] bg-[#faeaec] transition-transform duration-150 ease-out flex items-center justify-center group"
              >
                <img
                  id="collection-trio-image"
                  src={trioProduct.image}
                  alt="Lumora Collection Trio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating 3D Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-[#463133] shadow-md flex items-center gap-1.5 border border-[#edd2d6]">
                    <Sparkles className="w-3.5 h-3.5 text-[#9c5a61]" />
                    Complete 3-Piece Synergy
                  </span>

                  <button
                    id="collection-trio-3d-btn"
                    onClick={() => onOpen3DViewer(trioProduct)}
                    className="bg-[#1c1314]/90 hover:bg-[#1c1314] text-[#f7e8ea] px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md flex items-center gap-1.5 transition"
                  >
                    <Box className="w-3.5 h-3.5 text-[#e8baa9]" />
                    Inspect Set in 3D
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Individual Product Grid for Interactive Shopping */}
        <div className="pt-10 border-t border-[#ebd0d5]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs tracking-[0.2em] text-[#9c5a61] uppercase font-semibold">
                CURATED FORMULATIONS
              </span>
              <h3 className="font-serif text-3xl font-medium text-[#1c1314]">
                The LUMORA Repertoire
              </h3>
            </div>
            <p className="text-xs text-[#73595d] max-w-sm">
              Each bottle is hand-numbered, cold-blended, and poured in small batches to preserve botanical bioactivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                id={`product-card-${item.id}`}
                className="group relative rounded-2xl bg-white/70 backdrop-blur-xs border border-[#ecd2d7] p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#dfb2ba] transition-all duration-300"
              >
                {item.badge && (
                  <span className="absolute top-6 left-6 z-10 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1c1314]/85 text-[#fbeeee] backdrop-blur-sm shadow-sm">
                    {item.badge}
                  </span>
                )}

                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#f9e9ec] mb-4 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 select-none"
                  />

                  {/* 3D Inspect overlay button on hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-2">
                    <button
                      id={`inspect-btn-${item.id}`}
                      onClick={() => onOpen3DViewer(item)}
                      className="px-3.5 py-2 rounded-full bg-white text-[#1c1413] text-xs font-semibold shadow-lg hover:bg-[#faebed] transition flex items-center gap-1.5"
                    >
                      <Box className="w-3.5 h-3.5 text-[#9c5a61]" />
                      3D View
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between text-xs text-[#8c6e73]">
                    <span className="uppercase tracking-wider">{item.category}</span>
                    <span>{item.volume}</span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#1c1314] group-hover:text-[#8e4a52] transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#6e5458] line-clamp-2 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f0dadf] flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-lg text-[#1c1314]">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-[#9d8085] line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    id={`add-btn-${item.id}`}
                    onClick={() => handleAdd(item)}
                    className="px-4 py-2 rounded-full bg-[#1c1314] hover:bg-[#3a2528] text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#e8baa9]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

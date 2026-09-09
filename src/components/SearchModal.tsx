import { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, X, Box, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpen3DViewer: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  products,
  onOpen3DViewer,
  onAddToCart,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.keyIngredients.some((i) => i.toLowerCase().includes(q)) ||
        (p.notes && Object.values(p.notes).some((n) => n.toLowerCase().includes(q)))
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="search-modal-overlay"
        className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md pt-20"
      >
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#161211] border border-[#3b2927] p-6 text-[#fbf6f4] shadow-2xl space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#362624] pb-4">
            <div className="flex items-center gap-3 w-full">
              <Search className="w-5 h-5 text-[#e8baa9] shrink-0" />
              <input
                id="search-input"
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lip gloss, creams, ingredients (e.g. Lip Glaze, Serum, Rose)..."
                className="w-full bg-transparent text-sm text-white placeholder-[#876e69] focus:outline-hidden"
              />
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#967670] hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick filter pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-[#8e746e] py-1">Popular:</span>
            {['Lip Gloss', 'Radiant Cream', 'Glow Serum', 'Peptides', 'Vitamin C', 'Aloe Vera'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-full bg-[#231a19] hover:bg-[#342422] text-[#d8baa9] border border-[#3e2c2a] transition"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#8e746e]">
                No botanical formulations found matching "{query}".
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#201817] border border-[#352523] hover:border-[#4f3734] transition gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-black/40 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] tracking-wider uppercase text-[#d89f91] block">
                        {product.category} • {product.volume}
                      </span>
                      <h4 className="font-serif text-base font-medium text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#9d837d] truncate font-light">
                        ${product.price} • {product.keyIngredients.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onOpen3DViewer(product);
                      }}
                      className="p-2 rounded-lg bg-[#2e201e] hover:bg-[#3d2b28] text-[#e8baa9] text-xs flex items-center gap-1 transition"
                      title="Inspect in 3D"
                    >
                      <Box className="w-4 h-4" />
                      <span className="hidden sm:inline">3D</span>
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="px-3.5 py-2 rounded-lg bg-[#e8baa9] hover:bg-white text-[#1c1312] text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

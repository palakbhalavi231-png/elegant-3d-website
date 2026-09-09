import { Ingredient, Product } from '../types';
import { X, Sparkles, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IngredientDetailModalProps {
  ingredient: Ingredient | null;
  onClose: () => void;
  products: Product[];
  onOpen3DViewer: (product: Product) => void;
}

export default function IngredientDetailModal({
  ingredient,
  onClose,
  products,
  onOpen3DViewer,
}: IngredientDetailModalProps) {
  if (!ingredient) return null;

  const matchingProducts = products.filter((p) =>
    ingredient.featuredIn.some((title) => p.name.includes(title) || title.includes(p.name))
  );

  return (
    <AnimatePresence>
      <div
        id="ingredient-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      >
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-lg rounded-2xl bg-[#131d18] border border-emerald-800/50 p-6 sm:p-8 text-[#eef6f2] shadow-2xl space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-black/40 text-emerald-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-600/50 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#85cca4] font-medium">
                Action: {ingredient.action}
              </span>
              <h3 className="font-serif text-3xl font-medium text-white">
                {ingredient.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300/80 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Harvested: {ingredient.origin}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-emerald-100/90 leading-relaxed font-light">
            {ingredient.description}
          </p>

          {/* Key Clinical Benefits */}
          <div className="space-y-2 bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/40">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
              Dermatological Efficacy
            </span>
            <ul className="space-y-1.5 text-xs text-emerald-100">
              {ingredient.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured In Products */}
          <div>
            <span className="text-xs font-semibold text-[#85cca4] uppercase tracking-wider block mb-2.5">
              Formulated In
            </span>
            <div className="space-y-2">
              {matchingProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0e1814] border border-emerald-900/60"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="text-xs">
                      <h5 className="font-medium text-white">{p.name}</h5>
                      <span className="text-emerald-400 font-semibold">${p.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpen3DViewer(p);
                    }}
                    className="px-3 py-1.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1 transition"
                  >
                    <span>View in 3D</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

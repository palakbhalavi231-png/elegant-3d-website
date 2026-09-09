import { X, ShieldCheck, Heart, Leaf, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormulaTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormulaTransparencyModal({
  isOpen,
  onClose,
}: FormulaTransparencyModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="formula-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      >
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#1b1514] border border-[#44312e] p-6 sm:p-8 text-[#f7ece8] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-black/40 text-[#d89f91] hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#d89f91] font-medium">
              Clinical Transparency
            </span>
            <h3 className="font-serif text-3xl font-medium text-white mt-1">
              Pure. Safe. Effective.
            </h3>
            <p className="text-sm text-[#caa8a1] mt-2 font-light">
              Every drop in Lumora’s apothecary is tested across 4 distinct quality matrices before release.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#241a18] p-4 rounded-xl border border-[#412e2b] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#362523] flex items-center justify-center text-[#e8baa9]">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-semibold text-white">
                100% Bio-Active
              </h4>
              <p className="text-xs text-[#a38c86] leading-relaxed">
                Zero parabens, sulfates, silicones, PEGs, artificial fragrances, or hormone disruptors.
              </p>
            </div>

            <div className="bg-[#241a18] p-4 rounded-xl border border-[#412e2b] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#362523] flex items-center justify-center text-[#e8baa9]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-semibold text-white">
                Dermatology Tested
              </h4>
              <p className="text-xs text-[#a38c86] leading-relaxed">
                Evaluated under rigorous HRIPT (Human Repeat Insult Patch Testing) for 0% irritation.
              </p>
            </div>

            <div className="bg-[#241a18] p-4 rounded-xl border border-[#412e2b] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#362523] flex items-center justify-center text-[#e8baa9]">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-semibold text-white">
                Cruelty Free
              </h4>
              <p className="text-xs text-[#a38c86] leading-relaxed">
                Leaping Bunny certified, never tested on animals, and packaged in recyclable luxury glass.
              </p>
            </div>
          </div>

          {/* What We Ban */}
          <div className="bg-[#241a18] p-5 rounded-xl border border-[#412e2b] space-y-3">
            <h4 className="text-xs font-semibold text-[#e8baa9] uppercase tracking-wider">
              The Lumora Blacklist (Over 2,700 Excluded Ingredients)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#d6bfba]">
              {[
                'Synthetic Musks',
                'Phthalates',
                'Mineral Oils',
                'Formaldehyde',
                'Parabens',
                'BHA & BHT',
                'Chemical Sunscreens',
                'Hydroquinone',
                'Microbeads',
              ].map((banned, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#e8baa9]" />
                  <span>{banned}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#e8baa9] text-[#1a1211] font-semibold text-xs tracking-wider uppercase hover:bg-white transition"
            >
              Close Transparency Report
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

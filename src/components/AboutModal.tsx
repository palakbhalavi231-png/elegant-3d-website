import { X, Sparkles, Award, Globe, Flower2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="about-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      >
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#181312] border border-[#44312e] p-6 sm:p-8 text-[#f7ece8] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-black/40 text-[#d89f91] hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#d89f91] font-medium">
              The Maison Story
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-1">
              About LUMORA
            </h3>
            <p className="text-sm text-[#caa8a1] mt-2 italic">
              "Where high French cosmetic artistry meets clinical cellular botany."
            </p>
          </div>

          <div className="space-y-4 text-sm text-[#d6bfba] font-light leading-relaxed">
            <p>
              Born in the lavender-strewn hills of Grasse, France, LUMORA was founded with an unyielding conviction: that the world's most evocative lip glazes and restorative skincare rituals can be achieved without compromising bodily wellness or our planet.
            </p>
            <p>
              Every botanical essence is hand-harvested at peak dawn dew—when plant terpenes reach maximum bio-resonance. By harmonizing ancient floral enfleurage with clean supercritical carbon dioxide extraction, we preserve every micron of natural vitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#231a18] border border-[#3e2c2a] text-center space-y-1">
              <Flower2 className="w-5 h-5 text-[#e8baa9] mx-auto" />
              <div className="font-serif text-lg font-semibold text-white">Grasse, France</div>
              <div className="text-[11px] text-[#a08782]">Artisanal Distillation</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#231a18] border border-[#3e2c2a] text-center space-y-1">
              <Award className="w-5 h-5 text-[#e8baa9] mx-auto" />
              <div className="font-serif text-lg font-semibold text-white">100% Clean</div>
              <div className="text-[11px] text-[#a08782]">Third-Party Certified</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#231a18] border border-[#3e2c2a] text-center space-y-1">
              <Globe className="w-5 h-5 text-[#e8baa9] mx-auto" />
              <div className="font-serif text-lg font-semibold text-white">Net Zero</div>
              <div className="text-[11px] text-[#a08782]">Solar-Powered Labs</div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#e8baa9] text-[#1a1211] font-semibold text-xs tracking-wider uppercase hover:bg-white transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

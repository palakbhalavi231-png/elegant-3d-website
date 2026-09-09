import { useState, type FormEvent } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = discountApplied ? subtotal * 0.15 : 0;
  const shippingThreshold = 150;
  const freeShipping = subtotal >= shippingThreshold;
  const shippingProgress = Math.min(100, (subtotal / shippingThreshold) * 100);
  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === 'glow15' || promoCode.trim().toLowerCase() === 'lumora') {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md bg-[#161211] text-[#fbf6f4] h-full shadow-2xl flex flex-col border-l border-[#362725]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#362725] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#e8baa9]" />
                <h3 className="font-serif text-xl font-normal text-white">
                  Your Lumora Bag
                </h3>
                <span className="text-xs bg-[#2b1f1e] text-[#e8baa9] px-2.5 py-0.5 rounded-full border border-[#483330]">
                  {items.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </div>

              <button
                id="close-cart-btn"
                onClick={onClose}
                aria-label="Close bag"
                className="p-1.5 rounded-full hover:bg-white/10 text-[#d8c3be] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            <div className="bg-[#211918] px-5 py-3 border-b border-[#362725] text-xs">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[#d8c3be]">
                  {freeShipping
                    ? '✨ You have unlocked Complimentary Express Shipping!'
                    : `Add $${(shippingThreshold - subtotal).toFixed(2)} more for Free Express Shipping`}
                </span>
                <span className="font-semibold text-[#e8baa9]">
                  {Math.round(shippingProgress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#3a2826] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#e8baa9] to-[#d69989] transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#261d1c] border border-[#3d2c2a] flex items-center justify-center mx-auto text-[#e8baa9]">
                    <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                  </div>
                  <h4 className="font-serif text-xl text-white">Your bag is empty</h4>
                  <p className="text-xs text-[#a0857f] max-w-xs mx-auto">
                    Explore our botanical formulations and find your glow.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 rounded-xl bg-[#211918] border border-[#382826] hover:border-[#4d3633] transition"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 rounded-lg object-cover bg-[#130f0e] shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between">
                        <h5 className="font-serif text-sm font-medium text-white truncate pr-2">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label="Remove item"
                          className="text-[#967670] hover:text-[#e8baa9] transition p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#a88d87]">
                        {item.product.volume} • ${item.product.price}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-[#483330] rounded-full bg-[#181211] px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:text-white transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:text-white transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-semibold text-sm text-[#f4d1c6]">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#362725] bg-[#1a1413] space-y-3">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try GLOW15)"
                    className="flex-1 bg-[#231a19] border border-[#44302e] rounded-lg px-3 py-2 text-xs text-white placeholder-[#876e69] focus:outline-hidden focus:border-[#e8baa9]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#332220] hover:bg-[#48312e] text-xs font-medium text-[#e8baa9] rounded-lg border border-[#4d3330] transition"
                  >
                    Apply
                  </button>
                </form>

                {discountApplied && (
                  <div className="text-xs text-emerald-400 flex items-center justify-between">
                    <span>15% Lumora VIP Discount Applied</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-[#b99f99] pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white">
                      {freeShipping ? 'FREE Express' : '$12.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#362725]">
                    <span>Total</span>
                    <span className="text-[#f4d1c6]">
                      ${(finalTotal + (freeShipping ? 0 : 12)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  id="cart-checkout-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e8baa9] to-[#d69989] text-[#1c1312] font-semibold text-sm tracking-wide shadow-lg hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin" /> Preparing Glow Order...
                    </span>
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8e746e]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit Encrypted Secure Checkout • 30-Day Guarantee</span>
                </div>
              </div>
            )}

            {/* Checkout celebration modal */}
            {checkoutSuccess && (
              <div className="absolute inset-0 bg-[#161211]/95 backdrop-blur-md z-30 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-xl">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-serif text-3xl text-white">
                  Order Confirmed
                </h4>
                <p className="text-xs text-[#d8c3be] max-w-xs leading-relaxed">
                  Thank you for welcoming Lumora into your daily ritual. Your hand-bottled formulations are being prepared with care in Grasse.
                </p>
                <div className="bg-[#241a19] p-3 rounded-xl border border-[#422e2b] text-xs text-[#e8baa9] w-full max-w-xs">
                  Estimated Delivery: 2–3 Business Days
                </div>
                <button
                  onClick={() => {
                    setCheckoutSuccess(false);
                    onClose();
                  }}
                  className="px-8 py-3 rounded-full bg-[#e8baa9] text-[#1c1312] font-semibold text-xs tracking-wider uppercase hover:bg-white transition"
                >
                  Return to Sanctuary
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

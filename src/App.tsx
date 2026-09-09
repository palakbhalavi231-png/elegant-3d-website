import { useState, useEffect } from 'react';
import { PRODUCTS, INGREDIENTS } from './data/products';
import { Product, CartItem, Ingredient } from './types';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FormulaSection from './components/FormulaSection';
import NatureSection from './components/NatureSection';
import CollectionSection from './components/CollectionSection';
import Footer from './components/Footer';

// Modals and Drawers
import Product3DViewerModal from './components/Product3DViewerModal';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import IngredientDetailModal from './components/IngredientDetailModal';
import FormulaTransparencyModal from './components/FormulaTransparencyModal';
import AboutModal from './components/AboutModal';

// Toast
import { Sparkles, Check, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [ingredients] = useState<Ingredient[]>(INGREDIENTS);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumora_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTransparencyOpen, setIsTransparencyOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selected3DProduct, setSelected3DProduct] = useState<Product | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to your bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const creamProduct = products.find((p) => p.id === 'lumora-radiant-cream') || products[1];
  const serumProduct = products.find((p) => p.id === 'lumora-glow-serum') || products[2];

  return (
    <div className="min-h-screen bg-[#121010] text-[#fbf6f4] font-sans selection:bg-[#e6b8a8] selection:text-black">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-50 px-5 py-3 rounded-full bg-[#241a19]/95 text-[#fbf6f4] border border-[#e8baa9]/40 shadow-2xl flex items-center gap-2.5 text-xs font-medium backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#e8baa9]" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 underline text-[#e8baa9] font-semibold hover:text-white"
            >
              View Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenIngredients={() => {
          const natureEl = document.getElementById('nature');
          if (natureEl) natureEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections matching user image */}
      <main>
        {/* Section 1: Hero ("Discover Your Glow" with Eau De Parfum 3D showcase & floating petals) */}
        <HeroSection
          products={products}
          onOpen3DViewer={(p) => setSelected3DProduct(p)}
          onAddToCart={handleAddToCart}
          onExploreClick={() => {
            const collectionEl = document.getElementById('collection');
            if (collectionEl) collectionEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 2: The Formula ("Pure. Safe. Effective." with Radiant Cream on whipped lotion swirl) */}
        <FormulaSection
          creamProduct={creamProduct}
          onOpen3DViewer={(p) => setSelected3DProduct(p)}
          onAddToCart={handleAddToCart}
          onOpenTransparencyModal={() => setIsTransparencyOpen(true)}
        />

        {/* Section 3: Nature's Ingredients ("The Power of Nature" with Glow Serum & 4 botanical badges) */}
        <NatureSection
          serumProduct={serumProduct}
          ingredients={ingredients}
          onOpen3DViewer={(p) => setSelected3DProduct(p)}
          onAddToCart={handleAddToCart}
          onSelectIngredient={(ing) => setSelectedIngredient(ing)}
          onExploreAllIngredients={() => {
            if (ingredients.length > 0) setSelectedIngredient(ingredients[0]);
          }}
        />

        {/* Section 4: Our Collection ("Shop the Look" with the product trio on blush pink podium) */}
        <CollectionSection
          products={products}
          onOpen3DViewer={(p) => setSelected3DProduct(p)}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenIngredients={() => {
          const natureEl = document.getElementById('nature');
          if (natureEl) natureEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals & Slide-overs */}
      <Product3DViewerModal
        product={selected3DProduct}
        onClose={() => setSelected3DProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onOpen3DViewer={(p) => setSelected3DProduct(p)}
        onAddToCart={handleAddToCart}
      />

      <IngredientDetailModal
        ingredient={selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
        products={products}
        onOpen3DViewer={(p) => setSelected3DProduct(p)}
      />

      <FormulaTransparencyModal
        isOpen={isTransparencyOpen}
        onClose={() => setIsTransparencyOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}

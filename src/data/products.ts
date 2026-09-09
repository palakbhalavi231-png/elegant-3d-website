import { Product, Ingredient } from '../types';
import lipglossImg from '../assets/images/lumora_lipgloss_hero_1788918298937.jpg';
import creamImg from '../assets/images/lumora_radiant_cream_1788917723580.jpg';
import serumImg from '../assets/images/lumora_glow_serum_1788917740274.jpg';
import trioImg from '../assets/images/lumora_trio_lipgloss_1788918321752.jpg';

export { lipglossImg, creamImg, serumImg, trioImg };

export const PRODUCTS: Product[] = [
  {
    id: 'lumora-luminous-lip-gloss',
    name: 'LUMORA Luminous Lip Glaze',
    subtitle: 'Plumping Botanical Lip Oil & Glaze',
    category: 'lipgloss',
    price: 38,
    originalPrice: 48,
    volume: '7 ml',
    rating: 4.95,
    reviewsCount: 628,
    description: 'A glass-like, non-sticky lip glaze that cushions lips in radiant, dimensional shine while infusing them with bio-peptides, wild Damask rose oil, and hydrating hyaluronic microspheres for an instantly plumper, luscious pout.',
    image: lipglossImg,
    badge: 'Signature Glaze',
    shade: 'Rose Pétale (Dewy Nude Rose)',
    finish: 'Mirror Glass Finish',
    lipProfile: {
      finish: 'Mirror Glass Shine',
      shade: 'Rose Pétale (Dewy Nude Rose)',
      formula: 'Botanical Bio-Peptides & Hyaluronic',
      texture: 'Silky, Non-Sticky Cushion Glaze'
    },
    keyIngredients: ['Volumizing Peptides', 'Organic Damask Rose Oil', 'Hyaluronic Spheres', 'Cold-Pressed Jojoba Seed'],
    benefits: [
      'Delivers an ultra-reflective mirror shine with zero tackiness',
      'Hyaluronic microspheres visibly plump and smooth fine lip contours',
      'Provides 16 hours of continuous botanical lipid hydration',
      'Features a custom precision plush doe-foot wand for flawless glide'
    ],
    usage: 'Glide directly across bare lips using the plush applicator for a naturally plump, juicy glow, or layer over your favorite lip contour as a dimensional crystalline topcoat.'
  },
  {
    id: 'lumora-radiant-cream',
    name: 'LUMORA Radiant Cream',
    subtitle: 'Nourishing Silk Moisture Crème',
    category: 'skincare',
    price: 88,
    originalPrice: 98,
    volume: '50 ml',
    rating: 4.95,
    reviewsCount: 512,
    description: 'A whipped, featherweight moisturizer that melts seamlessly into the dermis. Delivers 72 hours of continuous hydration, reinforces the skin barrier with lipid-rich plant ceramides, and imparts a luminous, soft-focus finish.',
    image: creamImg,
    badge: 'Award Winner',
    keyIngredients: ['Cold-pressed Shea Butter', 'Star Jasmine Petals', 'Plant Ceramides', 'Triple Hyaluronic Acid'],
    benefits: [
      'Increases hydration by 142% after single application',
      'Non-comedogenic whipped texture suitable for all skin types',
      'Leaves an exquisite satin touch without oily residue',
      'Clinically tested under strict dermatological supervision'
    ],
    usage: 'Warm a pearl-sized amount between fingertips and gently press into cleansed face, neck, and décolletage morning and evening.'
  },
  {
    id: 'lumora-glow-serum',
    name: 'LUMORA Glow Serum',
    subtitle: 'Cellular Botanical Elixir',
    category: 'treatment',
    price: 95,
    originalPrice: 110,
    volume: '30 ml',
    rating: 4.88,
    reviewsCount: 429,
    description: 'A concentrated golden botanical serum designed to ignite cellular vitality. Powered by lipid-soluble Vitamin C Ester, organic cold-pressed jojoba, and antioxidant green tea extract to visibly brighten tone and smooth fine texture.',
    image: serumImg,
    badge: 'Bestseller',
    keyIngredients: ['Tetrahexyldecyl Ascorbate (Vitamin C)', 'Golden Jojoba Seed', 'EGCG Green Tea Extract', 'Botanical Squalane'],
    benefits: [
      'Visibly reduces appearance of dark spots within 14 days',
      'Protects against oxidative stress and blue light exposure',
      'Deeply nourishes the acid mantle without pore clogging',
      '100% natural cold-processed bio-actives'
    ],
    usage: 'Dispense 3 to 4 drops onto cleansed skin. Gently pat with upward motions before sealing with Lumora Radiant Cream.'
  },
  {
    id: 'lumora-complete-collection',
    name: 'The Lumora Grand Ritual Trio',
    subtitle: 'Lip Glaze, Crème & Serum Ensemble',
    category: 'bundle',
    price: 185,
    originalPrice: 221,
    volume: 'Complete 3-Piece Set',
    rating: 5.0,
    reviewsCount: 214,
    description: 'The definitive Lumora ritual in one collector box. Harmonizes our iconic Luminous Lip Glaze (7ml), nourishing Radiant Cream (50ml), and concentrated Glow Serum (30ml) for an unmatched day-to-night glow experience.',
    image: trioImg,
    badge: 'Save $36 • Exclusive Trio',
    keyIngredients: ['Full Ritual Formulations', 'Gift Wrapped in Embossed Rose-Gold Box'],
    benefits: [
      'Complete comprehensive skincare and glowing lip ritual',
      'Complimentary silk vanity travel pouch included',
      'Free priority express delivery worldwide'
    ],
    usage: 'Begin with Glow Serum, seal complexion with Radiant Cream, and finish with Luminous Lip Glaze for full luminous radiance.'
  }
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    action: 'Soothes',
    iconName: 'Leaf',
    origin: 'Sun-drenched Andalusia, Spain',
    description: 'Cold-pressed from inner leaf gel within 4 hours of harvest. Rich in polysaccharides, amino acids, and minerals that instantly calm heat and replenish moisture deep within dermal layers.',
    benefits: [
      'Instant cooling and anti-inflammatory relief',
      'Reinforces skin moisture retention',
      'Accelerates natural skin cellular repair'
    ],
    featuredIn: ['LUMORA Radiant Cream', 'LUMORA Glow Serum'],
    color: '#34d399'
  },
  {
    id: 'green-tea',
    name: 'Green Tea',
    action: 'Protects',
    iconName: 'Shield',
    origin: 'Shizuoka High Altitude Gardens, Japan',
    description: 'Harvested during first spring flush to guarantee peak concentration of epigallocatechin gallate (EGCG)—nature’s most potent antioxidant shield against urban pollution and UV photo-aging.',
    benefits: [
      'Shields against environmental free radicals',
      'Soothes redness and tightens pores naturally',
      'Maintains collagen elasticity over time'
    ],
    featuredIn: ['LUMORA Glow Serum', 'LUMORA Luminous Lip Glaze'],
    color: '#10b981'
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C',
    action: 'Brightens',
    iconName: 'Sparkles',
    origin: 'Clean Fermented Botanical Ester',
    description: 'Our proprietary lipid-soluble Tetrahexyldecyl Ascorbate penetrates 50x deeper than standard L-ascorbic acid without causing irritation, revealing a crystalline, energized complexion.',
    benefits: [
      'Visibly fades hyperpigmentation and sun spots',
      'Boosts natural cellular collagen synthesis',
      'Restores luminous natural radiance'
    ],
    featuredIn: ['LUMORA Glow Serum', 'LUMORA Radiant Cream'],
    color: '#fbbf24'
  },
  {
    id: 'jojoba-oil',
    name: 'Jojoba Oil',
    action: 'Moisturizes',
    iconName: 'Droplets',
    origin: 'Sonoran Desert Sustainable Organic Reserve',
    description: 'Golden, cold-pressed liquid wax esters that perfectly mimic human skin’s natural lipid barrier. Seamlessly delivers biocompatible hydration without blocking pores or feeling heavy.',
    benefits: [
      'Biocompatible with all skin sebum types',
      'Balances natural oil production',
      'Locks in active ingredients for all-day moisture'
    ],
    featuredIn: ['LUMORA Glow Serum', 'The Grand Ritual Trio'],
    color: '#f59e0b'
  }
];

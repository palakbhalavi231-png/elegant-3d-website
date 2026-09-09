import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '../types';
import { X, RotateCcw, Sparkles, Check, ShoppingBag, ShieldCheck, Sun, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product3DViewerModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function Product3DViewerModal({
  product,
  onClose,
  onAddToCart,
}: Product3DViewerModalProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [lightColor, setLightColor] = useState<'rosegold' | 'warm' | 'studio'>('rosegold');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product || !canvasRef.current) return;
    const container = canvasRef.current;
    container.innerHTML = '';

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Dynamic lights
    const ambientLight = new THREE.AmbientLight(0xfff0ee, 1.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffe6dc, 2.5);
    mainKeyLight.position.set(5, 8, 5);
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(0xe8a598, 2.2);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    const bottomReflect = new THREE.PointLight(0xffdfd0, 1.5, 15);
    bottomReflect.position.set(0, -3, 3);
    scene.add(bottomReflect);

    const productGroup = new THREE.Group();
    scene.add(productGroup);

    // Rose gold metallic material
    const roseGoldCapMaterial = new THREE.MeshStandardMaterial({
      color: 0xd89f91,
      metalness: 0.92,
      roughness: 0.18,
    });

    // Glass material with refraction sheen
    const luxuryGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.72,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.5,
    });

    // Internal cosmetic liquid
    const liquidColor =
      product.category === 'lipgloss' || product.category === 'lipstick'
        ? 0xde4368
        : product.category === 'skincare'
        ? 0xfff3f0
        : 0xe0a253;

    const liquidMaterial = new THREE.MeshStandardMaterial({
      color: liquidColor,
      roughness: 0.12,
      metalness: 0.08,
      transparent: product.category !== 'skincare',
      opacity: product.category === 'skincare' ? 0.98 : 0.88,
    });

    // Label texture generated via HTML Canvas
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 320;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#fbf5f2';
      ctx.fillRect(0, 0, 512, 320);
      ctx.strokeStyle = '#c99688';
      ctx.lineWidth = 6;
      ctx.strokeRect(16, 16, 480, 288);

      ctx.font = 'bold 36px serif';
      ctx.fillStyle = '#1c1514';
      ctx.textAlign = 'center';
      ctx.fillText('LUMORA', 256, 110);

      ctx.font = '19px sans-serif';
      ctx.fillStyle = '#6f544f';
      ctx.letterSpacing = '3px';
      ctx.fillText(product.name.replace('LUMORA ', '').toUpperCase(), 256, 175);

      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#94756f';
      ctx.fillText(product.volume, 256, 235);
    }
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.6,
      metalness: 0.05,
    });

    if (product.category === 'lipgloss' || product.category === 'lipstick') {
      // Luxury Lip Gloss Crystal Cylinder Tube with Rose Gold Cap & Doe-Foot Wand
      // 1. Heavy base crystal glass outer tube
      const outerGlassGeo = new THREE.CylinderGeometry(0.72, 0.72, 3.4, 36);
      const outerGlassMesh = new THREE.Mesh(outerGlassGeo, luxuryGlassMaterial);
      outerGlassMesh.position.y = 0.2;
      productGroup.add(outerGlassMesh);

      // 2. Thick solid crystal glass bottom
      const glassBottomGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.5, 36);
      const glassBottomMesh = new THREE.Mesh(glassBottomGeo, luxuryGlassMaterial);
      glassBottomMesh.position.y = -1.6;
      productGroup.add(glassBottomMesh);

      // 3. Inner reservoir filled with glossy lip glaze
      const innerGlossGeo = new THREE.CylinderGeometry(0.54, 0.54, 2.8, 32);
      const innerGlossMesh = new THREE.Mesh(innerGlossGeo, liquidMaterial);
      innerGlossMesh.position.y = 0.15;
      productGroup.add(innerGlossMesh);

      // 4. Doe-Foot Applicator stem inside
      const stemGeo = new THREE.CylinderGeometry(0.065, 0.065, 2.4, 16);
      const stemMat = new THREE.MeshStandardMaterial({
        color: 0xfbf6f4,
        roughness: 0.3,
        transparent: true,
        opacity: 0.85,
      });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.y = 0.7;
      productGroup.add(stemMesh);

      // 5. Doe-foot sponge tip angled
      const tipGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.38, 16);
      const tipMat = new THREE.MeshStandardMaterial({
        color: 0xb92b4c,
        roughness: 0.5,
      });
      const tipMesh = new THREE.Mesh(tipGeo, tipMat);
      tipMesh.position.set(0, -0.45, 0);
      tipMesh.rotation.z = 0.2;
      productGroup.add(tipMesh);

      // 6. Polished Rose Gold Cap
      const capGeo = new THREE.CylinderGeometry(0.73, 0.73, 1.7, 36);
      const capMesh = new THREE.Mesh(capGeo, roseGoldCapMaterial);
      capMesh.position.y = 2.4;
      productGroup.add(capMesh);

      // 7. Rose Gold Neck Band / Collar
      const bandGeo = new THREE.CylinderGeometry(0.74, 0.74, 0.15, 36);
      const bandMat = new THREE.MeshStandardMaterial({
        color: 0xf3cfc6,
        metalness: 0.95,
        roughness: 0.1,
      });
      const bandMesh = new THREE.Mesh(bandGeo, bandMat);
      bandMesh.position.y = 1.58;
      productGroup.add(bandMesh);

      // 8. Curved glass label
      const curvedLabelGeo = new THREE.CylinderGeometry(0.725, 0.725, 1.2, 36, 1, true, -Math.PI / 2.8, (2 * Math.PI) / 2.8);
      const curvedLabelMesh = new THREE.Mesh(curvedLabelGeo, labelMaterial);
      curvedLabelMesh.position.y = 0.1;
      productGroup.add(curvedLabelMesh);
    } else if (product.category === 'skincare') {
      // Radiant Cream Jar
      const jarBaseGeo = new THREE.CylinderGeometry(1.7, 1.6, 1.8, 36);
      const jarMesh = new THREE.Mesh(jarBaseGeo, luxuryGlassMaterial);
      productGroup.add(jarMesh);

      // Inside cream
      const creamGeo = new THREE.CylinderGeometry(1.5, 1.45, 1.5, 32);
      const creamMesh = new THREE.Mesh(creamGeo, liquidMaterial);
      creamMesh.position.y = -0.1;
      productGroup.add(creamMesh);

      // Rose gold lid
      const lidGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.7, 36);
      const lidMesh = new THREE.Mesh(lidGeo, roseGoldCapMaterial);
      lidMesh.position.y = 1.1;
      productGroup.add(lidMesh);

      // Curved label
      const curvedLabelGeo = new THREE.CylinderGeometry(1.71, 1.61, 1.0, 36, 1, true, -Math.PI / 3, (2 * Math.PI) / 3);
      const curvedLabelMesh = new THREE.Mesh(curvedLabelGeo, labelMaterial);
      curvedLabelMesh.position.y = -0.1;
      productGroup.add(curvedLabelMesh);
    } else {
      // Glow Serum Dropper Bottle
      const bottleGeo = new THREE.CylinderGeometry(1.1, 1.1, 3.0, 36);
      const bottleMesh = new THREE.Mesh(bottleGeo, luxuryGlassMaterial);
      productGroup.add(bottleMesh);

      // Golden serum inside
      const innerSerumGeo = new THREE.CylinderGeometry(0.95, 0.95, 2.7, 32);
      const innerSerumMesh = new THREE.Mesh(innerSerumGeo, liquidMaterial);
      innerSerumMesh.position.y = -0.1;
      productGroup.add(innerSerumMesh);

      // Rose Gold Collar
      const collarGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.8, 32);
      const collarMesh = new THREE.Mesh(collarGeo, roseGoldCapMaterial);
      collarMesh.position.y = 1.8;
      productGroup.add(collarMesh);

      // Rubber Dropper Pipette Bulb
      const bulbGeo = new THREE.SphereGeometry(0.45, 24, 24);
      const bulbMat = new THREE.MeshStandardMaterial({ color: 0xf5d3c8, roughness: 0.6 });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.scale.set(1, 1.4, 1);
      bulb.position.y = 2.5;
      productGroup.add(bulb);

      // Label
      const serumLabelGeo = new THREE.CylinderGeometry(1.11, 1.11, 1.6, 36, 1, true, -Math.PI / 2.5, (4 * Math.PI) / 5);
      const serumLabelMesh = new THREE.Mesh(serumLabelGeo, labelMaterial);
      serumLabelMesh.position.y = -0.2;
      productGroup.add(serumLabelMesh);
    }

    // Natural stone base plate underneath
    const baseRockGeo = new THREE.CylinderGeometry(2.8, 3.2, 0.35, 12);
    const baseRockMat = new THREE.MeshStandardMaterial({
      color: 0x3d3532,
      roughness: 0.9,
    });
    const baseRock = new THREE.Mesh(baseRockGeo, baseRockMat);
    baseRock.position.y = -2.0;
    productGroup.add(baseRock);

    // Orbit / Drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      productGroup.rotation.y += deltaX * 0.01;
      productGroup.rotation.x = Math.max(-0.6, Math.min(0.6, productGroup.rotation.x + deltaY * 0.008));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('touchstart', handleMouseDown, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        productGroup.rotation.y += 0.007;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [product, isRotating, lightColor]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div
        id="product-3d-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[#4a3a37]/50 bg-[#161313] text-[#f7efec] shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
        >
          {/* Close button */}
          <button
            id="close-3d-modal-btn"
            onClick={onClose}
            aria-label="Close 3D modal"
            className="absolute top-4 right-4 z-20 rounded-full bg-black/60 p-2.5 text-[#e5b7a9] transition hover:bg-black/90 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* 3D Canvas side */}
          <div className="relative flex-1 min-h-[340px] md:min-h-[500px] bg-gradient-to-b from-[#221c1b] to-[#120f0f] flex items-center justify-center">
            <div ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Hint overlay */}
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#d1ada5]">
              <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <RotateCcw className="h-3.5 w-3.5 animate-spin text-[#d89f91]" />
                Drag to rotate 360° in 3D
              </span>
              <button
                id="toggle-rotation-btn"
                onClick={() => setIsRotating(!isRotating)}
                className="pointer-events-auto bg-black/60 px-3 py-1.5 rounded-full hover:bg-black/90 transition backdrop-blur-sm"
              >
                {isRotating ? 'Pause Spin' : 'Auto Spin'}
              </button>
            </div>

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-[#e6b8a8]/20 text-[#f5c6b8] border border-[#e6b8a8]/30 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Real-time 3D View
              </span>
            </div>
          </div>

          {/* Details side */}
          <div className="w-full md:w-[420px] p-6 md:p-8 flex flex-col justify-between overflow-y-auto border-t md:border-t-0 md:border-l border-[#3a2e2b]">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#d89f91] uppercase">
                  {product.category} • {product.volume}
                </span>
                <h3 className="font-serif text-3xl font-medium text-white mt-1">
                  {product.name}
                </h3>
                <p className="text-sm text-[#bdaaa4] mt-1 italic">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-[#f5c6b8]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8c746e] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="ml-auto text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Dermatologist Tested
                </span>
              </div>

              <p className="text-sm text-[#d1bfba] leading-relaxed">
                {product.description}
              </p>

              {product.lipProfile && (
                <div className="rounded-xl bg-[#211a19] p-3.5 border border-[#3f312e] text-xs space-y-2">
                  <span className="font-semibold text-[#e5b7a9] uppercase tracking-wider block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#e5b7a9]" />
                    Lip Finish & Shade Profile
                  </span>
                  <div className="grid grid-cols-2 gap-2.5 pt-1 text-[#d6c4c0]">
                    <div className="bg-[#181312] p-2 rounded-lg border border-[#332523]">
                      <strong className="text-[#d8a396] block text-[10px] uppercase tracking-wider">Finish</strong>
                      <span className="text-xs leading-tight font-medium text-white">{product.lipProfile.finish}</span>
                    </div>
                    <div className="bg-[#181312] p-2 rounded-lg border border-[#332523]">
                      <strong className="text-[#d8a396] block text-[10px] uppercase tracking-wider">Shade</strong>
                      <span className="text-xs leading-tight font-medium text-white">{product.lipProfile.shade}</span>
                    </div>
                    <div className="bg-[#181312] p-2 rounded-lg border border-[#332523]">
                      <strong className="text-[#d8a396] block text-[10px] uppercase tracking-wider">Formula</strong>
                      <span className="text-xs leading-tight font-medium text-white">{product.lipProfile.formula}</span>
                    </div>
                    <div className="bg-[#181312] p-2 rounded-lg border border-[#332523]">
                      <strong className="text-[#d8a396] block text-[10px] uppercase tracking-wider">Texture</strong>
                      <span className="text-xs leading-tight font-medium text-white">{product.lipProfile.texture}</span>
                    </div>
                  </div>
                </div>
              )}

              {product.notes && (
                <div className="rounded-xl bg-[#211a19] p-3.5 border border-[#3f312e] text-xs space-y-1.5">
                  <span className="font-semibold text-[#e5b7a9] uppercase tracking-wider block">
                    Fragrance Pyramid
                  </span>
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[#d6c4c0]">
                    <div>
                      <strong className="text-white block">Top</strong>
                      <span className="text-[11px] leading-tight">{product.notes.top}</span>
                    </div>
                    <div>
                      <strong className="text-white block">Heart</strong>
                      <span className="text-[11px] leading-tight">{product.notes.heart}</span>
                    </div>
                    <div>
                      <strong className="text-white block">Base</strong>
                      <span className="text-[11px] leading-tight">{product.notes.base}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-[#c7aba4] uppercase tracking-wider block mb-2">
                  Key Benefits
                </span>
                <ul className="space-y-1.5 text-xs text-[#b8a6a1]">
                  {product.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#e6b8a8] mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#3a2e2b] flex items-center gap-3">
              <button
                id="modal-add-to-bag-btn"
                onClick={() => {
                  onAddToCart(product);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e6b8a8] to-[#d69f90] text-[#1c1413] font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-[#e6b8a8]/20"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to Bag — ${product.price}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

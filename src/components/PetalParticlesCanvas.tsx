import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PetalParticlesCanvasProps {
  intensity?: 'high' | 'medium' | 'subtle';
  interactive?: boolean;
}

export default function PetalParticlesCanvas({
  intensity = 'high',
  interactive = true
}: PetalParticlesCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create petal curved geometry using Parametric-like curved shape
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.6, 0.4, 0.9, 1.2, 0.4, 2.0);
    petalShape.bezierCurveTo(0.1, 2.4, -0.1, 2.4, -0.4, 2.0);
    petalShape.bezierCurveTo(-0.9, 1.2, -0.6, 0.4, 0, 0);

    const shapeGeometry = new THREE.ShapeGeometry(petalShape, 12);
    // Give curve to petal vertices for 3D realism
    const pos = shapeGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const zCurvature = Math.sin(y * 1.5) * 0.25 - (x * x) * 0.15;
      pos.setZ(i, zCurvature);
    }
    shapeGeometry.computeVertexNormals();

    // Lighting for 3D sheen
    const ambientLight = new THREE.AmbientLight(0xffdfd9, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff0ed, 1.8);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pinkLight = new THREE.PointLight(0xf2a6b2, 2.5, 50);
    pinkLight.position.set(-10, -5, 10);
    scene.add(pinkLight);

    // Petal materials with delicate translucent pink variations
    const petalColors = [0xf7c4cc, 0xf2b5be, 0xebb0bc, 0xffd9e1, 0xdf9fa9];
    const materials = petalColors.map((color) =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
      })
    );

    const petalCount = intensity === 'high' ? 42 : intensity === 'medium' ? 24 : 14;
    const petals: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speedY: number;
      speedRotX: number;
      speedRotY: number;
      speedRotZ: number;
      swayFreq: number;
      swayAmp: number;
      phase: number;
    }[] = [];

    const group = new THREE.Group();
    scene.add(group);

    for (let i = 0; i < petalCount; i++) {
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(shapeGeometry, mat);

      const scale = 0.4 + Math.random() * 0.65;
      mesh.scale.set(scale, scale, scale);

      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 26;
      const z = (Math.random() - 0.5) * 20;

      mesh.position.set(x, y, z);
      mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);

      group.add(mesh);

      petals.push({
        mesh,
        baseX: x,
        baseY: y,
        baseZ: z,
        speedY: 0.015 + Math.random() * 0.025,
        speedRotX: 0.008 + Math.random() * 0.012,
        speedRotY: 0.006 + Math.random() * 0.015,
        speedRotZ: 0.005 + Math.random() * 0.01,
        swayFreq: 0.8 + Math.random() * 1.2,
        swayAmp: 0.6 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      targetMouseX = (clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      group.rotation.y = mouseX * 0.15;
      group.rotation.x = -mouseY * 0.15;

      petals.forEach((p) => {
        // Fall down gently
        p.baseY -= p.speedY;
        if (p.baseY < -15) {
          p.baseY = 15;
          p.baseX = (Math.random() - 0.5) * 36;
        }

        // Sway back and forth
        const sway = Math.sin(elapsedTime * p.swayFreq + p.phase) * p.swayAmp;
        const driftZ = Math.cos(elapsedTime * 0.7 + p.phase) * 0.4;

        p.mesh.position.y = p.baseY;
        p.mesh.position.x = p.baseX + sway + mouseX * 2.5;
        p.mesh.position.z = p.baseZ + driftZ - mouseY * 2;

        p.mesh.rotation.x += p.speedRotX;
        p.mesh.rotation.y += p.speedRotY;
        p.mesh.rotation.z += p.speedRotZ;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shapeGeometry.dispose();
      materials.forEach((m) => m.dispose());
    };
  }, [intensity, interactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    />
  );
}

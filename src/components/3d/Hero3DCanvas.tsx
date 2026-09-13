import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Subtle luxury lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xb9974a, 8, 20);
    goldLight.position.set(3, 3, 3);
    scene.add(goldLight);

    const rimLight = new THREE.PointLight(0xffffff, 5, 20);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const subtleCyanLight = new THREE.PointLight(0xd4b265, 3, 15);
    subtleCyanLight.position.set(0, -4, 2);
    scene.add(subtleCyanLight);

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Core: Abstract Chrome Polyhedron (Icosahedron + Wireframe Overlay)
    const coreGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.12,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Wireframe cage with champagne gold accent
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xb9974a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.setScalar(1.01);
    mainGroup.add(wireMesh);

    // Outer Gyroscope Rings
    const ringGeo1 = new THREE.TorusGeometry(1.9, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xb9974a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.01, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // Orbiting Floating Particles (Stardust)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      scales[i] = Math.random() * 0.04 + 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4b265,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Smooth Interaction Tracking
    const targetRotation = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;
      targetRotation.y = mouse.x * 0.45;
      targetRotation.x = -mouse.y * 0.35;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Scroll parallax depth effect
    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Slow elegant core rotation
      coreMesh.rotation.y += delta * 0.18;
      coreMesh.rotation.x += delta * 0.08;
      wireMesh.rotation.copy(coreMesh.rotation);

      // Rings counter-rotation
      ring1.rotation.z += delta * 0.15;
      ring1.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.1;
      ring2.rotation.y -= delta * 0.12;

      // Particle subtle pulsing & orbital rotation
      particles.rotation.y += delta * 0.05;

      // Mouse tracking damping
      mainGroup.rotation.y += (targetRotation.y - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.05;

      // Parallax scroll: move core back and slightly down as user scrolls down
      const scrollOffset = Math.min(scrollY / window.innerHeight, 1.5);
      mainGroup.position.z = -scrollOffset * 2.2;
      mainGroup.position.y = -scrollOffset * 0.8;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

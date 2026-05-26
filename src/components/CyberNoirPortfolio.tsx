'use client';

import { FormEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  aboutCopy,
  experienceEntries,
  featuredProjects,
  homeIntro,
  skillGroups,
  socialLinks,
} from '../data/portfolio';
import { assetSrc } from '../utils/asset';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { href: '#terminal', label: 'terminal' },
  { href: '#about', label: 'about' },
  { href: '#story', label: 'story' },
  { href: '#interests', label: 'interests' },
  { href: '#skills', label: 'skills' },
  { href: '#work', label: 'work' },
  { href: '#experience', label: 'archive' },
  { href: '#contact', label: 'contact' },
];

const terminalDirectoryTargets: Record<string, string> = {
  '/about': '#about',
  '/story': '#story',
  '/interests': '#interests',
  '/skills': '#skills',
  '/projects': '#work',
  '/experience': '#experience',
  '/contact': '#contact',
};

const terminalCommandTargets: Record<string, string> = {
  about: '#about',
  story: '#story',
  interests: '#interests',
  skills: '#skills',
  projects: '#work',
  work: '#work',
  experience: '#experience',
  archive: '#experience',
  contact: '#contact',
};

const allSkills = skillGroups.flatMap((group) =>
  group.items.map((item) => ({
    name: item,
    group: group.title,
    detail: group.copy,
  }))
);

function splitWords(text: string) {
  return text.split(' ').map((word, index) => (
    <span className="split-word" style={{ '--split-index': index } as React.CSSProperties} key={`${word}-${index}`}>
      {word}
    </span>
  ));
}

function HeroScene({ theme }: { theme: 'dark' | 'light' }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let active = true;

    async function startScene() {
      const THREE = await import('three');

      if (!active || !mountRef.current || window.matchMedia('(max-width: 760px)').matches) {
        return;
      }

      const mount = mountRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 384;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const isLight = theme === 'light';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '900 220px Space Grotesk, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = isLight ? '#7bdde6' : '#00f0ff';
        ctx.shadowBlur = isLight ? 22 : 34;
        ctx.fillStyle = isLight ? '#17202b' : '#0b111e';
        ctx.strokeStyle = isLight ? '#008895' : '#00f0ff';
        ctx.lineWidth = isLight ? 2 : 3;
        ctx.fillText('JEAN', canvas.width / 2, canvas.height / 2);
        ctx.strokeText('JEAN', canvas.width / 2, canvas.height / 2);
      }

      const textTexture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshStandardMaterial({
        map: textTexture,
        transparent: true,
        metalness: theme === 'light' ? 0.34 : 0.76,
        roughness: theme === 'light' ? 0.42 : 0.28,
        emissive: new THREE.Color(theme === 'light' ? '#d9fbff' : '#003c44'),
        emissiveIntensity: theme === 'light' ? 0.42 : 1.2,
      });
      const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 2.2, 18, 6), textMaterial);
      scene.add(textMesh);

      const particles = new Float32Array(900 * 3);
      for (let i = 0; i < particles.length; i += 3) {
        particles[i] = (Math.random() - 0.5) * 13;
        particles[i + 1] = (Math.random() - 0.5) * 8;
        particles[i + 2] = (Math.random() - 0.5) * 10;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: theme === 'light' ? '#008895' : '#00f0ff',
        size: theme === 'light' ? 0.014 : 0.018,
        transparent: true,
        opacity: theme === 'light' ? 0.46 : 0.78,
      });
      const particleField = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particleField);

      const ambient = new THREE.AmbientLight(theme === 'light' ? '#ffffff' : '#244b5a', theme === 'light' ? 2.6 : 1.8);
      const point = new THREE.PointLight(theme === 'light' ? '#008895' : '#00f0ff', theme === 'light' ? 2.7 : 5, 12);
      point.position.set(0, 0, 3);
      scene.add(ambient, point);

      const mouse = { x: 0, y: 0 };
      const handlePointer = (event: PointerEvent) => {
        mouse.x = (event.clientX / window.innerWidth - 0.5) * 4;
        mouse.y = -(event.clientY / window.innerHeight - 0.5) * 3;
      };
      window.addEventListener('pointermove', handlePointer);

      const resize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', resize);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        textMesh.position.y = Math.sin(time * 1.25) * 0.08;
        textMesh.rotation.y = Math.sin(time * 0.55) * 0.08;
        particleField.rotation.y += 0.0009;
        particleField.position.y = Math.sin(time * 0.35) * 0.12;
        point.position.x += (mouse.x - point.position.x) * 0.08;
        point.position.y += (mouse.y - point.position.y) * 0.08;
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', handlePointer);
        window.removeEventListener('resize', resize);
        textTexture.dispose();
        textMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    startScene();

    return () => {
      active = false;
      cleanup();
    };
  }, [theme]);

  return (
    <div className="hero-scene" ref={mountRef} aria-hidden="true">
      <div className="hero-css-name">JEAN</div>
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    const characters = 'JEANSECURE01' + '\u30b5\u30a4\u30d0\u30fc\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3';
    let width = 0;
    let height = 0;
    let columns: number[] = [];
    let frame = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      columns = Array.from({ length: Math.ceil(width / 18) }, () => Math.random() * height);
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      ctx.fillStyle = 'rgba(7, 9, 15, 0.13)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = '14px JetBrains Mono, monospace';
      ctx.fillStyle = 'rgba(245, 166, 35, 0.58)';

      columns.forEach((y, index) => {
        const char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, index * 18, y);
        columns[index] = y > height + Math.random() * 900 ? 0 : y + 18;
      });
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas className="matrix-rain" ref={canvasRef} aria-hidden="true" />;
}

function EasterEggScene({ active, onClose }: { active: boolean; onClose: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    const closeTimer = window.setTimeout(onClose, 7600);
    const close = () => onClose();
    window.addEventListener('keydown', close);
    window.addEventListener('pointerdown', close);

    let cleanup = () => {};
    let mounted = true;

    async function startScene() {
      const THREE = await import('three');
      const mount = mountRef.current;

      if (!mounted || !mount) {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const canvas = document.createElement('canvas');
      canvas.width = 1600;
      canvas.height = 420;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'italic 86px Playfair Display, Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#f5a623';
        ctx.shadowBlur = 38;
        ctx.fillStyle = '#f5a623';
        ctx.fillText('Accept things as they are', canvas.width / 2, canvas.height / 2);
      }

      const textTexture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true, opacity: 0.94 });
      const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(6.8, 1.8), textMaterial);
      scene.add(textMesh);

      const particles = new Float32Array(240 * 3);
      for (let i = 0; i < particles.length; i += 3) {
        particles[i] = (Math.random() - 0.5) * 10;
        particles[i + 1] = (Math.random() - 0.5) * 6;
        particles[i + 2] = (Math.random() - 0.5) * 7;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: '#f5a623',
        size: 0.015,
        transparent: true,
        opacity: 0.44,
      });
      const particleField = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particleField);

      const light = new THREE.PointLight('#f5a623', 2.6, 12);
      light.position.set(0, 1, 4);
      scene.add(light);

      const resize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', resize);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        textMesh.rotation.y = Math.sin(time * 0.32) * 0.12;
        textMesh.scale.setScalar(1 + Math.sin(time * 0.7) * 0.025);
        particleField.rotation.y += 0.00045;
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        textTexture.dispose();
        textMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    startScene();

    return () => {
      mounted = false;
      window.clearTimeout(closeTimer);
      window.removeEventListener('keydown', close);
      window.removeEventListener('pointerdown', close);
      cleanup();
    };
  }, [active, onClose]);

  if (!active) {
    return null;
  }

  return (
    <div className="easter-egg" role="dialog" aria-label="Hidden calm scene">
      <div className="easter-silence" />
      <div className="easter-scene" ref={mountRef} />
    </div>
  );
}

function StoryParticleScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let active = true;

    async function startScene() {
      const THREE = await import('three');
      const mount = mountRef.current;

      if (!active || !mount || window.matchMedia('(max-width: 760px)').matches) {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 7;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const count = 900;
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1.2;
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = Math.sin(angle) * radius * 0.7;
        positions[i + 2] = (Math.random() - 0.5) * 1.4;
        velocities[i] = Math.cos(angle) * (0.002 + Math.random() * 0.006);
        velocities[i + 1] = Math.sin(angle) * (0.002 + Math.random() * 0.006);
        velocities[i + 2] = (Math.random() - 0.5) * 0.004;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: '#00f0ff',
        size: 0.02,
        transparent: true,
        opacity: 0.56,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const resize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', resize);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const array = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < array.length; i += 3) {
          array[i] += velocities[i];
          array[i + 1] += velocities[i + 1];
          array[i + 2] += velocities[i + 2];
        }
        geometry.attributes.position.needsUpdate = true;
        points.rotation.z += 0.0008;
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    startScene();

    return () => {
      active = false;
      cleanup();
    };
  }, []);

  return <div className="story-particles" ref={mountRef} aria-hidden="true" />;
}

function WaveformCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fastRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const time = performance.now() * (fastRef.current ? 0.009 : 0.003);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#f5a623';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x += 6) {
        const y = height / 2 + Math.sin(x * 0.035 + time) * 22 + Math.sin(x * 0.09 + time * 1.4) * 8;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    resize();
    draw();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      className="waveform-canvas"
      ref={canvasRef}
      onMouseEnter={() => {
        fastRef.current = true;
      }}
      onMouseLeave={() => {
        fastRef.current = false;
      }}
      aria-hidden="true"
    />
  );
}

function RubiksCubeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let active = true;

    async function startScene() {
      const THREE = await import('three');
      const mount = mountRef.current;

      if (!active || !mount || window.matchMedia('(max-width: 760px)').matches) {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.set(3.5, 3.1, 5.5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      const colors = ['#f5a623', '#00f0ff', '#ff3b3b', '#e8e6df', '#1f7a5a', '#5836ff'];
      const materials = colors.map((color) => new THREE.MeshStandardMaterial({ color, roughness: 0.45 }));
      const gap = 0.54;
      for (let x = -1; x <= 1; x += 1) {
        for (let y = -1; y <= 1; y += 1) {
          for (let z = -1; z <= 1; z += 1) {
            const cube = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.46), materials[(x + y + z + 6) % materials.length]);
            cube.position.set(x * gap, y * gap, z * gap);
            group.add(cube);
          }
        }
      }
      scene.add(group);
      scene.add(new THREE.AmbientLight('#e8e6df', 1.5));
      const light = new THREE.PointLight('#f5a623', 3, 10);
      light.position.set(3, 3, 4);
      scene.add(light);

      let dragging = false;
      let lastX = 0;
      const down = (event: PointerEvent) => {
        dragging = true;
        lastX = event.clientX;
      };
      const move = (event: PointerEvent) => {
        if (!dragging) {
          return;
        }
        group.rotation.y += (event.clientX - lastX) * 0.01;
        lastX = event.clientX;
      };
      const up = () => {
        dragging = false;
      };
      mount.addEventListener('pointerdown', down);
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);

      const resize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', resize);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        if (!dragging) {
          group.rotation.y += 0.006;
          group.rotation.x = Math.sin(performance.now() * 0.001) * 0.12;
        }
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        mount.removeEventListener('pointerdown', down);
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('resize', resize);
        materials.forEach((material) => material.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    startScene();

    return () => {
      active = false;
      cleanup();
    };
  }, []);

  return (
    <div className="rubiks-scene" ref={mountRef} aria-label="Interactive rotating Rubik's cube">
      <span className="rubiks-fallback">3x3 pattern cube</span>
    </div>
  );
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const lag = { x: pos.x, y: pos.y };
    let frame = 0;

    const move = (event: PointerEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };

    const over = (event: Event) => {
      if ((event.target as Element).closest('a, button, input, textarea, [role="button"]')) {
        ring.classList.add('cursor-ring-active');
      }
    };
    const out = () => ring.classList.remove('cursor-ring-active');

    const tick = () => {
      frame = requestAnimationFrame(tick);
      lag.x += (pos.x - lag.x) * 0.16;
      lag.y += (pos.y - lag.y) * 0.16;
      ring.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
    };

    window.addEventListener('pointermove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

function TerminalWorld({
  onEasterEgg,
  onUnlock,
  unlocked: portfolioUnlocked,
  theme,
  onThemeChange,
}: {
  onEasterEgg: () => void;
  onUnlock: () => void;
  unlocked: boolean;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}) {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<string[]>([
    'boot sequence complete',
    'portfolio contents locked',
    'Type sudo ls to unlock the directory list.',
  ]);
  const [unlocked, setUnlocked] = useState(false);

  const directories = ['/about', '/story', '/interests', '/skills', '/projects', '/experience', '/contact'];

  const scrollToDirectory = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const scrollToTarget = (href: string) => {
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, portfolioUnlocked ? 80 : 880);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    setInput('');

    if (command === 'sudo ls') {
      setUnlocked(true);
      onUnlock();
      setLines((current) =>
        current.includes('/about')
          ? [...current, '$ sudo ls', 'directory list already unlocked']
          : [
              ...current,
              '$ sudo ls',
              ...directories,
              'tip: type cd work, cd skills, or cd contact to jump faster.',
            ]
      );
      return;
    }

    if (command.startsWith('cd ')) {
      const target = command.replace('cd ', '').replace('/', '').trim();
      const href = terminalCommandTargets[target];

      if (!unlocked && !portfolioUnlocked) {
        setLines((current) => [...current, `$ ${input}`, 'access denied. type sudo ls first.']);
        return;
      }

      if (!href) {
        setLines((current) => [...current, `$ ${input}`, `bash: no such directory: ${target}`]);
        return;
      }

      setLines((current) => [...current, `$ ${input}`, `opening ${target}...`]);
      scrollToTarget(href);
      return;
    }

    if (command === 'theme light' || command === 'light') {
      onThemeChange('light');
      setLines((current) => [...current, `$ ${input}`, 'theme switched: light']);
      return;
    }

    if (command === 'theme dark' || command === 'dark') {
      onThemeChange('dark');
      setLines((current) => [...current, `$ ${input}`, 'theme switched: dark']);
      return;
    }

    if (command === 'theme') {
      setLines((current) => [...current, '$ theme', `current theme: ${theme}. try theme light or theme dark.`]);
      return;
    }

    if (command === 'whoami') {
      setLines((current) => [...current, '$ whoami', 'jean. breaker of things. builder of worlds.']);
      return;
    }

    if (command === 'sugina') {
      setLines((current) => [...current, '$ sugina']);
      onEasterEgg();
      return;
    }

    setLines((current) => [...current, `$ ${input}`, 'bash: command not found. try sudo ls']);
  };

  return (
    <section className="world terminal-world" id="terminal" data-section data-cursor="cyan">
      <div className="section-label">02 / terminal</div>
      <div className="terminal-window reveal-panel">
        <div className="terminal-bar">
          <span className="os-dot os-red" />
          <span className="os-dot os-amber" />
          <span className="os-dot os-green" />
          <strong>jean@portfolio:~$</strong>
        </div>

        <div className="terminal-body" aria-live="polite">
          {!unlocked ? (
            <div className="terminal-help">
              <span>Access required</span>
              <strong>Type <kbd>sudo ls</kbd> then press Enter.</strong>
              <p>This reveals the portfolio sections. No Linux knowledge needed.</p>
            </div>
          ) : null}

          {lines.map((line, index) => {
            const isDirectory = line.startsWith('/');
            const href = terminalDirectoryTargets[line] ?? line;

            return isDirectory && unlocked ? (
              <a className="terminal-line terminal-link" href={href} onClick={scrollToDirectory(href)} key={`${line}-${index}`}>
                {line}
              </a>
            ) : (
              <p
                className={`terminal-line ${
                  line.includes('command not found') || line.includes('access denied') ? 'terminal-error' : ''
                }`}
                key={`${line}-${index}`}>
                {line}
              </p>
            );
          })}

          <form className="terminal-input-line" onSubmit={submit}>
            <span>$</span>
            <input
              aria-label="Terminal command"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            <span className="terminal-cursor" />
          </form>
        </div>
      </div>
    </section>
  );
}

function AboutWorld() {
  return (
    <section className="world about-world" id="about" data-section data-cursor="amber">
      <MatrixRain />
      <div className="watermark watermark-left">ABOUT</div>
      <div className="section-label">03 / about</div>
      <article className="noir-card about-card-zine reveal-panel">
        <p className="kicker">Personal file</p>
        <h2>{splitWords(aboutCopy.pullquote)}</h2>
        <div className="rule-draw" />
        {aboutCopy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="signal-strip">
          {aboutCopy.signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </article>
    </section>
  );
}

function StoryWorld() {
  const storyLines = [
    "I've always needed to know how things work.",
    'Not just the surface. The bones. The logic underneath.',
    'To understand something - you have to break it first.',
  ];

  return (
    <section className="world story-world" id="story" data-section data-cursor="cyan">
      <StoryParticleScene />
      <div className="watermark watermark-right">ORIGIN</div>
      <div className="section-label">04 / story</div>
      <div className="story-lines reveal-panel">
        {storyLines.map((line) => (
          <h2 key={line}>{splitWords(line)}</h2>
        ))}
        <p>That&apos;s why I chose cybersecurity.</p>
      </div>
    </section>
  );
}

function InterestsWorld() {
  const games = [
    { name: 'Valorant', flavor: 'precision, nerves, timing' },
    { name: 'Black Myth: Wukong', flavor: 'mythic fights and patience' },
    { name: 'God of War', flavor: 'cinematic combat, heavy story' },
    { name: 'League of Legends', flavor: 'still here after the chaos', badge: 'OG' },
  ];

  return (
    <section className="world interests-world" id="interests" data-section data-cursor="amber">
      <div className="watermark watermark-right">LIFE</div>
      <div className="section-label">05 / interests</div>
      <div className="interest-collage">
        <article className="interest-card music-card reveal-panel">
          <p className="kicker">Music</p>
          <WaveformCanvas />
          <h2>Drums. Guitar. FL Studio.</h2>
          <p>I don&apos;t just listen - I make it.</p>
        </article>

        <article className="interest-card gaming-card reveal-panel">
          <p className="kicker">Gaming</p>
          <div className="game-grid">
            {games.map((game) => (
              <div className="game-tile" key={game.name}>
                {game.badge ? <span>{game.badge}</span> : null}
                <strong>{game.name}</strong>
                <small>{game.flavor}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="interest-card film-card reveal-panel">
          <p className="kicker">Video editing</p>
          <div className="film-strip">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <h2>I cut. I grade. I tell stories visually.</h2>
        </article>

        <article className="interest-card cube-card reveal-panel">
          <p className="kicker">Rubik&apos;s cube</p>
          <RubiksCubeScene />
          <h2>Pattern recognition. Problem solving. Obsession.</h2>
        </article>
      </div>
    </section>
  );
}

function SkillsWorld() {
  const [activeSkill, setActiveSkill] = useState(allSkills[0]);

  return (
    <section className="world skills-world" id="skills" data-section data-cursor="cyan">
      <div className="watermark watermark-right">SKILLS</div>
      <div className="section-label">06 / skills</div>
      <div className="skills-lab reveal-panel">
        <div className="skills-core" aria-hidden="true">
          <div className="core-pulse" />
          {allSkills.slice(0, 12).map((skill, index) => (
            <button
              className="orbit-skill"
              type="button"
              key={skill.name}
              style={{ '--orbit-index': index } as React.CSSProperties}
              onClick={() => setActiveSkill(skill)}>
              <span>{skill.name}</span>
            </button>
          ))}
        </div>

        <article className="skill-readout noir-card">
          <p className="kicker">Museum readout</p>
          <h2>{activeSkill.name}</h2>
          <p>{activeSkill.detail}</p>
          <span className="skill-group-tag">{activeSkill.group}</span>
        </article>
      </div>
    </section>
  );
}

function ProjectsWorld() {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section className="world projects-world" id="work" data-section data-cursor="cyan">
      <div className="watermark watermark-right">WORK</div>
      <div className="redaction redaction-one" aria-hidden="true" />
      <div className="redaction redaction-two" aria-hidden="true" />
      <div className="section-label">07 / projects</div>
      <div className="projects-heading reveal-panel">
        <p className="kicker">Blueprint meets sketchbook</p>
        <h2>Builds that treat security, product, and clarity as the same problem.</h2>
        <span className="est-badge">EST. 2025</span>
      </div>

      <div className="project-node-grid">
        {featuredProjects.map((project, index) => (
          <article
            className={`project-node ${flipped === project.title ? 'project-node-flipped' : ''}`}
            key={project.title}
            style={{ '--node-index': index } as React.CSSProperties}>
            <button
              className="project-node-inner"
              type="button"
              onClick={() => setFlipped(flipped === project.title ? null : project.title)}>
              <span className="project-face project-front">
                <span className="project-meta">
                  {project.year} / {project.tag}
                </span>
                <strong>{project.title}</strong>
                <span>{project.highlight}</span>
                <span className="project-hover-hint">hover / tap to open file</span>
              </span>
              <span className="project-face project-back">
                <span className="project-dossier">
                  <span className="dossier-header">
                    <span>PROJECT FILE</span>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="dossier-image-wrap">
                    <img src={assetSrc(project.poster)} alt={`${project.title} project preview`} loading="lazy" />
                  </span>
                  <span className="dossier-copy">
                    <strong>{project.title}</strong>
                    <span>{project.description}</span>
                  </span>
                  <span className="mini-stack">{project.stack.join(' / ')}</span>
                  {'href' in project && project.href ? <span className="repo-line">repository linked</span> : null}
                </span>
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceWorld() {
  return (
    <section className="world experience-world" id="experience" data-section data-cursor="amber">
      <div className="watermark watermark-left">HISTORY</div>
      <div className="section-label">08 / archive</div>
      <div className="archive-paper reveal-panel">
        <p className="kicker">Classified archive</p>
        <h2>Files declassified from the resume.</h2>
        <div className="timeline">
          {experienceEntries.map((entry) => (
            <article className="timeline-file" key={`${entry.date}-${entry.role}`}>
              <span className="timeline-date">{entry.date}</span>
              <div>
                <p className="redacted">{'\u2588'.repeat(20)}</p>
                <h3>{entry.role}</h3>
                <strong>{entry.company}</strong>
                <p>{entry.detail}</p>
              </div>
              <span className="stamp">DECLASSIFIED</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactTransitionWorld() {
  return (
    <section className="world contact-transition-world" aria-label="Archive to contact transition" data-cursor="cyan">
      <div className="transition-void" aria-hidden="true">
        <span className="transition-ring transition-ring-one" />
        <span className="transition-ring transition-ring-two" />
        <span className="transition-ring transition-ring-three" />
        <span className="transition-line transition-line-left" />
        <span className="transition-line transition-line-right" />
      </div>
      <div className="transition-copy">
        <span>archive closing</span>
        <strong>signal route opening</strong>
      </div>
    </section>
  );
}

function ContactWorld() {
  const stationRef = useRef<HTMLElement>(null);
  const contactItems = [
    {
      label: 'GitHub',
      href: socialLinks.github,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49v-1.89c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.28 9.28 0 0 1 12 7.01c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.8c0 .27.18.59.69.49A10.17 10.17 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: socialLinks.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.94 8.98H3.75V20h3.19V8.98ZM5.35 4C4.31 4 3.5 4.77 3.5 5.78c0 .99.79 1.78 1.81 1.78h.02c1.06 0 1.86-.79 1.86-1.78C7.17 4.77 6.39 4 5.35 4ZM20.5 13.68c0-3.39-1.81-4.96-4.22-4.96-1.95 0-2.82 1.07-3.31 1.83V8.98H9.78C9.82 10.01 9.78 20 9.78 20h3.19v-6.15c0-.33.02-.66.12-.89.26-.66.86-1.34 1.86-1.34 1.31 0 1.84 1 1.84 2.47V20h3.19v-6.32h.52Z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: `mailto:${socialLinks.email}`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 6h15A2.5 2.5 0 0 1 22 8.5v7A2.5 2.5 0 0 1 19.5 18h-15A2.5 2.5 0 0 1 2 15.5v-7A2.5 2.5 0 0 1 4.5 6Zm.24 2 7.24 4.72L19.28 8H4.74Zm15.26 2.08-7.47 4.83a1 1 0 0 1-1.08 0L4 10.08v5.42c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5v-5.42Z" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: socialLinks.facebook,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.18 22v-8.05h2.7l.4-3.14h-3.1V8.8c0-.91.25-1.53 1.56-1.53h1.67V4.46A22.4 22.4 0 0 0 14.98 4c-2.41 0-4.06 1.47-4.06 4.18v2.33H8.2v3.14h2.72V22h3.26Z" />
        </svg>
      ),
    },
  ];
  const [activeSignal, setActiveSignal] = useState(contactItems[2]);
  const activeQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=18&color=021317&bgcolor=e8ffff&data=${encodeURIComponent(
    activeSignal.href
  )}`;

  const moveStationDepth = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty('--contact-depth-x', `${x * 22}px`);
    event.currentTarget.style.setProperty('--contact-depth-y', `${y * 18}px`);
    event.currentTarget.style.setProperty('--contact-light-x', `${50 + x * 18}%`);
    event.currentTarget.style.setProperty('--contact-light-y', `${50 + y * 16}%`);
  };

  const resetStationDepth = () => {
    stationRef.current?.style.setProperty('--contact-depth-x', '0px');
    stationRef.current?.style.setProperty('--contact-depth-y', '0px');
    stationRef.current?.style.setProperty('--contact-light-x', '50%');
    stationRef.current?.style.setProperty('--contact-light-y', '50%');
  };

  const magnetizeLink = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    gsap.to(target, {
      x: x * 0.22,
      y: y * 0.22,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  const releaseLink = (event: MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'elastic.out(1, 0.55)',
      overwrite: true,
    });
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className="world contact-world"
      id="contact"
      data-section
      data-cursor="cyan"
      ref={stationRef}
      onMouseMove={moveStationDepth}
      onMouseLeave={resetStationDepth}>
      <div className="contact-watermark" aria-hidden="true">
        CONTACT
      </div>
      <div className="contact-threshold" aria-hidden="true">
        <span className="threshold-line threshold-line-top" />
        <span className="threshold-line threshold-line-mid" />
        <span className="threshold-line threshold-line-bottom" />
        <span className="threshold-copy">contact signal acquiring</span>
      </div>
      <div className="section-label">09 / contact</div>
      <div className="contact-radar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="contact-entry-gate" aria-hidden="true">
        <span className="gate-ring gate-ring-one" />
        <span className="gate-ring gate-ring-two" />
        <span className="gate-ring gate-ring-three" />
        <span className="gate-beam" />
        <span className="gate-copy">archive signal handoff</span>
      </div>
      <div className="contact-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => {
          const particleStyle = {
            '--particle-index': index,
            '--particle-x': `${8 + index * 5.2}%`,
            '--particle-y': `${14 + ((index * 17) % 72)}%`,
          } as React.CSSProperties;

          return <i key={index} style={particleStyle} />;
        })}
      </div>

      <div className="contact-station" aria-label="Final contact signal station">
        <div className="contact-signal-copy contact-signal-reveal">
          <span>terminal contact</span>
          <p>one signal left open</p>
        </div>

        <a
          className="qr-beacon contact-signal-reveal"
          href={activeSignal.href}
          target={activeSignal.label === 'Email' ? undefined : '_blank'}
          rel={activeSignal.label === 'Email' ? undefined : 'noreferrer'}
          aria-label={`Open ${activeSignal.label}`}>
          <span className="qr-halo" aria-hidden="true" />
          <span className="qr-frame">
            <span className="qr-corners" aria-hidden="true" />
            <img
              src={activeQrSrc}
              alt={`QR code for ${activeSignal.label}`}
              loading="lazy"
              key={activeSignal.href}
            />
            <span className="qr-scan" aria-hidden="true" />
          </span>
          <span className="qr-label">scan / {activeSignal.label.toLowerCase()}</span>
          <span className="qr-open-cue">
            <span>click QR to open {activeSignal.label}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 4h6v6h-2V7.41l-7.29 7.3-1.42-1.42 7.3-7.29H14V4ZM5 6h6v2H7v9h9v-4h2v6H5V6Z" />
            </svg>
          </span>
        </a>

        <div className="contact-channel-guide contact-signal-reveal" aria-live="polite">
          <span>active channel / {activeSignal.label}</span>
          <p>tap a signal below to switch the QR</p>
        </div>

        <div className="contact-orbit contact-signal-reveal" aria-label="Switch QR channel">
          {contactItems.map((item) => (
            <button
              className={`contact-orbit-link ${activeSignal.label === item.label ? 'contact-orbit-link-active' : ''}`}
              type="button"
              aria-label={`Show ${item.label} QR code`}
              aria-pressed={activeSignal.label === item.label}
              key={item.label}
              onClick={() => setActiveSignal(item)}
              onMouseMove={magnetizeLink}
              onMouseLeave={releaseLink}>
              <span className="contact-orbit-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <button
          className="contact-top-button contact-signal-reveal"
          type="button"
          onClick={goToTop}
          onMouseMove={magnetizeLink}
          onMouseLeave={releaseLink}
          aria-label="Go to top of portfolio">
          <span className="contact-top-button-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 5 5.5 11.5l1.42 1.42L11 8.83V20h2V8.83l4.08 4.09 1.42-1.42L12 5Z" />
            </svg>
          </span>
          <span>go to top</span>
        </button>
      </div>
    </section>
  );
}

function QuickJumpDock() {
  return (
    <nav className="quick-jump-dock" aria-label="Quick section navigation">
      {navItems
        .filter((item) => item.href !== '#terminal')
        .map((item, index) => (
          <a href={item.href} key={item.href} style={{ '--dock-index': index } as React.CSSProperties}>
            <span className="dock-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="dock-label">{item.label}</span>
          </a>
        ))}
    </nav>
  );
}

export function CyberNoirPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [portfolioUnlocked, setPortfolioUnlocked] = useState(false);
  const [unlockTransition, setUnlockTransition] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [themeTransition, setThemeTransition] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-panel',
        { autoAlpha: 0, y: 42, clipPath: 'inset(12% 0 0 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
          },
        }
      );

    }, rootRef);

    const cursorObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target instanceof HTMLElement) {
          rootRef.current?.classList.toggle('cursor-warm', visible.target.dataset.cursor === 'amber');
        }
      },
      { threshold: 0.44 }
    );
    rootRef.current?.querySelectorAll<HTMLElement>('[data-cursor]').forEach((section) => cursorObserver.observe(section));

    const bootTimer = window.setTimeout(() => setBooted(true), 2600);

    return () => {
      window.clearTimeout(bootTimer);
      cancelAnimationFrame(frame);
      lenis.destroy();
      cursorObserver.disconnect();
      ctx.revert();
    };
  }, []);

  const bootClass = useMemo(() => (booted ? 'booted' : ''), [booted]);
  const openEasterEgg = useCallback(() => setEasterEggActive(true), []);
  const closeEasterEgg = useCallback(() => setEasterEggActive(false), []);
  const changeTheme = useCallback((nextTheme: 'dark' | 'light') => {
    setTheme((current) => {
      if (current === nextTheme) {
        return current;
      }

      setThemeTransition(true);
      window.setTimeout(() => setThemeTransition(false), 1150);
      return nextTheme;
    });
  }, []);
  const unlockPortfolio = useCallback(() => {
    if (portfolioUnlocked || unlockTransition) {
      return;
    }

    setUnlockTransition(true);
    window.setTimeout(() => {
      setPortfolioUnlocked(true);
    }, 720);
    window.setTimeout(() => {
      setUnlockTransition(false);
    }, 1500);
  }, [portfolioUnlocked, unlockTransition]);
  useEffect(() => {
    if (!portfolioUnlocked) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.locked-content-open .world').forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.reveal-panel, .project-node, .timeline-file'),
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
            },
          }
        );
      });

      gsap.fromTo(
        '.contact-signal-reveal',
        { autoAlpha: 0, y: 46, scale: 0.94, filter: 'blur(22px)' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: '.contact-world',
            start: 'top 82%',
          },
        }
      );

      const transitionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-transition-world',
          start: 'top 82%',
          end: 'bottom 18%',
          scrub: 0.9,
        },
      });

      transitionTimeline
        .fromTo(
          '.transition-ring',
          { autoAlpha: 0, scale: 0.2, rotateX: 78, filter: 'blur(18px)' },
          { autoAlpha: 1, scale: 1.2, rotateX: 58, filter: 'blur(0px)', stagger: 0.08, duration: 0.42 }
        )
        .fromTo(
          '.transition-line-left',
          { xPercent: -120, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.28 },
          0.12
        )
        .fromTo(
          '.transition-line-right',
          { xPercent: 120, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.28 },
          0.12
        )
        .fromTo(
          '.transition-copy',
          { autoAlpha: 0, y: 32, filter: 'blur(12px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.24 },
          0.18
        )
        .to('.transition-ring', { scale: 2.8, autoAlpha: 0.18, filter: 'blur(6px)', duration: 0.4 }, 0.58)
        .to('.transition-copy', { autoAlpha: 0, y: -28, filter: 'blur(10px)', duration: 0.22 }, 0.78)
        .to('.transition-line-left, .transition-line-right', { autoAlpha: 0, duration: 0.18 }, 0.82);

      gsap.fromTo(
        '.contact-threshold',
        { autoAlpha: 0, y: -90, scaleY: 0.32, filter: 'blur(14px)' },
        {
          autoAlpha: 1,
          y: 0,
          scaleY: 1,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.contact-world',
            start: 'top 96%',
            end: 'top 48%',
            scrub: 0.7,
          },
        }
      );

      gsap.fromTo(
        '.contact-entry-gate',
        { autoAlpha: 0, y: -180, rotateX: 72, scale: 0.48, filter: 'blur(18px)' },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.contact-world',
            start: 'top 88%',
            end: 'top 32%',
            scrub: 0.8,
          },
        }
      );

    }, rootRef);

    const cursorObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target instanceof HTMLElement) {
          rootRef.current?.classList.toggle('cursor-warm', visible.target.dataset.cursor === 'amber');
        }
      },
      { threshold: 0.44 }
    );

    rootRef.current?.querySelectorAll<HTMLElement>('.locked-content-open [data-cursor]').forEach((section) => {
      cursorObserver.observe(section);
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
    return () => {
      window.clearTimeout(refreshTimer);
      cursorObserver.disconnect();
      ctx.revert();
    };
  }, [portfolioUnlocked]);

  const jumpToTerminal = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    document.querySelector('#terminal')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`cyber-noir theme-${theme} ${bootClass} ${unlockTransition ? 'unlocking' : ''} ${
        themeTransition ? 'theme-switching' : ''
      }`}
      ref={rootRef}>
      <EasterEggScene active={easterEggActive} onClose={closeEasterEgg} />
      <CustomCursor />
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      {portfolioUnlocked ? <QuickJumpDock /> : null}
      <div className="unlock-transition" aria-hidden="true">
        <div className="unlock-scanline" />
        <div className="unlock-copy">
          <span>ACCESS GRANTED</span>
          <strong>portfolio directory mounted</strong>
        </div>
      </div>
      <div className="theme-transition" aria-hidden="true">
        <div className="theme-transition-window">
          <span>{theme === 'light' ? 'WINDOWS MODE' : 'KALI MODE'}</span>
          <strong>{theme === 'light' ? 'desktop environment loading' : 'terminal environment loading'}</strong>
        </div>
      </div>

      <header className={`zine-header ${portfolioUnlocked ? 'zine-header-unlocked' : 'zine-header-locked'}`}>
        <a className="zine-brand" href="#top">
          JEAN
          <span>Welcome</span>
        </a>
        {portfolioUnlocked ? (
          <nav aria-label="World navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        ) : (
          <div className="nav-locked" aria-live="polite">
            locked / type sudo ls
          </div>
        )}
        <button
          className="theme-toggle"
          type="button"
          onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
      </header>

      <main>
        <section className="world hero-world" id="top" data-section data-cursor="cyan">
          <HeroScene theme={theme} />
          <div className="hero-copy">
            <p className="kicker">SAP security / ABAP / cybersecurity</p>
            <h1>Jean Cristian Mangaser</h1>
            <p>{homeIntro.headline1}</p>
            <button type="button" onClick={jumpToTerminal}>
              enter archive
            </button>
          </div>
          <div className="boot-line">
            <span>sudo access requested</span>
            <i />
          </div>
          <div className="flash-wipe" aria-hidden="true" />
        </section>

        <TerminalWorld
          onEasterEgg={openEasterEgg}
          onUnlock={unlockPortfolio}
          unlocked={portfolioUnlocked}
          theme={theme}
          onThemeChange={changeTheme}
        />
        {portfolioUnlocked ? (
          <div className="locked-content locked-content-open">
            <AboutWorld />
            <StoryWorld />
            <InterestsWorld />
            <SkillsWorld />
            <ProjectsWorld />
            <ExperienceWorld />
            <ContactTransitionWorld />
            <ContactWorld />
          </div>
        ) : null}
      </main>
    </div>
  );
}

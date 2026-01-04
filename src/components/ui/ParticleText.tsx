'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleTextProps {
  text: string;
  className?: string;
}

const ParticleText = ({ text, className }: ParticleTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;   
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let nodes: any[] = [];
    let width = 0;
    let height = 0;
    
    // Mouse/Touch state
    const mouse = { x: -1000, y: -1000, radius: 60 }; // Reduced radius for mobile
    let interactionActive = false;

    const resize = () => {
      // 1. Get the actual display size
      width = container.clientWidth;
      height = container.clientHeight;

      // 2. Handle High DPI (Retina) screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // 3. Scale context so drawing operations fit
      context.scale(dpr, dpr);
      
      // 4. Force CSS size to match container
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      buildTexture();
    };

    const buildTexture = () => {
      nodes = [];
      context.clearRect(0, 0, width, height);
      
      // Responsive font size: smaller on mobile
      // width < 600 ? mobile size : desktop size
      const fontSize = width < 600 ? width / 6 : width / 7; 
      
      context.font = `700 ${fontSize}px "Space Mono", monospace`;
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, width / 2, height / 2);

      const imageData = context.getImageData(0, 0, width * window.devicePixelRatio, height * window.devicePixelRatio);
      context.clearRect(0, 0, width, height);

      // Adjust density based on screen size to save battery on mobile
      const density = width < 600 ? 5 : 6; 

      // Scan pixel data (account for DPR in loop)
      const dataWidth = width * window.devicePixelRatio;
      const dataHeight = height * window.devicePixelRatio;
      const scaleFactor = window.devicePixelRatio;

      for (let y = 0; y < dataHeight; y += density * scaleFactor) {
        for (let x = 0; x < dataWidth; x += density * scaleFactor) {
          const index = (Math.floor(x) + Math.floor(y) * dataWidth) * 4;
          
          if (imageData.data[index + 3] > 128) {
            nodes.push({
              x: Math.random() * width,
              y: Math.random() * height,
              goalX: x / scaleFactor,
              goalY: y / scaleFactor,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              radius: Math.random() * 1.5 + 0.5
            });
          }
        }
      }
    };

    const update = () => {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Physics
        const dx = node.goalX - node.x;
        const dy = node.goalY - node.y;
        
        node.vx += dx * 0.05;
        node.vy += dy * 0.05;

        // Interaction (Mouse or Touch)
        if (interactionActive) {
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const distance = Math.sqrt(mdx * mdx + mdy * mdy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(mdy, mdx);
            node.vx += Math.cos(angle) * force * 5;
            node.vy += Math.sin(angle) * force * 5;
          }
        }

        node.vx *= 0.85;
        node.vy *= 0.85;
        node.x += node.vx;
        node.y += node.vy;

        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(6, 182, 212, ${Math.min(1, Math.abs(node.vx) + 0.5)})`; 
        context.fill();
      }

      requestAnimationFrame(update);
    };

    // --- EVENT HANDLERS (Mobile + Desktop) ---
    
    const handleMove = (x: number, y: number) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = x - rect.left;
        mouse.y = y - rect.top;
        interactionActive = true;
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
        e.preventDefault(); // Prevent scrolling while touching particles
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onLeave = () => {
      interactionActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Initialize
    resize();
    update();

    window.addEventListener('resize', resize);
    
    // Mouse
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onLeave);
    
    // Touch
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchstart', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onLeave);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchMove);
      canvas.removeEventListener('touchend', onLeave);
    };
  }, [text]);

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ParticleText;
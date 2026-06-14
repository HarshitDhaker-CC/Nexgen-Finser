'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number; opacityDir: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NUM_PARTICLES = 22;
    particlesRef.current = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.5 + 0.2,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const points: [number, number][] = [];
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const prog = i / steps;
        const wave = Math.sin(prog * Math.PI * 2.5 + t * 0.02) * 0.04;
        const growth = 1 / (1 + Math.exp(-10 * (prog - 0.5)));
        const yVal = 0.75 - growth * 0.55 + wave;
        points.push([prog * W, yVal * H]);
      }

      ctx.save();
      ctx.shadowColor = 'rgba(200,167,93,0.35)';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        const [px, py] = points[i - 1];
        const [cx, cy] = points[i];
        ctx.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }
      ctx.strokeStyle = 'rgba(200,167,93,0.7)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(200,167,93,0.12)');
      grad.addColorStop(1, 'rgba(200,167,93,0)');
      ctx.beginPath();
      ctx.moveTo(points[0][0], H);
      ctx.lineTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        const [px, py] = points[i - 1];
        const [cx, cy] = points[i];
        ctx.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }
      ctx.lineTo(points[points.length - 1][0], H);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        const [px, py] = points[i - 1];
        const [cx, cy] = points[i];
        ctx.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }
      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0, 'rgba(200,167,93,0.4)');
      lineGrad.addColorStop(0.5, 'rgba(200,167,93,0.9)');
      lineGrad.addColorStop(1, 'rgba(200,167,93,0.4)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      const dotIdx = Math.floor(((t * 0.5) % steps));
      if (dotIdx < points.length) {
        const [dotX, dotY] = points[dotIdx];
        ctx.save();
        const ring = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 14);
        ring.addColorStop(0, 'rgba(200,167,93,0.3)');
        ring.addColorStop(1, 'rgba(200,167,93,0)');
        ctx.beginPath();
        ctx.arc(dotX, dotY, 14, 0, Math.PI * 2);
        ctx.fillStyle = ring;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#C8A75D';
        ctx.shadowColor = 'rgba(200,167,93,0.8)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }

      [0.25, 0.5, 0.75, 1.0].forEach((frac) => {
        const idx = Math.floor(frac * steps);
        if (idx < points.length) {
          const [px, py] = points[idx];
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#C8A75D';
          ctx.strokeStyle = 'rgba(255,255,255,0.6)';
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();
        }
      });

      particlesRef.current.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.opacity += p.opacityDir * 0.005;
        if (p.opacity >= 0.7) p.opacityDir = -1;
        if (p.opacity <= 0.1) p.opacityDir = 1;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,167,93,${p.opacity})`;
        ctx.shadowColor = 'rgba(200,167,93,0.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      ctx.save();
      for (let row = 1; row <= 4; row++) {
        const y = (H / 5) * row;
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(W, y);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.restore();

      t++;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
}

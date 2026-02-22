"use client";

import React, { useEffect, useRef } from "react";
// Local wind data stub for particle system animation
const windWaveData = [
  { windSpeed: 85, direction: "NW" },
  { windSpeed: 45, direction: "W" },
  { windSpeed: 30, direction: "NE" },
  { windSpeed: 60, direction: "SW" },
  { windSpeed: 95, direction: "W" },
  { windSpeed: 40, direction: "E" },
  { windSpeed: 55, direction: "S" },
  { windSpeed: 70, direction: "N" },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  speed: number;
}

interface WindParticleSystemProps {
  map: any; // Leaflet map instance
  enabled?: boolean;
  particleCount?: number;
}

export default function WindParticleSystem({
  map,
  enabled = true,
  particleCount = 40 // Reduced: fewer, longer streaks for realistic wind effect
}: WindParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!map || !enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match map container
    const mapContainer = map.getContainer();
    const resizeCanvas = () => {
      canvas.width = mapContainer.offsetWidth;
      canvas.height = mapContainer.offsetHeight;
    };
    resizeCanvas();

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    // Create a single particle
    const createParticle = (): Particle => {
      // Get random wind data (in real app, would be based on location)
      const windData = windWaveData[Math.floor(Math.random() * windWaveData.length)];
      const baseSpeed = windData.windSpeed / 300; // Slower base speed

      // Add random speed variation (0.5x to 2.0x) for natural variation
      const speedVariation = 0.5 + Math.random() * 1.5;
      const speed = baseSpeed * speedVariation;

      // Convert direction to velocity
      const directionMap: Record<string, [number, number]> = {
        N: [0, -1], NE: [0.7, -0.7], E: [1, 0], SE: [0.7, 0.7],
        S: [0, 1], SW: [-0.7, 0.7], W: [-1, 0], NW: [-0.7, -0.7],
      };
      const [dx, dy] = directionMap[windData.direction] || [1, 0];

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: dx * speed * 0.8,
        vy: dy * speed * 0.8,
        life: Math.random() * 150,
        maxLife: 150 + Math.random() * 150, // Vary lifespan more (150-300 frames)
        speed: speed,
      };
    };

    // Update particle position and life
    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life += 1;

      // Reset particle if it goes off screen or dies
      if (
        particle.x < 0 ||
        particle.x > canvas.width ||
        particle.y < 0 ||
        particle.y > canvas.height ||
        particle.life > particle.maxLife
      ) {
        const newParticle = createParticle();
        particle.x = newParticle.x;
        particle.y = newParticle.y;
        particle.vx = newParticle.vx;
        particle.vy = newParticle.vy;
        particle.life = 0;
        particle.maxLife = newParticle.maxLife;
        particle.speed = newParticle.speed;
      }
    };

    // Draw particle
    const drawParticle = (particle: Particle) => {
      const lifeRatio = 1 - particle.life / particle.maxLife;
      const alpha = Math.sin(lifeRatio * Math.PI) * 0.5;

      // Color based on speed (cyan for calm, yellow for moderate, red for storm)
      let color;
      if (particle.speed < 0.2) {
        color = `rgba(34, 211, 238, ${alpha})`; // cyan-400
      } else if (particle.speed < 0.4) {
        color = `rgba(250, 204, 21, ${alpha})`; // yellow-400
      } else {
        color = `rgba(239, 68, 68, ${alpha})`; // red-500
      }

      // Draw long streak/trail only (no dot at head)
      // Trail length varies with particle speed for realistic effect
      const trailLength = 8 + particle.speed * 15; // Longer trails for faster particles

      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8 + particle.speed * 1.5; // Line width varies with speed
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x - particle.vx * trailLength, particle.y - particle.vy * trailLength);
      ctx.stroke();
    };

    // Animation loop
    const animate = () => {
      // Fully clear canvas each frame — transparent background so the map shows through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    initParticles();
    animate();

    // Handle map zoom/pan
    const handleMapMove = () => {
      resizeCanvas();
    };
    map.on("move", handleMapMove);
    map.on("zoom", handleMapMove);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      map.off("move", handleMapMove);
      map.off("zoom", handleMapMove);
    };
  }, [map, enabled, particleCount]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 400,
      }}
    />
  );
}

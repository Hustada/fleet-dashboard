import React, { useCallback } from 'react';
import { useTheme } from '@mui/material';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Adjust settings based on theme
  const particleColor = isDark ? '#ffffff' : '#000000';
  const particleOpacity = isDark ? 0.1 : 0.2;
  const linkOpacity = isDark ? 0.1 : 0.15;
  const particleSize = isDark ? { min: 1, max: 3 } : { min: 1.5, max: 4 };
  const particleCount = isDark ? 50 : 70;
  const moveSpeed = isDark ? 0.5 : 0.8;
  const linkDistance = isDark ? 150 : 180;

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: particleColor,
            distance: linkDistance,
            enable: true,
            opacity: linkOpacity,
            width: isDark ? 1 : 1.2,
          },
          move: {
            enable: true,
            direction: "none",
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: moveSpeed,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: particleCount,
          },
          opacity: {
            value: particleOpacity,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: particleOpacity * 0.7,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: particleSize,
          },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: isDark ? 140 : 160,
              links: {
                opacity: isDark ? 0.2 : 0.3
              }
            },
          },
        },
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticlesBackground;

/* eslint-disable prefer-rest-params */
import React from 'react';
import ParticleImage, { forces, Vector } from 'react-particle-image';
import { useWindowSize } from 'rooks';

const ParticleFroge = ({ data, shadow = false }) => {
  const motionForce = (x, y) => forces.entropy(0.9);
  const actionForce = (x, y) => forces.disturbance(x, y, 35);
  const { innerWidth, innerHeight } = useWindowSize();

  return (
    <ParticleImage
      className="particle-froge"
      src="/froge-logo-outline.png"
      width={Number(innerWidth)}
      height={Number(innerHeight)}
      scale={1.95}
      entropy={10}
      maxParticles={2000}
      particleOptions={{
        filter: ({ x, y, image }) => {
          // Get pixel
          const pixel = image.get(x, y);
          // Make a particle for this pixel if blue > 50 (range 0-255)
          return pixel.b > 50;
        },
        color: ({ x, y, image }) => '#2f5d25',
        radius: () => Math.random() * 1.5 + 0.5,
        mass: () => 40,
        friction: () => 0.2,
        initialPosition: ({ canvasDimensions }) => {
          return new Vector(
            canvasDimensions.width / 2,
            canvasDimensions.height / 2
          );
        },
      }}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      mouseDownForce={actionForce}
      backgroundColor="transparent"
    />
  );
};

export default ParticleFroge;

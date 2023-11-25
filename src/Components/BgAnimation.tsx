import React, { useEffect } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import Konva from 'konva';

interface BgAnimationProps {}

const BgAnimation: React.FC<BgAnimationProps> = () => {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const colors = ['#76797b'];
    let colorIndex = 0;

    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    const circlesLayer = new Konva.Layer();

    const circles = Array.from({ length: 30 }, (_, i) => {
      const color = colors[colorIndex++];
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }

      return new Konva.Circle({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 2.5,
        fill: color,
        name: i.toString(),
        speed: 1 + Math.random() * 5, // Assign random speed to each circle
      });
    });

    circles.forEach(circle => circlesLayer.add(circle));

    stage.add(circlesLayer);

    const anim = new Konva.Animation(frame => {
      circles.forEach(circle => {
        if (circle.x() < -circle.radius() * 2) {
          circle.x(width);
          circle.y(Math.random() * height);
          circle.speed = 1 + Math.random() * 2; // Reset speed on reaching left side
        }
        circle.move({ x: -circle.speed, y: 0 });
      });
    }, circlesLayer);

    anim.start();

    // clean up function
    return () => {
      anim.stop();
    };
  }, []);

  return <div id="container" />;
};

export default BgAnimation;

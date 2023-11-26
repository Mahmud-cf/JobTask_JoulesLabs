import React, { useEffect } from 'react';
import Konva from 'konva';

const BgAnimation: React.FC = () => {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    const circlesLayer = new Konva.Layer();
    const tooltipLayer = new Konva.Layer();
    const colors = ['#76797b'];
    let colorIndex = 0;

    const circles: Konva.Circle[] = [];

    for (let i = 0; i < 15; i++) {
      const color = colors[colorIndex++];
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }

      const circle = new Konva.Circle({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 2.5,
        fill: color,
        name: i.toString(),
      });

      circle.speed = 1 + Math.random() * 5; // Assign random speed to each circle
      circles.push(circle);
      circlesLayer.add(circle);
    }

    stage.add(circlesLayer);
    stage.add(tooltipLayer);

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

    const frame = () => {
      anim.start();
      requestAnimationFrame(frame);
    };

    frame();

    // clean up function
    return () => {
      anim.stop();
    };
  }, []);

  return <div id="container" />;
};

export default BgAnimation;

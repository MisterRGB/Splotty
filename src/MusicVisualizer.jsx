import React, { useEffect, useRef } from 'react';
import './App.css';

export default function MusicVisualizer({ audioData }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const draw = () => {
      requestAnimationFrame(draw);
      
      if (!audioData) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      const barWidth = (width / audioData.length) * 2.5;
      let x = 0;
      
      audioData.forEach((item, i) => {
        const barHeight = item / 255 * height / 2;
        const hue = i / audioData.length * 360;
        
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      });
    };
    
    draw();
  }, [audioData]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="visualizer"
      width={800}
      height={200}
    />
  );
}
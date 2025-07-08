import { useEffect, useRef } from 'react';

const WeatherParticles = ({ weatherType }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    if (!weatherType) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Initialize particles based on weather type
    const initParticles = () => {
      particlesRef.current = [];
      const width = canvas.width;
      const height = canvas.height;
      
      let particleCount, particleConfig;
      
      switch(weatherType) {
        case 'rainy':
          particleCount = 200;
          for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 10 + Math.random() * 15,
              length: 15 + Math.random() * 20,
              opacity: 0.3 + Math.random() * 0.7,
              type: 'rain'
            });
          }
          break;
          
        case 'snowy':
          particleCount = 100;
          for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 1 + Math.random() * 3,
              size: 1 + Math.random() * 3,
              opacity: 0.5 + Math.random() * 0.5,
              swing: Math.random() * Math.PI * 2,
              swingSpeed: 0.01 + Math.random() * 0.02,
              type: 'snow'
            });
          }
          break;
          
        case 'cloudy':
          particleCount = 30;
          for (let i = 0; i < particleCount; i++) {
            const size = 50 + Math.random() * 100;
            particlesRef.current.push({
              x: Math.random() * (width + 200) - 100,
              y: Math.random() * 200,
              size: size,
              speed: 0.1 + Math.random() * 0.3,
              opacity: 0.05 + Math.random() * 0.1,
              type: 'cloud'
            });
          }
          break;
          
        case 'sunny':
          particleCount = 20;
          for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * (height * 0.7),
              size: 1 + Math.random() * 3,
              opacity: 0.3 + Math.random() * 0.7,
              speed: 0.5 + Math.random(),
              angle: Math.random() * Math.PI * 2,
              type: 'sunbeam'
            });
          }
          break;
          
        default: // clear
          particleCount = 10;
          for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              size: 2 + Math.random() * 4,
              opacity: 0.1 + Math.random() * 0.2,
              speed: 0.1 + Math.random() * 0.5,
              angle: Math.random() * Math.PI * 2,
              type: 'breeze'
            });
          }
      }
    };
    
    // Draw particles based on type
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      
      particles.forEach((p, i) => {
        // Update position based on type
        switch(p.type) {
          case 'rain':
            p.y += p.speed;
            if (p.y > canvas.height) {
              p.y = -p.length;
              p.x = Math.random() * canvas.width;
            }
            // Draw rain
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y + p.length);
            ctx.strokeStyle = `rgba(174, 194, 224, ${p.opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            break;
            
          case 'snow':
            p.y += p.speed;
            p.x += Math.sin(p.swing) * 0.5;
            p.swing += p.swingSpeed;
            if (p.y > canvas.height) {
              p.y = -5;
              p.x = Math.random() * canvas.width;
            }
            // Draw snow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
            break;
            
          case 'cloud':
            p.x += p.speed;
            if (p.x > canvas.width + p.size) {
              p.x = -p.size;
              p.y = Math.random() * 200;
            }
            // Draw cloud
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
            break;
            
          case 'sunbeam':
            p.angle += 0.01;
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
              p.x = Math.random() * canvas.width;
              p.y = Math.random() * (canvas.height * 0.7);
            }
            
            // Draw sunbeam
            const gradient = ctx.createRadialGradient(
              p.x, p.y, 0,
              p.x, p.y, p.size * 5
            );
            gradient.addColorStop(0, `rgba(255, 255, 200, ${p.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            break;
            
          case 'breeze':
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
              p.x = Math.random() * canvas.width;
              p.y = Math.random() * canvas.height;
              p.angle = Math.random() * Math.PI * 2;
            }
            
            // Draw breeze
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
            break;
        }
      });
      
      animationFrameId.current = requestAnimationFrame(drawParticles);
    };
    
    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start animation
    animationFrameId.current = requestAnimationFrame(drawParticles);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [weatherType]);

  return <canvas ref={canvasRef} className="weather-particles" />;
};

export default WeatherParticles;

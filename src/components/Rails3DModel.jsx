import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import './RailsAnimation.css'; // We will create this for specific flat styling

export default function RailsAnimation() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initial entrance animation
    anime({
      targets: '.anim-line',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      delay: function(el, i) { return i * 150 },
      direction: 'alternate',
      loop: false
    });

    anime({
      targets: '.anim-node',
      scale: [0, 1],
      opacity: [0, 1],
      easing: 'easeOutElastic(1, .5)',
      duration: 1500,
      delay: anime.stagger(200, {start: 500})
    });

    // Continuous data flow animation
    anime({
      targets: '.data-packet',
      offsetDistance: ['0%', '100%'],
      easing: 'linear',
      duration: 3000,
      loop: true,
      delay: anime.stagger(500)
    });

    // Code snippets floating slowly
    anime({
      targets: '.code-snippet',
      translateY: [-10, 10],
      opacity: [0.3, 0.8],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 4000,
      delay: anime.stagger(1000)
    });

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) {
        const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
        setScrollProgress(progress);
        
        // Dynamically "crack" and expand the diagram based on scroll
        // The further you scroll, the more the nodes separate and rotate
        anime({
          targets: '.anim-group',
          translateX: (el) => {
            const dirX = parseFloat(el.getAttribute('data-dir-x'));
            return dirX * progress * 150; // Expands outward
          },
          translateY: (el) => {
            const dirY = parseFloat(el.getAttribute('data-dir-y'));
            return dirY * progress * 150;
          },
          rotate: (el) => {
            return progress * 15; // Slight tilt
          },
          duration: 100,
          easing: 'linear'
        });
        
        anime({
          targets: '.core-node',
          scale: 1 + progress * 0.5,
          rotate: progress * 90,
          duration: 100,
          easing: 'linear'
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="rails-animation-container" ref={containerRef}>
      <svg ref={svgRef} className="rails-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b8f050" />
            <stop offset="100%" stopColor="#50d0f0" />
          </linearGradient>

          {/* Paths for data packets to follow */}
          <path id="path-front" d="M500,500 L200,300" fill="none" />
          <path id="path-back" d="M500,500 L800,300" fill="none" />
          <path id="path-db" d="M500,500 L500,800" fill="none" />
          <path id="path-infra" d="M500,500 L200,800" fill="none" />
        </defs>

        {/* Connections (Lines) */}
        <g className="anim-group" data-dir-x="-1" data-dir-y="-1">
          <line x1="500" y1="500" x2="200" y2="300" className="anim-line" stroke="url(#lineGrad)" strokeWidth="3" opacity="0.5" />
        </g>
        <g className="anim-group" data-dir-x="1" data-dir-y="-1">
          <line x1="500" y1="500" x2="800" y2="300" className="anim-line" stroke="url(#lineGrad)" strokeWidth="3" opacity="0.5" />
        </g>
        <g className="anim-group" data-dir-x="0" data-dir-y="1">
          <line x1="500" y1="500" x2="500" y2="800" className="anim-line" stroke="url(#lineGrad)" strokeWidth="3" opacity="0.5" />
        </g>
        <g className="anim-group" data-dir-x="-1" data-dir-y="1">
          <line x1="500" y1="500" x2="200" y2="800" className="anim-line" stroke="url(#lineGrad)" strokeWidth="3" opacity="0.5" />
        </g>

        {/* Data Packets flowing on paths */}
        <circle className="data-packet" r="4" fill="#fff" style={{ offsetPath: 'url(#path-front)' }} />
        <circle className="data-packet" r="4" fill="#fff" style={{ offsetPath: 'url(#path-back)' }} />
        <circle className="data-packet" r="4" fill="#fff" style={{ offsetPath: 'url(#path-db)' }} />
        <circle className="data-packet" r="4" fill="#fff" style={{ offsetPath: 'url(#path-infra)' }} />

        {/* Central Core */}
        <g className="core-node" transform="translate(500, 500)">
          <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="#0a0a0a" stroke="#ff2a2a" strokeWidth="4" filter="url(#glow)" />
          <circle r="15" fill="#ff2a2a" opacity="0.8" />
          <text x="0" y="60" className="svg-label" textAnchor="middle">RAILS CORE</text>
        </g>

        {/* Sub Nodes */}
        <g className="anim-group" data-dir-x="-1" data-dir-y="-1">
          <g className="anim-node" transform="translate(200, 300)">
            <rect x="-40" y="-30" width="80" height="60" rx="8" fill="#111" stroke="#b8f050" strokeWidth="2" filter="url(#glow)"/>
            <text x="0" y="5" className="svg-label" textAnchor="middle" fill="#b8f050">REACT UI</text>
            <text x="0" y="50" className="code-snippet" textAnchor="middle">&lt;Component/&gt;</text>
          </g>
        </g>

        <g className="anim-group" data-dir-x="1" data-dir-y="-1">
          <g className="anim-node" transform="translate(800, 300)">
            <circle r="35" fill="#111" stroke="#f0b040" strokeWidth="2" filter="url(#glow)"/>
            <text x="0" y="5" className="svg-label" textAnchor="middle" fill="#f0b040">API BACKEND</text>
            <text x="0" y="60" className="code-snippet" textAnchor="middle">fetch('/api/v1')</text>
          </g>
        </g>

        <g className="anim-group" data-dir-x="0" data-dir-y="1">
          <g className="anim-node" transform="translate(500, 800)">
            <path d="M-30,-20 Q0,-30 30,-20 L30,20 Q0,30 -30,20 Z" fill="#111" stroke="#f05858" strokeWidth="2" filter="url(#glow)"/>
            <text x="0" y="5" className="svg-label" textAnchor="middle" fill="#f05858">DATABASE</text>
            <text x="50" y="20" className="code-snippet" textAnchor="start">SELECT * FROM users;</text>
          </g>
        </g>

        <g className="anim-group" data-dir-x="-1" data-dir-y="1">
          <g className="anim-node" transform="translate(200, 800)">
            <polygon points="0,-35 30,0 0,35 -30,0" fill="#111" stroke="#a060f0" strokeWidth="2" filter="url(#glow)"/>
            <text x="0" y="5" className="svg-label" textAnchor="middle" fill="#a060f0">DEVOPS</text>
            <text x="0" y="60" className="code-snippet" textAnchor="middle">docker-compose up</text>
          </g>
        </g>

        {/* Abstract design elements (tech background details) */}
        <g opacity="0.1" className="anim-group" data-dir-x="1" data-dir-y="0">
          <circle cx="800" cy="700" r="100" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="5,15" />
          <circle cx="800" cy="700" r="80" fill="none" stroke="#fff" strokeWidth="1" />
          <text x="800" y="705" className="svg-label" textAnchor="middle">SYSTEM ARCH</text>
        </g>

      </svg>
    </div>
  );
}

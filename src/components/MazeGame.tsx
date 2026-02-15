import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { X, RefreshCcw, Trophy, Frown } from 'lucide-react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP Plugin
gsap.registerPlugin(MotionPathPlugin);

interface MazeGameProps {
  onExit: () => void;
}

const MazeGame = ({ onExit }: MazeGameProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const arrowRef = useRef<SVGGElement>(null);
  const bowRef = useRef<SVGGElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const arrowsContainerRef = useRef<SVGGElement>(null);

  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [gameResult, setGameResult] = useState<'playing' | 'won' | 'lost'>('playing');

  // Game state refs to avoid closure staleness in event listeners
  const gameState = useRef({
    isAiming: false,
    randomAngle: 0,
    pivot: { x: 100, y: 250 },
    target: { x: 900, y: 249.5 },
    // Target intersection line segment
    lineSegment: { x1: 875, y1: 280, x2: 925, y2: 220 }
  });

  // --- Audio System ---
  const playSound = (type: 'shoot' | 'hit' | 'bullseye' | 'miss' | 'win' | 'lose') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'shoot') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'hit') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.1);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'bullseye') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.exponentialRampToValueAtTime(2000, now + 0.5); 
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'miss') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'win') {
        // Simple Fanfare
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.5);
        });
      } else if (type === 'lose') {
        // Sad Tromboneish
        const notes = [300, 250, 200];
        notes.forEach((freq, i) => {
             const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + i * 0.4);
            osc.frequency.linearRampToValueAtTime(freq - 20, now + i * 0.4 + 0.4);
            gain.gain.setValueAtTime(0.2, now + i * 0.4);
            gain.gain.linearRampToValueAtTime(0.01, now + i * 0.4 + 0.4);
            osc.start(now + i * 0.4);
            osc.stop(now + i * 0.4 + 0.4);
        });
      }
    } catch (e) {
      // Ignore audio errors
    }
  };

  useEffect(() => {
    // Initial Setup
    const arrow = arrowRef.current;
    if (arrow) {
        gsap.set(arrow, { opacity: 0 });
    }
    
    // Animate Target (Moving Difficulty: Up and Down)
    const targetEl = document.getElementById("target");
    if (targetEl) {
        // Start from center, go up then down
        gsap.fromTo(targetEl, 
            { y: -100 }, 
            {
                y: 100, 
                yoyo: true,
                repeat: -1,
                duration: 2.5,
                ease: "sine.inOut"
            }
        );
    }

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      if (!gameActive || gameResult !== 'playing') return;
      
      // Ignore clicks on buttons (Exit, Reset, Play Again)
      if ((e.target as HTMLElement).closest('button')) return;

      // Start aiming
      draw(e);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchstart", onMouseDown);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchstart", onMouseDown);
      window.removeEventListener("mousemove", aim);
      window.removeEventListener("touchmove", aim);
      window.removeEventListener("mouseup", loose);
      window.removeEventListener("touchend", loose);
      gsap.killTweensOf(targetEl); // Cleanup target animation
    };
  }, [gameActive, gameResult]);

  // Game Loop Logic
  useEffect(() => {
    if (gameResult !== 'playing') return;

    if (score >= 200) {
        setGameResult('won');
        playSound('win');
    } else if (shots >= 5) {
        setGameResult('lost');
        playSound('lose');
    }
  }, [score, shots, gameResult]);

  const getMouseSVG = (e: MouseEvent | TouchEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const point = svgRef.current.createSVGPoint();
    
    // Handle both mouse and touch events
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    gameState.current.isAiming = true;
    gameState.current.randomAngle = (Math.random() * Math.PI * 0.03) - 0.015;
    
    gsap.to(arrowRef.current, { duration: 0.3, opacity: 1 });
    
    window.addEventListener("mousemove", aim);
    window.addEventListener("touchmove", aim);
    window.addEventListener("mouseup", loose);
    window.addEventListener("touchend", loose);
    
    aim(e);
  };

  const aim = (e: MouseEvent | TouchEvent) => {
    if (!svgRef.current) return;
    const point = getMouseSVG(e);
    const { pivot, randomAngle } = gameState.current;

    point.x = Math.min(point.x, pivot.x - 7);
    point.y = Math.max(point.y, pivot.y + 7);
    
    const dx = point.x - pivot.x;
    const dy = point.y - pivot.y;
    
    const angle = Math.atan2(dy, dx) + randomAngle;
    const bowAngle = angle - Math.PI;
    const distance = Math.min(Math.sqrt((dx * dx) + (dy * dy)), 50);
    const scale = Math.min(Math.max(distance / 30, 1), 2);

    // Animate Bow
    gsap.to(bowRef.current, {
      duration: 0.3,
      scaleX: scale,
      rotation: bowAngle + "rad",
      transformOrigin: "right center"
    });

    // Animate Arrow on Bow
    const arrowX = Math.min(pivot.x - ((1 / scale) * distance), 88);
    gsap.to(arrowRef.current, {
      duration: 0.3,
      rotation: bowAngle + "rad",
      svgOrigin: "100 250"
    });
    
    if (arrowRef.current) {
        // Find the 'use' element or group inside
        const useEl = arrowRef.current.querySelector('use');
        if(useEl) gsap.to(useEl, { duration: 0.3, x: -distance });
    }

    // Animate Bowstring
    gsap.to("#bow-polyline", {
      duration: 0.3,
      attr: {
        points: `88,200 ${Math.min(pivot.x - ((1 / scale) * distance), 88)},250 88,300`
      }
    });

    // Animate Trajectory Line (Arc)
    const radius = distance * 9;
    const offset = {
      x: (Math.cos(bowAngle) * radius),
      y: (Math.sin(bowAngle) * radius)
    };
    const arcWidth = offset.x * 3;

    gsap.to(arcRef.current, {
      duration: 0.3,
      attr: {
        d: `M100,250c${offset.x},${offset.y},${arcWidth - offset.x},${offset.y + 50},${arcWidth},50`
      },
      autoAlpha: distance / 60
    });
  };

  const loose = () => {
    window.removeEventListener("mousemove", aim);
    window.removeEventListener("touchmove", aim);
    window.removeEventListener("mouseup", loose);
    window.removeEventListener("touchend", loose);

    gameState.current.isAiming = false;

    // Reset Bow
    gsap.to(bowRef.current, {
      duration: 0.4,
      scaleX: 1,
      transformOrigin: "right center",
      ease: "elastic.out(1, 0.3)"
    });

    gsap.to("#bow-polyline", {
      duration: 0.4,
      attr: { points: "88,200 88,250 88,300" },
      ease: "elastic.out(1, 0.3)"
    });

    // Fire sound
    playSound('shoot');

    // Create and Fire New Arrow
    fireArrow();
  };

  const fireArrow = () => {
    if (!arrowsContainerRef.current || !arcRef.current) return;

    const newArrow = document.createElementNS("http://www.w3.org/2000/svg", "use");
    newArrow.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "#arrow-def");
    newArrow.setAttribute("class", "flying-arrow pointer-events-none"); 
    arrowsContainerRef.current.appendChild(newArrow);

    // Get path data from the arc
    gsap.to(newArrow, {
      duration: 0.5,
      motionPath: {
        path: "#arc",
        align: "#arc",
        autoRotate: true,
        alignOrigin: [0.5, 0.5], 
      },
      ease: "none",
      onUpdate: function() {
        hitTest(this.targets()[0], this);
      },
      onComplete: function() {
        onMiss(this.targets()[0]);
      }
    });

    // Hide aiming guide
    gsap.to(arcRef.current, { duration: 0.3, opacity: 0 });
    // Hide arrow on bow
    gsap.to(arrowRef.current, { duration: 0, opacity: 0 });

    setShots(s => s + 1);
  };

  const hitTest = (arrow: SVGElement, tween: gsap.core.Tween) => {
    if (!arrow || !svgRef.current) return;
    
    // Get arrow center in client coordinates
    const arrowRect = arrow.getBoundingClientRect();
    const clientX = arrowRect.left + arrowRect.width / 2;
    const clientY = arrowRect.top + arrowRect.height / 2;

    // Convert to SVG coordinates
    const point = svgRef.current.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    
    // Transform point to SVG coordinate system
    const svgPoint = point.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    
    // Adjusted coordinates (Approximate Tip)
    const tipX = svgPoint.x + 28;
    const tipY = svgPoint.y + 5; 
    
    // Target Center logic requires accounting for Target movement!
    // We'll get the target's current position from GSAP or DOM
    let targetY = 250; // default
    const targetEl = document.getElementById("target");
    if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const targetCenterPoint = svgRef.current.createSVGPoint();
        targetCenterPoint.x = targetRect.left + targetRect.width / 2;
        targetCenterPoint.y = targetRect.top + targetRect.height / 2;
        const svgTargetCenter = targetCenterPoint.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
        targetY = svgTargetCenter.y;
    }
    
    // Target X is mostly static at 900
    // Check intersection with the dynamic target Y
    if (tipX > 880 && tipX < 940 && tipY > (targetY - 50) && tipY < (targetY + 50)) {
        const dist = Math.hypot(tipX - 900, tipY - targetY);
        
        // Hit radius (Generous)
        if (dist < 50) {
             tween.pause();
             
             // Bullseye radius (Inner Red/White Circle)
             // We'll be generous with 25px
             const isBullseye = dist < 25;
             
             const selector = isBullseye ? ".bullseye" : ".hit";
             showMessage(selector);
             
             // Update Score immediately for hit
             setScore(s => s + (isBullseye ? 50 : 10));
             playSound(isBullseye ? 'bullseye' : 'hit');
             
             // Cleanup arrow after a delay
             gsap.to(arrow, { 
                 duration: 0.5, 
                 delay: 2, 
                 opacity: 0, 
                 onComplete: () => {
                    if(arrow.parentNode) arrow.parentNode.removeChild(arrow);
                 } 
            });
        }
    }
  };

  const onMiss = (arrow: SVGElement) => {
    showMessage(".miss");
    playSound('miss');
    // Fade out arrow after a while
    gsap.to(arrow, { 
        duration: 0.5, 
        delay: 0.5, 
        opacity: 0, 
        onComplete: () => {
            if(arrow.parentNode) arrow.parentNode.removeChild(arrow);
        }
    });
  };

  const showMessage = (selector: string) => {
    // Hide others
    gsap.set([".miss", ".bullseye", ".hit"], { autoAlpha: 0 });
    
    const el = document.querySelector(selector);
    if (el) {
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(`${selector} path`, 
            { rotation: -5, scale: 0, transformOrigin: "center" },
            { duration: 0.5, scale: 1, ease: "back.out(1.7)", stagger: 0.05 }
        );
        
        gsap.to(`${selector} path`, {
            duration: 0.3,
            delay: 1.5,
            rotation: 20,
            scale: 0,
            ease: "back.in(1.7)",
            stagger: 0.03
        });
    }
  };

  const resetGame = () => {
    setScore(0);
    setShots(0);
    setGameResult('playing');
    if(arrowsContainerRef.current) arrowsContainerRef.current.innerHTML = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overscroll-none touch-none">
      
      {/* HEADER ACTIONS */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
         <Button variant="ghost" size="icon" onClick={resetGame} title="Reset">
           <RefreshCcw className="h-5 w-5" />
         </Button>
         <Button variant="glow" size="icon" onClick={onExit} title="Exit">
           <X className="h-5 w-5" />
         </Button>
      </div>

       {/* GAME HUD */}
       <div className="absolute top-4 left-4 z-40 bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 shadow-sm">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">ARCHERY</h2>
        <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold font-mono text-primary flex items-center gap-2">
                {score} <span className="text-xs text-muted-foreground font-normal">pts</span>
            </div>
            <div className="text-sm font-mono text-muted-foreground">
                SHOT {shots} / 5
            </div>
        </div>
      </div>
      
      {/* INSTRUCTIONS */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none z-40 px-4">
        <div className="inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
            <p className="text-sm font-medium flex items-center gap-2">
                <span>🖱️</span> Drag, Pull & Release to Shoot
            </p>
            <p className="text-xs text-muted-foreground mt-1">
                Goal: Score 200 pts in 5 shots
            </p>
        </div>
      </div>

      {/* GAME OVER OVERLAY */}
      {gameResult !== 'playing' && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-background border border-border p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 max-w-sm text-center">
                {gameResult === 'won' ? (
                    <Trophy className="w-16 h-16 text-yellow-500 mb-2 animate-bounce" />
                ) : (
                    <Frown className="w-16 h-16 text-muted-foreground mb-2" />
                )}
                
                <h3 className="text-3xl font-bold font-mono">
                    {gameResult === 'won' ? 'YOU WIN!' : 'GAME OVER'}
                </h3>
                
                <p className="text-muted-foreground">
                    You scored <span className="text-primary font-bold">{score}</span> points.
                    {gameResult === 'won' ? ' Amazing shooting!' : ' Try again to hit 200!'}
                </p>
                
                <Button 
                    size="lg" 
                    className="w-full mt-4 font-bold" 
                    onClick={resetGame}
                >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Play Again
                </Button>
            </div>
        </div>
      )}

      {/* CANVAS (Full Screen) */}
      <div className="absolute inset-0 z-0 w-full h-full bg-background transition-colors duration-500">
        <svg 
            ref={svgRef}
            id="game" 
            viewBox="0 0 1000 400" 
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full max-h-screen"
            style={{ cursor: 'crosshair', userSelect: 'none' }}
        >
            <linearGradient id="ArcGradient">
                <stop offset="0" stopColor="currentColor" className="text-foreground" stopOpacity=".2" />
                <stop offset="50%" stopColor="currentColor" className="text-foreground" stopOpacity="0" />
            </linearGradient>

            <path 
                ref={arcRef}
                id="arc" 
                fill="none" 
                stroke="url(#ArcGradient)" 
                strokeWidth="4" 
                d="M100,250c250-400,550-400,800,0" 
                pointerEvents="none" 
                className="opacity-0"
            />

            <defs>
                <g id="arrow-def">
                    <line x2="60" fill="none" stroke="currentColor" className="text-gray-500 dark:text-gray-400" strokeWidth="2" />
                    <polygon fill="currentColor" className="text-gray-500 dark:text-gray-400" points="64 0 58 2 56 0 58 -2" />
                    <polygon fill="currentColor" className="text-primary" points="2 -3 -4 -3 -1 0 -4 3 2 3 5 0" />
                </g>
            </defs>

            <g id="target">
                <path fill="#FFF" className="fill-white dark:fill-gray-900" d="M924.2,274.2c-21.5,21.5-45.9,19.9-52,3.2c-4.4-12.1,2.4-29.2,14.2-41c11.8-11.8,29-18.6,41-14.2 C944.1,228.3,945.7,252.8,924.2,274.2z" />
                <path fill="#F4531C" className="fill-red-500" d="M915.8,265.8c-14.1,14.1-30.8,14.6-36,4.1c-4.1-8.3,0.5-21.3,9.7-30.5s22.2-13.8,30.5-9.7 C930.4,235,929.9,251.7,915.8,265.8z" />
                <path fill="#FFF" className="fill-white dark:fill-gray-900" d="M908.9,258.9c-8,8-17.9,9.2-21.6,3.5c-3.2-4.9-0.5-13.4,5.6-19.5c6.1-6.1,14.6-8.8,19.5-5.6 C918.1,241,916.9,250.9,908.9,258.9z" />
                <path fill="#F4531C" className="fill-red-500" d="M903.2,253.2c-2.9,2.9-6.7,3.6-8.3,1.7c-1.5-1.8-0.6-5.4,2-8c2.6-2.6,6.2-3.6,8-2 C906.8,246.5,906.1,250.2,903.2,253.2z" />
            </g>

            <g ref={bowRef} id="bow" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" pointerEvents="none">
                <polyline id="bow-polyline" fill="none" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeLinecap="round" points="88,200 88,250 88,300" />
                <path fill="none" stroke="currentColor" className="text-primary" strokeWidth="3" strokeLinecap="round" d="M88,300 c0-10.1,12-25.1,12-50s-12-39.9-12-50" />
            </g>

            <g ref={arrowRef} className="arrow-angle pointer-events-none">
                <use x="100" y="250" href="#arrow-def" />
            </g>
            
            <g ref={arrowsContainerRef} className="arrows pointer-events-none" />

            {/* MESSAGES */}
            <g className="miss opacity-0 text-gray-500 dark:text-gray-400 pointer-events-none" fill="currentColor" transform="translate(0, 100)">
        		<path d="M358 194L363 118 386 120 400 153 416 121 440 119 446 203 419 212 416 163 401 180 380 160 381 204"/>
        		<path d="M450 120L458 200 475 192 474 121"/>
        		<path d="M537 118L487 118 485 160 515 162 509 177 482 171 482 193 529 199 538 148 501 146 508 133 537 137"/>
        		<path d="M540 202L543 178 570 186 569 168 544 167 546 122 590 116 586 142 561 140 560 152 586 153 586 205"/>
        		<path d="M595,215l5-23l31,0l-5,29L595,215z M627,176l13-70l-41-0l-0,70L627,176z"/>
            </g>

            <g className="bullseye opacity-0 text-red-500 pointer-events-none" fill="currentColor">
        		<path d="M322,159l15-21l-27-13l-32,13l15,71l41-14l7-32L322,159z M292,142h20l3,8l-16,8 L292,142z M321,182l-18,9l-4-18l23-2V182z"/>
        		<path d="M340 131L359 125 362 169 381 167 386 123 405 129 392 183 351 186z"/>
        		<path d="M413 119L402 188 450 196 454 175 422 175 438 120z"/>
        		<path d="M432 167L454 169 466 154 451 151 478 115 453 113z"/>
        		<path d="M524 109L492 112 466 148 487 155 491 172 464 167 463 184 502 191 513 143 487 141 496 125 517 126z"/>
        		<path d="M537 114L512 189 558 199 566 174 533 175 539 162 553 164 558 150 543 145 547 134 566 148 575 124z"/>
        		<path d="M577 118L587 158 570 198 587 204 626 118 606 118 598 141 590 112z"/>
        		<path d="M635 122L599 198 643 207 649 188 624 188 630 170 639 178 645 162 637 158 649 143 662 151 670 134z"/>
        		<path d="M649,220l4-21l28,4l-6,25L649,220z M681,191l40-79l-35-8L659,184L681,191z"/>
            </g>

            <g className="hit opacity-0 text-yellow-500 pointer-events-none" fill="currentColor" transform="translate(180, -80) rotate(12)">
        		<path d="M383 114L385 195 407 191 406 160 422 155 418 191 436 189 444 112 423 119 422 141 407 146 400 113"/>
        		<path d="M449 185L453 113 477 112 464 186"/>
        		<path d="M486 113L484 130 506 130 481 188 506 187 520 131 540 135 545 119"/>
        		<path d="M526,195l5-20l22,5l-9,16L526,195z M558,164l32-44l-35-9l-19,51L558,164z"/>
            </g>
        </svg>
      </div>
    </div>
  );
};

export default MazeGame;
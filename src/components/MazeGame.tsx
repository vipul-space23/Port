import { useEffect, useRef, useCallback, useState } from 'react';
import { Button } from './ui/button';
import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Hammer, Move } from 'lucide-react';

interface MazeGameProps {
  onExit: () => void;
}

// --- MD5 implementation (Unchanged) ---
const md5 = (string: string): string => {
  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }

  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  function md51(s: string) {
    const n = s.length;
    const state = [1732584193, -271733879, -1732584194, 271733878];
    let i;
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++)
      tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) tail[i] = 0;
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }

  function md5blk(s: string) {
    const md5blks: number[] = [];
    for (let i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i)
        + (s.charCodeAt(i + 1) << 8)
        + (s.charCodeAt(i + 2) << 16)
        + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }

  const hex_chr = '0123456789abcdef'.split('');

  function rhex(n: number) {
    let s = '';
    for (let j = 0; j < 4; j++)
      s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
    return s;
  }

  function hex(x: number[]) {
    for (let i = 0; i < x.length; i++)
      x[i] = rhex(x[i]) as unknown as number;
    return (x as unknown as string[]).join('');
  }

  function add32(a: number, b: number) {
    return (a + b) & 0xFFFFFFFF;
  }

  return hex(md51(string));
};
// -------------------------------------

// Array helper functions
const arrayEquals = (a: number[], b: number[]): boolean => {
  if (!b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const arrayContains = (arr: number[][], thing: number[]): boolean => {
  return arr.some(item => arrayEquals(item, thing));
};

const arrayIndexOf = (arr: number[][], thing: number[]): number => {
  for (let i = 0; i < arr.length; i++) {
    if (arrayEquals(arr[i], thing)) return i;
  }
  return -1;
};

// Types
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const MazeGame = ({ onExit }: MazeGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track "Edit Mode" for mobile controls (WASD vs Arrows)
  const [isEditMode, setIsEditMode] = useState(false);

  const gameStateRef = useRef({
    px: 0,
    py: 0,
    ox: 0,
    oy: 0,
    wallCount: 0,
    invertedH: [] as number[][],
    invertedV: [] as number[][],
  });

  const w = 500;
  const h = 500;
  const ObstructionSeed = "Witty!";
  const ObstructionPercentage = 40;

  const poll = useCallback((x: number, y: number, seed: string = "Witty!", percentage: number = 40): boolean => {
    return (~"0123456789abcdef".substring(0, 16 * percentage / 100).indexOf(md5(x + " " + y + " " + seed)[0])) !== 0;
  }, []);

  // --- CORE GAME LOGIC (Extracted from keyboard handler) ---
  const processInput = useCallback((dir: Direction, isModification: boolean) => {
    const state = gameStateRef.current;
    
    const moveUp = !isModification && dir === 'UP';
    const moveLeft = !isModification && dir === 'LEFT';
    const moveDown = !isModification && dir === 'DOWN';
    const moveRight = !isModification && dir === 'RIGHT';

    const invertUp = isModification && dir === 'UP';
    const invertDown = isModification && dir === 'DOWN';
    const invertLeft = isModification && dir === 'LEFT';
    const invertRight = isModification && dir === 'RIGHT';

    let IC: number[] = [];
    let HAxis = false;

    // --- Wall Modification Logic ---
    if (invertUp) IC = [h / 2 - 15 - 30 * state.py, w / 2 - 15 - 30 * state.px];
    if (invertDown) IC = [h / 2 + 15 - 30 * state.py, w / 2 - 15 - 30 * state.px];
    if (invertLeft) IC = [w / 2 - 15 - 30 * state.px, h / 2 + 15 - 30 * state.py];
    if (invertRight) IC = [w / 2 + 15 - 30 * state.px, h / 2 + 15 - 30 * state.py];

    HAxis = invertUp || invertDown;
    const direction = true;

    if (IC.length > 0) {
      let Wall: boolean;
      let BWall: boolean;

      if (HAxis) {
        Wall = poll(IC[0], IC[1], ObstructionSeed, ObstructionPercentage) !== arrayContains(state.invertedH, IC);
        BWall = (poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && direction) && !arrayContains(state.invertedH, IC);

        if (Wall || state.wallCount > 0) {
          if (arrayContains(state.invertedH, IC)) {
            state.invertedH.splice(arrayIndexOf(state.invertedH, IC), 1);
          } else if (!(BWall && !Wall)) {
            state.invertedH.push(IC);
          }
        }
      } else {
        Wall = poll(IC[0], IC[1], ObstructionSeed, ObstructionPercentage) !== arrayContains(state.invertedV, IC);
        BWall = (poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && direction) && !arrayContains(state.invertedV, IC);

        if (Wall || state.wallCount > 0) {
          if (arrayContains(state.invertedV, IC)) {
            state.invertedV.splice(arrayIndexOf(state.invertedV, IC), 1);
          } else if (!(BWall && !Wall)) {
            state.invertedV.push(IC);
          }
        }
      }

      if (Wall) {
        state.wallCount++;
      } else if (state.wallCount && !(BWall && !Wall)) {
        state.wallCount--;
      }
    }

    // --- Movement Logic ---
    IC = [];
    if (moveUp) IC = [h / 2 - 15 - 30 * state.py, w / 2 - 15 - 30 * state.px];
    else if (moveDown) IC = [h / 2 + 15 - 30 * state.py, w / 2 - 15 - 30 * state.px];
    else if (moveLeft) IC = [w / 2 - 15 - 30 * state.px, h / 2 + 15 - 30 * state.py];
    else if (moveRight) IC = [w / 2 + 15 - 30 * state.px, h / 2 + 15 - 30 * state.py];

    const movementDirection = (moveRight || moveDown) ? !poll(IC[0], IC[1], ObstructionSeed + "wd", 50) : poll(IC[0], IC[1], ObstructionSeed + "wd", 50);
    HAxis = moveUp || moveDown;

    let Wall = false;
    if (IC.length > 0) {
      if (HAxis) {
        Wall = poll(IC[0], IC[1], ObstructionSeed, ObstructionPercentage) !== arrayContains(state.invertedH, IC);
        Wall = Wall || ((poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && movementDirection) && !arrayContains(state.invertedH, IC));
      } else {
        Wall = poll(IC[0], IC[1], ObstructionSeed, ObstructionPercentage) !== arrayContains(state.invertedV, IC);
        Wall = Wall || ((poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && movementDirection) && !arrayContains(state.invertedV, IC));
      }
    }

    if (moveUp && !Wall) {
      state.py += 1;
      state.oy = -30;
    } else if (moveLeft && !Wall) {
      state.px += 1;
      state.ox = -30;
    } else if (moveDown && !Wall) {
      state.py -= 1;
      state.oy = 30;
    } else if (moveRight && !Wall) {
      state.px -= 1;
      state.ox = 30;
    }
  }, [poll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const state = gameStateRef.current;

    const draw = () => {
      // Black background instead of purple
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      // Draw player
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#00ffff';
      ctx.fill();

      // Draw wall count indicator
      for (let i = 0; i < state.wallCount; i++) {
        ctx.beginPath();
        ctx.moveTo(10 + 10 * i, h - 10);
        ctx.lineTo(10 + 10 * i, h - 20);
        ctx.strokeStyle = '#00ffff';
        ctx.stroke();
      }

      // Draw maze walls
      for (let x = -(w % 30) - 15; x <= w; x += 30) {
        for (let y = -(h % 30) - 15; y <= h; y += 30) {
          const alpha = Math.max(0, (255 - (Math.abs(x - w / 2) + Math.abs(y - h / 2))) / 255);

          // Vertical walls
          if (poll(x - 30 * state.px, y - 30 * state.py, ObstructionSeed, ObstructionPercentage) !== arrayContains(state.invertedV, [x - 30 * state.px, y - 30 * state.py])) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + state.ox, y + state.oy);
            ctx.lineTo(x + state.ox, y - 27 + state.oy);
            ctx.stroke();
          } else if (poll(x - 30 * state.px, y - 30 * state.py, ObstructionSeed + "w", ObstructionPercentage / 4) && !arrayContains(state.invertedV, [x - 30 * state.px, y - 30 * state.py])) {
            const d = -1 + 2 * (poll(x - 30 * state.px, y - 30 * state.py, ObstructionSeed + "wd", 50) ? 1 : 0);
            ctx.strokeStyle = `rgba(0, 180, 255, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + state.ox, y + state.oy);
            ctx.lineTo(x + state.ox + 5 * d, y - 27 / 2 + state.oy);
            ctx.lineTo(x + state.ox, y - 27 + state.oy);
            ctx.stroke();
          }

          // Horizontal walls
          if (poll(y - 30 * state.py, x - 30 * state.px, ObstructionSeed, ObstructionPercentage) !== arrayContains(state.invertedH, [y - 30 * state.py, x - 30 * state.px])) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + state.ox, y + state.oy);
            ctx.lineTo(x + state.ox + 28, y + state.oy);
            ctx.stroke();
          } else if (poll(y - 30 * state.py, x - 30 * state.px, ObstructionSeed + "w", ObstructionPercentage / 4) && !arrayContains(state.invertedH, [y - 30 * state.py, x - 30 * state.px])) {
            const d = -1 + 2 * (poll(y - 30 * state.py, x - 30 * state.px, ObstructionSeed + "wd", 50) ? 1 : 0);
            ctx.strokeStyle = `rgba(0, 180, 255, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + state.ox, y + state.oy);
            ctx.lineTo(x + state.ox + 28 / 2, y + state.oy + 5 * d);
            ctx.lineTo(x + state.ox + 28, y + state.oy);
            ctx.stroke();
          }
        }
      }

      // Animate offset
      if (state.oy !== 0) {
        state.oy += state.oy > 0 ? -6 : 6;
        if (Math.abs(state.oy) < 6) state.oy = 0;
      } else if (state.ox !== 0) {
        state.ox += state.ox > 0 ? -6 : 6;
        if (Math.abs(state.ox) < 6) state.ox = 0;
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.keyCode === 38) processInput('UP', false);
      else if (e.keyCode === 40) processInput('DOWN', false);
      else if (e.keyCode === 37) processInput('LEFT', false);
      else if (e.keyCode === 39) processInput('RIGHT', false);
      else if (e.key === 'w' || e.key === 'W') processInput('UP', true);
      else if (e.key === 's' || e.key === 'S') processInput('DOWN', true);
      else if (e.key === 'a' || e.key === 'A') processInput('LEFT', true);
      else if (e.key === 'd' || e.key === 'D') processInput('RIGHT', true);
    };

    window.addEventListener('keydown', handleKeyDown);
    draw();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, [poll, processInput]);

  // Touch handlers
  const handleTouch = (dir: Direction) => {
    processInput(dir, isEditMode);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <Button variant="glow" size="icon" onClick={onExit}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="text-center mb-4">
        <h2 className="font-mono text-2xl text-primary text-glow mb-1">ZEN MODE</h2>
        <p className="text-muted-foreground font-mono text-xs hidden sm:block">
          Arrow keys to move |ESC TO  EXIT 
        </p>
       
      </div>
      
      {/* Canvas Container with Max Width and Aspect Ratio */}
      <div className="border border-primary/30 rounded-lg overflow-hidden box-glow w-full max-w-[500px] aspect-square relative">
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={500}
          className="block w-full h-full"
        />
      </div>

      {/* Touch Controls (Visible on mobile/small screens) */}
      <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-[300px]">
        
        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-2">
           <span className={`text-xs font-mono ${!isEditMode ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}>MOVE</span>
           <button 
             onClick={() => setIsEditMode(!isEditMode)}
             className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isEditMode ? 'bg-orange-500' : 'bg-cyan-500'}`}
           >
             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isEditMode ? 'left-7' : 'left-1'}`} />
           </button>
           <span className={`text-xs font-mono ${isEditMode ? 'text-orange-400 font-bold' : 'text-gray-500'}`}>BUILD</span>
        </div>

        {/* D-Pad */}
        <div className="grid grid-cols-3 gap-2">
          <div />
          <Button 
            variant="outline" 
            size="icon" 
            className={`h-14 w-14 rounded-full ${isEditMode ? 'border-orange-500/50 hover:bg-orange-500/20 text-orange-400' : 'border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400'}`}
            onPointerDown={(e) => { e.preventDefault(); handleTouch('UP'); }}
          >
             {isEditMode ? <Hammer className="h-5 w-5 rotate-0" /> : <ArrowUp className="h-6 w-6" />}
          </Button>
          <div />

          <Button 
            variant="outline" 
            size="icon" 
            className={`h-14 w-14 rounded-full ${isEditMode ? 'border-orange-500/50 hover:bg-orange-500/20 text-orange-400' : 'border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400'}`}
            onPointerDown={(e) => { e.preventDefault(); handleTouch('LEFT'); }}
          >
             {isEditMode ? <Hammer className="h-5 w-5 -rotate-90" /> : <ArrowLeft className="h-6 w-6" />}
          </Button>
          
          <div className="flex items-center justify-center">
            {isEditMode ? <Hammer className="h-4 w-4 text-orange-500/30" /> : <Move className="h-4 w-4 text-cyan-500/30" />}
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className={`h-14 w-14 rounded-full ${isEditMode ? 'border-orange-500/50 hover:bg-orange-500/20 text-orange-400' : 'border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400'}`}
            onPointerDown={(e) => { e.preventDefault(); handleTouch('RIGHT'); }}
          >
             {isEditMode ? <Hammer className="h-5 w-5 rotate-90" /> : <ArrowRight className="h-6 w-6" />}
          </Button>

          <div />
          <Button 
            variant="outline" 
            size="icon" 
            className={`h-14 w-14 rounded-full ${isEditMode ? 'border-orange-500/50 hover:bg-orange-500/20 text-orange-400' : 'border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400'}`}
            onPointerDown={(e) => { e.preventDefault(); handleTouch('DOWN'); }}
          >
             {isEditMode ? <Hammer className="h-5 w-5 rotate-180" /> : <ArrowDown className="h-6 w-6" />}
          </Button>
          <div />
        </div>
      </div>
    </div>
  );
};

export default MazeGame;
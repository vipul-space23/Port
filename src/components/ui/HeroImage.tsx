const HeroImage = ({ 
  className,
  imgX = 0,
  imgY = 0,
  imgScale = 1
}: { 
  className?: string;
  imgX?: number;
  imgY?: number;
  imgScale?: number;
}) => {
  return (
    <div className={`relative flex justify-center items-center w-full max-w-[500px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
        aria-labelledby="hero-image"
      >
        <defs>
          <clipPath id="blobClip">
            <path
              d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
              transform="translate(100 100)"
            />
          </clipPath>
        </defs>

        {/* The Blob with Image */}
        <image
          href="/assets/hero-profile.jpg"
          width="200"
          height="200"
          x={imgX}
          y={imgY}
          transform={`scale(${imgScale})`}
          style={{ transformOrigin: 'center' }}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#blobClip)"
          className="transition-transform duration-500 hover:scale-110"
        />

        {/* Rotating Text Path */}
        <path
          id="textPath"
          d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
          transform="translate(100 100)"
          fill="none"
          stroke="none"
        />

        <text className="text-[10px] font-bold uppercase tracking-[1.5px] fill-current text-slate-900 dark:text-white opacity-80 mix-blend-difference">
          <textPath href="#textPath" startOffset="0%">
             LEARN — BUILD — IMPROVE — REPEAT — LEARN — BUILD — IMPROVE — REPEAT 
            <animate attributeName="startOffset" from="0%" to="100%" dur="20s" repeatCount="indefinite" />
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default HeroImage;

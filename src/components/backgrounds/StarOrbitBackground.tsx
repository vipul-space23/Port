const StarOrbitBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 w-full h-full bg-black">
      {/* 1. The Main Plain Background */}
      <div className="absolute inset-0 bg-neutral-950" />

      {/* 2. Grid Lines (Only visible on sides/corners) */}
      <div className="absolute inset-0 opacity-20"
        style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px),
                              linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
        }}
      />

      {/* 3. A strong "Gradient Fade" in the center so text is readable */}
      {/* This makes the grid disappear in the middle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-950 via-neutral-950/80 to-transparent" />
    </div>
  );
};

export default StarOrbitBackground;

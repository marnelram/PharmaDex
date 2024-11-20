interface PillProps {
  leftColor?: string;
  rightColor?: string;
  rotation?: number;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const Pill: React.FC<PillProps> = ({
  leftColor = "#E63946",
  rightColor = "#9E9E9E", // Using the secondary gray from design doc
  rotation = 0,
  size = "medium",
  onClick,
}) => {
  const sizes = {
    small: { width: 60, height: 30 },
    medium: { width: 80, height: 40 },
    large: { width: 100, height: 50 },
  };

  const { width, height } = sizes[size];

  return (
    <div
      onClick={onClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.2s ease-in-out",
        display: "flex",
        overflow: "hidden",
        borderRadius: `${height}px`,
      }}
    >
      {/* Left half */}
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: leftColor,
        }}
      />

      {/* Right half */}
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: rightColor,
        }}
      />

      {/* Pill divider line */}
      <div
        style={{
          position: "absolute",
          width: "2px",
          height: "100%",
          backgroundColor: "#00000020",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Shine effect */}
      <div
        style={{
          position: "absolute",
          width: "120%",
          height: "12%",
          background:
            "linear-gradient(90deg, transparent, #ffffff80, transparent)",
          top: "30%",
          left: "-30%",
          transform: `rotate(${rotation - 135}deg)`,
        }}
      />
    </div>
  );
};

export default Pill;

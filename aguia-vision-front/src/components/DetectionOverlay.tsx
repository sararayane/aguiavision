import { useEffect, useState } from "react";

export default function DetectionOverlay() {
  const [risk, setRisk] = useState<"low" | "medium" | "high">("low");

  useEffect(() => {
    const interval = setInterval(() => {
      const levels = ["low", "medium", "high"] as const;
      setRisk(levels[Math.floor(Math.random() * levels.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (risk === "low") return "border-green-500";
    if (risk === "medium") return "border-yellow-500";
    return "border-red-500";
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className={`absolute inset-0 border-4 rounded-3xl ${getColor()} animate-pulse`}
      />
    </div>
  );
}
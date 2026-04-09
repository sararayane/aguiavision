import { useEffect, useState } from "react";

export default function TelemetryPanel() {
  const [speed, setSpeed] = useState(40);
  const [distance, setDistance] = useState(20);
  const [risk, setRisk] = useState<"low" | "medium" | "high">("low");

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 60) + 20);
      setDistance(Math.floor(Math.random() * 30));

      const levels = ["low", "medium", "high"] as const;
      setRisk(levels[Math.floor(Math.random() * levels.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (risk === "low") return "text-green-400";
    if (risk === "medium") return "text-yellow-400";
    return "text-red-400";
  };

  const getLabel = () => {
    if (risk === "low") return "Seguro";
    if (risk === "medium") return "Atenção";
    return "Crítico";
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col gap-6">

      <h2 className="text-lg font-bold">
        Telemetria
      </h2>

      <div className="bg-slate-800 rounded-2xl p-4">
        <p className="text-slate-400 text-sm">Velocidade</p>
        <h3 className="text-2xl font-bold">{speed} km/h</h3>
      </div>

      <div className="bg-slate-800 rounded-2xl p-4">
        <p className="text-slate-400 text-sm">Distância</p>
        <h3 className="text-2xl font-bold">{distance} m</h3>
      </div>

      <div className="bg-slate-800 rounded-2xl p-4 text-center">
        <p className="text-slate-400 text-sm">Status</p>
        <h3 className={`text-xl font-bold ${getColor()}`}>
          {getLabel()}
        </h3>
      </div>

    </div>
  );
}
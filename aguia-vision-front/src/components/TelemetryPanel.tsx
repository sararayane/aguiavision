import { useEffect, useState } from "react";
import API_URL from "../services/api";

export default function TelemetryPanel() {
  const [data, setData] = useState({
    risco: "baixo",
    distancia: 0,
    velocidade: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/status`)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (data.risco === "alto") return "text-red-500";
    if (data.risco === "medio") return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
      <h2 className="text-lg font-semibold mb-4">Telemetria</h2>

      <div className="flex flex-col gap-3 text-sm">
        <span>🚗 Velocidade: {data.velocidade} km/h</span>
        <span>📏 Distância: {data.distancia} m</span>
        <span className={getColor()}>
          ⚠️ Risco: {data.risco.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
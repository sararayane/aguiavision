import { useState } from "react";

export default function Telemetry() {
  const [speed, setSpeed] = useState(40);

  const speedMs = speed / 3.6;
  const distance = speedMs * 1.5;

  return (
    <div className="bg-slate-900 p-6 rounded-3xl">
      <h2 className="mb-4">Telemetria</h2>

      <input
        type="range"
        min="0"
        max="120"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="w-full"
      />

      <p>{speed} km/h</p>
      <p>{speedMs.toFixed(1)} m/s</p>
      <p>{distance.toFixed(1)} m</p>
    </div>
  );
}
import { useEffect, useState } from "react";
import API_URL from "../services/api";

export default function AlertPanel() {
  const [risk, setRisk] = useState<"low" | "medium" | "high">("low");

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/arduino`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "NORMAL") setRisk("low");
          else if (data.status === "ATENCAO") setRisk("medium");
          else if (data.status === "PERIGO") setRisk("high");
        })
        .catch(() => {
          console.log("Erro ao conectar com Arduino"); 
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getConfig = () => {
    if (risk === "low") {
      return {
        label: "NORMAL",
        color: "bg-green-500",
        glow: "shadow-green-500/30",
      };
    }
    if (risk === "medium") {
      return {
        label: "ATENÇÃO",
        color: "bg-yellow-400",
        glow: "shadow-yellow-400/30",
      };
    }
    return {
      label: "PERIGO",
      color: "bg-red-500",
      glow: "shadow-red-500/40",
    };
  };

  const config = getConfig();

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col gap-6">

      <h2 className="text-lg font-bold">
        Alerta (Arduino)
      </h2>

      {/* LEDs */}
      <div className="flex justify-between items-center">

        {/* Verde */}
        <div className="flex flex-col items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${
            risk === "low"
              ? "bg-green-500 shadow-lg shadow-green-500/50"
              : "bg-slate-700"
          }`} />
          <span className="text-xs text-slate-400">Seguro</span>
        </div>

        {/* Amarelo */}
        <div className="flex flex-col items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${
            risk === "medium"
              ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
              : "bg-slate-700"
          }`} />
          <span className="text-xs text-slate-400">Atenção</span>
        </div>

        {/* Vermelho */}
        <div className="flex flex-col items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${
            risk === "high"
              ? "bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"
              : "bg-slate-700"
          }`} />
          <span className="text-xs text-slate-400">Perigo</span>
        </div>

      </div>

      {/* STATUS GRANDE */}
      <div className={`rounded-2xl p-6 text-center ${config.glow} shadow-lg`}>
        <h3 className="text-2xl font-bold">
          {config.label}
        </h3>
      </div>

    </div>
  );
}
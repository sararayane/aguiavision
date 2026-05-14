import { useState } from "react";
import DetectionOverlay from "./DetectionOverlay";
import API_URL from "../services/api";

export default function CameraView() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-yellow-500">

      {/* 🎥 STREAM DO BACKEND */}
      {isActive && (
        <>
          <img
            src={`${API_URL}/video`}
  alt="Camera IA"
  className="absolute inset-0 w-full h-full object-cover"
          />

          {/* overlay por cima */}
          <div className="absolute inset-0 pointer-events-none">
            <DetectionOverlay />
          </div>
        </>
      )}

      {/* 🔘 TELA INICIAL */}
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
          <p className="text-lg">Câmera Desconectada</p>

          <button
            onClick={() => setIsActive(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
          >
            Ativar Monitoramento
          </button>
        </div>
      )}
    </div>
  );
}
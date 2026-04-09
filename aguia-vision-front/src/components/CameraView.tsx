import { useState } from "react";
import DetectionOverlay from "./DetectionOverlay";

export default function CameraView() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">

      {/* 🎥 STREAM DO BACKEND */}
      {isActive && (
        <>
          <img
            src="http://127.0.0.1:8000/video"
            alt="Camera IA"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <DetectionOverlay />
        </>
      )}

      {/* 🔘 BOTÃO INICIAL */}
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <p>Câmera Desconectada</p>

          <button
            onClick={() => setIsActive(true)}
            className="px-6 py-3 bg-blue-600 rounded-xl"
          >
            Ativar Monitoramento
          </button>
        </div>
      )}
    </div>
  );
}
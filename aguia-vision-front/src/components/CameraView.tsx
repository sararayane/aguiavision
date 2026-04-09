import { useRef, useState } from "react";
import DetectionOverlay from "./DetectionOverlay";

export default function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsActive(true);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao acessar câmera");
    }
  };

  return (
    <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover ${
          isActive ? "block" : "hidden"
        }`}
      />

      {isActive && <DetectionOverlay />}

      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <p>Câmera Desconectada</p>

          <button
            onClick={startCamera}
            className="px-6 py-3 bg-blue-600 rounded-xl"
          >
            Ativar Monitoramento
          </button>
        </div>
      )}
    </div>
  );
}
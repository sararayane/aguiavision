import CameraView from "./components/CameraView";
import TelemetryPanel from "./components/TelemetryPanel";
import AlertPanel from "./components/AlertPanel";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* 🔷 HEADER */}
      <Header />

      {/* 🧠 DASHBOARD */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

        {/* 🎥 LADO ESQUERDO */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* STATUS DO SISTEMA */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Status do Sistema
            </span>

            <span className="text-green-400 font-semibold">
              Ativo
            </span>
          </div>

          {/* CÂMERA */}
          <CameraView />

        </div>

        {/* 📊 LADO DIREITO */}
        <div className="flex flex-col gap-6">

          {/* TELEMETRIA */}
          <TelemetryPanel />

          {/* 🚨 ALERTA ARDUINO */}
          <AlertPanel />

        </div>

      </main>

    </div>
  );
}
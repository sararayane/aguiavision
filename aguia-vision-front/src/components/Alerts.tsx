export default function Alerts() {
  return (
    <div className="bg-slate-900 p-6 rounded-3xl">
      <h2>Alerta</h2>

      <div className="flex gap-4 mt-4">
        <div className="w-10 h-10 bg-green-500 rounded-full"></div>
        <div className="w-10 h-10 bg-yellow-500 rounded-full opacity-30"></div>
        <div className="w-10 h-10 bg-red-500 rounded-full opacity-30"></div>
      </div>
    </div>
  );
}
export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900 px-6 py-3 flex items-center justify-between">
      
      {/* Lado esquerdo */}
      <div className="flex items-center gap-3">
        
        {/* Ícone */}
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold">🛡️</span>
        </div>

        {/* Nome + descrição */}
        <div>
          <h1 className="font-bold text-lg tracking-tight">
  Águia<span className="text-blue-500">Vision</span>
</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Sistema de Monitoramento de Segurança
          </p>
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-300">Sistema Online</span>
        </div>
      </div>

    </header>
  );
}
import { useContext, useState } from 'react';
import { ChallengeContext } from './context/ChallengeContext';
import { ChallengeCard } from './components/ChallengeCard';

function App() {
  const { challenges, pontosKawa, pontosParceira } = useContext(ChallengeContext);
  const [usuarioAtivo, setUsuarioAtivo] = useState('Kawa');

  // Lógica simples para dizer quem está na frente
  const mensagemVitoria = pontosKawa > pontosParceira
    ? "Kawa está na liderança! 🔥"
    : pontosParceira > pontosKawa
    ? "Ela está ganhando! 👑"
    : "Tudo igual por enquanto! ⚖️";

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <header className="max-w-xl mx-auto mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
              D.CASAL <span className="text-rose-500">.</span>
            </h1>
            <p className="text-slate-400 text-sm font-bold uppercase mt-1">Março 2026</p>
          </div>

          {/* Placar Real-time */}
          <div className="flex gap-3">
            <div className={`p-3 rounded-2xl border-2 transition-all ${usuarioAtivo === 'Kawa' ? 'border-blue-500 bg-white shadow-lg' : 'border-transparent opacity-50'}`}>
              <p className="text-[10px] font-black text-slate-400 uppercase">Kawa</p>
              <p className="text-2xl font-black text-blue-600">{pontosKawa}</p>
            </div>
            <div className={`p-3 rounded-2xl border-2 transition-all ${usuarioAtivo === 'Parceira' ? 'border-rose-500 bg-white shadow-lg' : 'border-transparent opacity-50'}`}>
              <p className="text-[10px] font-black text-slate-400 uppercase">Ela</p>
              <p className="text-2xl font-black text-rose-600">{pontosParceira}</p>
            </div>
          </div>
        </div>

        {/* Seletor de Quem está usando */}
        <div className="bg-slate-200/50 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setUsuarioAtivo('Kawa')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${usuarioAtivo === 'Kawa' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
          >
            SOU KAWA
          </button>
          <button
            onClick={() => setUsuarioAtivo('Parceira')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${usuarioAtivo === 'Parceira' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
          >
            SOU PARCEIRA
          </button>
        </div>

        <p className="text-center mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          {mensagemVitoria}
        </p>
      </header>

      <main className="max-w-xl mx-auto">
        <div className="grid gap-4">
          {challenges.map(ch => (
            <ChallengeCard
              key={ch.id}
              challenge={ch}
              usuarioAtivo={usuarioAtivo}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
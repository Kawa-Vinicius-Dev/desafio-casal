import { useContext, useState } from 'react';
import { ChallengeContext } from './context/ChallengeContext';
import { ChallengeCard } from './components/ChallengeCard';

function App() {
  const { challenges, addChallenge, totalPoints } = useContext(ChallengeContext);
  const [text, setText] = useState('');
  const [type, setType] = useState('daily');

  const handleAdd = () => {
    if (!text.trim()) return;
    addChallenge(text, type);
    setText(''); // Limpa o campo
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="max-w-md mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Desafio Casal 👩‍❤️‍👨</h1>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <span className="text-sm text-gray-500">Pontos:</span>
          <span className="ml-2 font-bold text-blue-600 text-xl">{totalPoints}</span>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Formulário Simples */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8">
          <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Novo desafio..."
            className="w-full p-2 border rounded mb-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2 mb-3">
            {['daily', 'weekly', 'monthly'].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-1 rounded capitalize text-sm font-medium transition ${
                  type === t ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {t === 'daily' ? 'Dia' : t === 'weekly' ? 'Semana' : 'Mês'}
              </button>
            ))}
          </div>
          <button 
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
          >
            Adicionar Desafio
          </button>
        </div>

        {/* Lista de Desafios */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Seus Desafios</h2>
          {challenges.length === 0 && <p className="text-gray-400 text-center">Nenhum desafio ainda. Bora começar?</p>}
          {challenges.map(ch => (
            <ChallengeCard key={ch.id} challenge={ch} />
          )).reverse() /* Mostra o mais novo primeiro */}
        </div>
      </main>
    </div>
  );
}

export default App;
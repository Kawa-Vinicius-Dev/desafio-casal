import { useContext, useState } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import { Challenge } from '../models/Challenge';

export const ChallengeCard = ({ challenge, usuarioAtivo }) => {
  const { pontuar, editarDesafio } = useContext(ChallengeContext);
  const [editando, setEditando] = useState(false);
  const [tempTitulo, setTempTitulo] = useState(challenge.titulo);
  const [tempDesc, setTempDesc] = useState(challenge.descricao);

  const jaFeito = Challenge.jaPontuouHoje(challenge, usuarioAtivo);

  const salvarEdicao = () => {
    editarDesafio(challenge.id, tempTitulo, tempDesc);
    setEditando(false);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4 transition-all hover:shadow-md">
      {editando ? (
        <div className="space-y-3">
          <input className="w-full p-2 border rounded-lg text-sm" value={tempTitulo} onChange={e => setTempTitulo(e.target.value)} />
          <textarea className="w-full p-2 border rounded-lg text-sm" value={tempDesc} onChange={e => setTempDesc(e.target.value)} />
          <button onClick={salvarEdicao} className="bg-green-500 text-white px-4 py-1 rounded-lg text-xs font-bold">Salvar</button>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold uppercase text-slate-500">{challenge.tipo}</span>
              <h3 className="font-bold text-slate-800">{challenge.titulo}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{challenge.descricao}</p>

            {/* Feedback Visual de Pontos do Desafio */}
            <div className="flex gap-1 mt-3">
              {[...Array(7)].map((_, i) => (
                <div key={i} className={`h-2 w-4 rounded-sm ${i < challenge.historicoPontos.length ? 'bg-rose-400' : 'bg-slate-100'}`} />
              ))}
              <span className="text-[10px] font-bold text-slate-400 ml-1">Total: {challenge.historicoPontos.length}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => pontuar(challenge.id, usuarioAtivo)}
              disabled={jaFeito}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                jaFeito ? 'bg-slate-100 text-slate-400' : 'bg-rose-500 text-white shadow-lg shadow-rose-200'
              }`}
            >
              {jaFeito ? 'CHECK-IN OK' : 'MARCAR DIA'}
            </button>
            <button onClick={() => setEditando(true)} className="text-[10px] text-slate-300 hover:text-slate-500 font-bold uppercase">Editar</button>
          </div>
        </div>
      )}
    </div>
  );
};
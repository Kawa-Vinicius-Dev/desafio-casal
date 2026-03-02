import { createContext, useState, useEffect } from 'react';
import { Challenge } from '../models/Challenge';

export const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('@DesafioCasal:v2');
    if (saved) return JSON.parse(saved);

    // Desafios Iniciais Pré-definidos
    return [
      new Challenge('1', 'Treino Diário', 'Pelo menos 30 minutos de atividade', 'mensal', 'Sistema'),
      new Challenge('2', 'Boa Ação', 'Fazer algo bom para quem precisa', 'semanal', 'Sistema'),
      new Challenge('3', 'Desafio do Dia', 'O desafio muda a cada 24h', 'diario', 'Sistema')
    ];
  });

  useEffect(() => {
    localStorage.setItem('@DesafioCasal:v2', JSON.stringify(challenges));
  }, [challenges]);

  const pontuar = (id, usuario) => {
    const hoje = new Date().toLocaleDateString();
    setChallenges(prev => prev.map(ch => {
      if (ch.id === id) {
        // Evita pontuação dupla do mesmo usuário no mesmo dia
        const jaFeito = ch.historicoPontos.some(p => p.data === hoje && p.usuario === usuario);
        if (jaFeito) return ch;
        return {
          ...ch,
          historicoPontos: [...ch.historicoPontos, { data: hoje, usuario }]
        };
      }
      return ch;
    }));
  };

  const editarDesafio = (id, novoTitulo, novaDescricao) => {
    setChallenges(prev => prev.map(ch =>
      ch.id === id ? { ...ch, titulo: novoTitulo, descricao: novaDescricao } : ch
    ));
  };

  // Cálculos de Placar Geral
  const pontosKawa = challenges.reduce((acc, ch) => acc + Challenge.contarPontos(ch, 'Kawa'), 0);
  const pontosParceira = challenges.reduce((acc, ch) => acc + Challenge.contarPontos(ch, 'Parceira'), 0);

  return (
    <ChallengeContext.Provider value={{
      challenges, pontuar, editarDesafio, pontosKawa, pontosParceira
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};
import { createContext, useState, useEffect } from 'react';
import { createChallenge } from '../models/Challenge';

export const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  // Estado que guarda a lista de todos os desafios
  const [challenges, setChallenges] = useState(() => {
    // Tenta carregar do LocalStorage ao iniciar
    const saved = localStorage.getItem('@DesafioCasal:challenges');
    return saved ? JSON.parse(saved) : [];
  });

  // Toda vez que a lista mudar, salva no LocalStorage automaticamente
  useEffect(() => {
    localStorage.setItem('@DesafioCasal:challenges', JSON.stringify(challenges));
  }, [challenges]);

  // Função para adicionar um novo desafio
  const addChallenge = (title, type) => {
    const newChallenge = createChallenge(title, type);
    setChallenges((prev) => [...prev, newChallenge]);
  };

  // Função para completar um desafio e ganhar 1 ponto
  const completeChallenge = (id) => {
    setChallenges((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, completed: true } : ch
      )
    );
  };

  // Cálculo de pontuação total (1 ponto por desafio completado)
  const totalPoints = challenges.filter(ch => ch.completed).length;

  return (
    <ChallengeContext.Provider value={{
      challenges,
      addChallenge,
      completeChallenge,
      totalPoints
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};
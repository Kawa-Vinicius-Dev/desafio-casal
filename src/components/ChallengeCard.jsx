import React, { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import { getChallengeStatus } from '../models/Challenge';

export const ChallengeCard = ({ challenge }) => {
  const { completeChallenge } = useContext(ChallengeContext);
  const status = getChallengeStatus(challenge);

  // Cores dinâmicas baseadas no tipo
  const typeStyles = {
    daily: 'border-blue-500 bg-blue-50',
    weekly: 'border-purple-500 bg-purple-50',
    monthly: 'border-pink-500 bg-pink-50'
  };

  return (
    <div className={`p-4 border-l-4 rounded-r-lg shadow-sm mb-3 ${typeStyles[challenge.type]}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-800">{challenge.title}</h3>
          <p className="text-xs text-gray-500 capitalize">{challenge.type}</p>
        </div>

        {status === 'active' && (
          <button
            onClick={() => completeChallenge(challenge.id)}
            className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-green-600 transition"
          >
            Concluir
          </button>
        )}

        {status === 'completed' && <span className="text-green-600 font-bold">✅</span>}
        {status === 'expired' && <span className="text-red-500 font-bold">❌ Expirou</span>}
      </div>
    </div>
  );
};
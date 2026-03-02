export const createChallenge = (title, type) => {
  const now = new Date();
  const expiresAt = new Date();

  // Lógica de expiração baseada no tipo
  if (type === 'daily') {
    expiresAt.setDate(now.getDate() + 1);
  } else if (type === 'weekly') {
    expiresAt.setDate(now.getDate() + 7);
  } else if (type === 'monthly') {
    expiresAt.setDate(now.getDate() + 31);
  }

  return {
    id: crypto.randomUUID(), // Gera um ID único automático
    title,
    type, // 'daily', 'weekly', 'monthly'
    points: 1,
    completed: false,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
};

export const getChallengeStatus = (challenge) => {
  if (challenge.completed) return 'completed';

  const now = new Date();
  const expiration = new Date(challenge.expiresAt);

  if (now > expiration) return 'expired';

  return 'active';
};
export class Challenge {
  constructor(id, titulo, descricao, tipo, criadoPor) {
    this.id = id || crypto.randomUUID();
    this.titulo = titulo;
    this.descricao = descricao || "";
    this.tipo = tipo; // 'diario', 'semanal', 'mensal'
    this.criadoPor = criadoPor;
    this.historicoPontos = []; // Armazena objetos { data: "02/03/2026", usuario: "Kawa" }
    this.criadoEm = new Date().toISOString();
  }

  // Método para verificar se alguém já pontuou hoje
  static jaPontuouHoje(challenge, usuario) {
    const hoje = new Date().toLocaleDateString();
    return challenge.historicoPontos.some(p => p.data === hoje && p.usuario === usuario);
  }

  // Método para contar pontos totais de um usuário neste desafio
  static contarPontos(challenge, usuario) {
    return challenge.historicoPontos.filter(p => p.usuario === usuario).length;
  }
}
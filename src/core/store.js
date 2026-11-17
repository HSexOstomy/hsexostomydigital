/* Armazenamento local seguro.
   local: progresso de estudo (sem dados de saúde).
   session: rascunhos do Planejador, apagados ao fechar a aba. Nada é enviado a servidores. */

const PREFIX = "hso:";

function make(kind) {
  const get = () => { try { return window[kind]; } catch { return null; } };
  return {
    read(key, fallback) {
      try { const v = get()?.getItem(PREFIX + key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    write(key, value) {
      try { get()?.setItem(PREFIX + key, JSON.stringify(value)); return true; } catch { return false; }
    },
    remove(key) {
      try { get()?.removeItem(PREFIX + key); } catch { /* indisponível */ }
    }
  };
}

export const local = make("localStorage");
export const session = make("sessionStorage");

/* Estado compartilhado em memória entre páginas (ex.: escores das calculadoras para o Planejador) */
export const memory = {
  scores: session.read("scores", {}),
  setScore(id, data) { this.scores[id] = data; session.write("scores", this.scores); },
  clearScores() { this.scores = {}; session.remove("scores"); }
};

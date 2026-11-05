import { useState } from "react";

interface UserData {
  nome: string;
  cognome: string;
  email: string;
  indirizzo: string;
  citta: string;
  cap: string;
}

function Account() {
  const [user] = useState<UserData | null>(() => {
    const saved = localStorage.getItem("moden-user");

    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  return (
    <section>
      <h1>Il mio account</h1>

      {!user ? (
        <p>Non hai ancora inserito i tuoi dati personali.</p>
      ) : (
        <div>
          <h2>I tuoi dati</h2>

          <p>Nome: {user.nome}</p>
          <p>Cognome: {user.cognome}</p>
          <p>Email: {user.email}</p>
          <p>Indirizzo: {user.indirizzo}</p>
          <p>Città: {user.citta}</p>
          <p>CAP: {user.cap}</p>
        </div>
      )}
    </section>
  );
}

export default Account;
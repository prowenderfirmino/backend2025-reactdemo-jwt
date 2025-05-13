import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [dados, setDados] = useState(null);

  const login = async () => {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: '123456' })
    });
    const data = await res.json();
    setToken(data.token);
  };

  const acessarDados = async () => {
    const res = await fetch('http://localhost:4000/dados', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setDados(data);
  };

  return (
    <div>
      <h1>Login com JWT</h1>
      <button onClick={login}>Fazer Login</button>
      <button onClick={acessarDados} disabled={!token}>Acessar Dados Protegidos</button>
      {dados && <pre>{JSON.stringify(dados, null, 2)}</pre>}
    </div>
  );
}

export default App;

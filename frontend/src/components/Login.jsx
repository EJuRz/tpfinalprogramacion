import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); // Limpia el mensaje anterior
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });
      const data = await res.json();
      if (data.success) {
        onLogin();
      } else {
        setMsg(data.message || "Login incorrecto");
      }
    } catch (err) {
      setMsg("Error de conexión con el servidor");
    }
  };

  return (
    <section className="section" style={{minHeight:"100vh", display:"flex",justifyContent:"center",alignItems:"start"}}>
      <div className="container" style={{ maxWidth: "400px" }}>
        <h1 className="title" style={{textAlign:"center"}}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Usuario</label>
            <div className="control">
              <input className="input" type="text" value={usuario} onChange={e => setUsuario(e.target.value)} required />
            </div>
          </div>
          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
          <button className="button is-primary" type="submit">Ingresar</button>
        </form>
        {msg && <p className="has-text-danger mt-2">{msg}</p>}
      </div>
    </section>
  );
}
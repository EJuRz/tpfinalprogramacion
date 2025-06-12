import React, { useState, useEffect } from "react";

export default function DeporteForm({ onSubmit, initialData, onCancel }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [cantJugadores, setCantJugadores] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    setNombre(initialData?.nombre || "");
    setTipo(initialData?.tipo || "");
    setCantJugadores(initialData?.cant_jugadores || "");
    setDescripcion(initialData?.descripcion || "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      nombre,
      tipo,
      cant_jugadores: cantJugadores,
      descripcion,
    });
    setNombre("");
    setTipo("");
    setCantJugadores("");
    setDescripcion("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input className="input" value={nombre} onChange={e => setNombre(e.target.value)} required maxLength={15} />
        </div>
      </div>
      <div className="field">
        <label className="label">Tipo</label>
        <div className="control">
          <input className="input" value={tipo} onChange={e => setTipo(e.target.value)} maxLength={15} />
        </div>
      </div>
      <div className="field">
        <label className="label">Cantidad de jugadores</label>
        <div className="control">
          <input className="input" type="number" value={cantJugadores} onChange={e => setCantJugadores(e.target.value)} min={1} />
        </div>
      </div>
      <div className="field">
        <label className="label">Descripción</label>
        <div className="control">
          <input className="input" value={descripcion} onChange={e => setDescripcion(e.target.value)} maxLength={100} />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-success" type="submit">
            {initialData ? "Actualizar" : "Agregar"}
          </button>
        </div>
        {initialData && (
          <div className="control">
            <button className="button" type="button" onClick={onCancel}>Cancelar</button>
          </div>
        )}
      </div>
    </form>
  );
}
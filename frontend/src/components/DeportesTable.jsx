import React from "react";

export default function DeportesTable({ deportes, onEdit, onDelete }) {
  return (
    <table className="table is-fullwidth mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Cant. Jugadores</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {deportes.map(deporte => (
          <tr key={deporte.id}>
            <td>{deporte.id}</td>
            <td>{deporte.nombre}</td>
            <td>{deporte.tipo}</td>
            <td>{deporte.cant_jugadores}</td>
            <td>{deporte.descripcion}</td>
            <td>
              <button className="button is-warning is-small mr-2" onClick={() => onEdit(deporte)}>Editar</button>
              <button className="button is-danger is-small" onClick={() => onDelete(deporte.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
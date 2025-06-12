import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import DeportesTable from "./components/DeportesTable";
import DeporteForm from "./components/DeporteForm";
import "./App.css";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [deportes, setDeportes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [view, setView] = useState("deportes"); // "deportes" o "cocktails"
  const [search, setSearch] = useState("");
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [misCocteles, setMisCocteles] = useState([]);
  const [nuevoCoctel, setNuevoCoctel] = useState({
    strDrink: "",
    strCategory: "",
    strAlcoholic: "",
    strInstructions: "",
    strDrinkThumb: ""
  });

  // Obtener deportes
  const fetchDeportes = async () => {
    try {
      const res = await fetch("http://localhost:3000/deportes");
      if (!res.ok) throw new Error("Error al obtener deportes");
      setDeportes(await res.json());
    } catch (error) {
      setDeportes([]);
      alert("Error al cargar los deportes");
    }
  };

  useEffect(() => {
    if (logged && view === "deportes") fetchDeportes();
  }, [logged, view]);

  // Alta / Modificación (POST/PUT con axios)
  const handleSubmit = async (deporte) => {
    try {
      if (deporte.id) {
        await axios.put(`http://localhost:3000/deportes/${deporte.id}`, deporte, {
          headers: { "Content-Type": "application/json" }
        });
      } else {
        await axios.post("http://localhost:3000/deportes", deporte, {
          headers: { "Content-Type": "application/json" }
        });
      }
      setEditing(null);
      fetchDeportes();
    } catch (error) {
      alert("Error al guardar el deporte");
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/deportes/${id}`, { method: "DELETE" });
      fetchDeportes();
    } catch (error) {
      alert("Error al eliminar el deporte");
    }
  };

  // GET de cócteles con fetch
  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredCocktails([]);
      return;
    }
    const fetchCocktails = async () => {
      try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        if (!res.ok) throw new Error("Error al buscar cócteles");
        const data = await res.json();
        setFilteredCocktails(data.drinks || []);
      } catch (error) {
        setFilteredCocktails([]);
        alert("Error al buscar cócteles");
      }
    };
    fetchCocktails();
  };

  // Simular POST: agregar a favoritos
  const handleAddFavorito = (cocktail) => {
    if (!favoritos.find(fav => fav.idDrink === cocktail.idDrink)) {
      setFavoritos([...favoritos, cocktail]);
      alert(`"${cocktail.strDrink}" agregado a favoritos (simulado POST)`);
    } else {
      alert("Este cóctel ya está en favoritos.");
    }
  };

  // Manejar cambios en el formulario de nuevo cóctel
  const handleNuevoCoctelChange = e => {
    setNuevoCoctel({ ...nuevoCoctel, [e.target.name]: e.target.value });
  };

  // POST simulado de cócteles propios con axios (solo simulado, no se envía a un backend real)
  const handleAgregarCoctel = async e => {
    e.preventDefault();
    if (
      !nuevoCoctel.strDrink ||
      !nuevoCoctel.strCategory ||
      !nuevoCoctel.strAlcoholic ||
      !nuevoCoctel.strInstructions ||
      !nuevoCoctel.strDrinkThumb
    ) {
      alert("Completa todos los campos");
      return;
    }
    // Simulación de POST con axios (no se envía realmente, solo para cumplir el pedido)
    try {
      await axios.post("/simulado/guardar-coctel", nuevoCoctel);
    } catch (e) {
      // No hace nada, es simulado
    }
    setMisCocteles([
      ...misCocteles,
      { ...nuevoCoctel, idDrink: Date.now().toString() }
    ]);
    setNuevoCoctel({
      strDrink: "",
      strCategory: "",
      strAlcoholic: "",
      strInstructions: "",
      strDrinkThumb: ""
    });
  };

  if (!logged) return <Login onLogin={() => setLogged(true)} />;

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <button
            className={`custom-btn ${view === "deportes" ? "active-btn" : ""}`}
            onClick={() => setView("deportes")}
          >
            Backend con Base de Datos
          </button>
          <button
            className={`custom-btn ${view === "cocktails" ? "active-btn" : ""}`}
            onClick={() => setView("cocktails")}
          >
            Consumo de API
          </button>
        </div>
        {view === "deportes" ? (
          <>
            <h1 className="title">ABM Deportes</h1>
            <DeporteForm onSubmit={handleSubmit} initialData={editing} onCancel={() => setEditing(null)} />
            <DeportesTable deportes={deportes} onEdit={d => setEditing(d)} onDelete={handleDelete} />
          </>
        ) : (
          <div>
            <h1 className="title">Buscador de Cócteles</h1>
            {/* GET de cócteles */}
            <div className="cocktail-search-bar">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar cóctel por nombre..."
                className="cocktail-input"
              />
              <button
                onClick={handleSearch}
                className="button is-info"
              >
                Buscar
              </button>
            </div>
            <div className="cocktail-results">
              {filteredCocktails.length > 0 ? (
                filteredCocktails.map(cocktail => (
                  <div key={cocktail.idDrink} className="cocktail-card">
                    <h3>{cocktail.strDrink}</h3>
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                    <p>Categoria: {cocktail.strCategory}</p>
                    <p>Alcoholico: {cocktail.strAlcoholic}</p>
                    <p>Instrucciones: {cocktail.strInstructions}</p>
                    {/* Botón de agregar a favoritos eliminado */}
                  </div>
                ))
              ) : (
                <p>No se encontraron cócteles.</p>
              )}
            </div>
            {/* POST simulado de cócteles propios */}
            <div style={{ marginBottom: "2rem", marginTop: "2.5rem" }}>
              <h2 className="title" style={{ fontSize: "1.3rem" }}>Agregar Cóctel (Simulado)</h2>
              <form onSubmit={handleAgregarCoctel} className="cocktail-form">
                <input
                  type="text"
                  name="strDrink"
                  value={nuevoCoctel.strDrink}
                  onChange={handleNuevoCoctelChange}
                  placeholder="Nombre del cóctel"
                  className="input"
                  required
                />
                <input
                  type="text"
                  name="strCategory"
                  value={nuevoCoctel.strCategory}
                  onChange={handleNuevoCoctelChange}
                  placeholder="Categoría"
                  className="input"
                  required
                />
                <select
                  name="strAlcoholic"
                  value={nuevoCoctel.strAlcoholic}
                  onChange={handleNuevoCoctelChange}
                  className="input"
                  required
                >
                  <option value="">Seleccione si es alcohólico</option>
                  <option value="Alcoholic">Alcohólico</option>
                  <option value="Non_Alcoholic">No alcohólico</option>
                </select>
                <textarea
                  name="strInstructions"
                  value={nuevoCoctel.strInstructions}
                  onChange={handleNuevoCoctelChange}
                  placeholder="Instrucciones"
                  className="input"
                  required
                  rows={3}
                />
                <input
                  type="text"
                  name="strDrinkThumb"
                  value={nuevoCoctel.strDrinkThumb}
                  onChange={handleNuevoCoctelChange}
                  placeholder="URL de la imagen"
                  className="input"
                  required
                />
                <button type="submit" className="button is-primary">
                  Agregar Cóctel
                </button>
              </form>
              <div className="cocktail-results">
                {misCocteles.length > 0 ? (
                  misCocteles.map(cocktail => (
                    <div key={cocktail.idDrink} className="cocktail-card">
                      <h3>{cocktail.strDrink}</h3>
                      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                      <p>Categoria: {cocktail.strCategory}</p>
                      <p>Alcoholico: {cocktail.strAlcoholic}</p>
                      <p>Instrucciones: {cocktail.strInstructions}</p>
                    </div>
                  ))
                ) : (
                  <p>No has agregado ningún cóctel aún.</p>
                )}
              </div>
            </div>
            {/* Mostrar favoritos simulados */}
            {favoritos.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <h2 className="title" style={{ fontSize: "1.3rem" }}>Favoritos (Simulado)</h2>
                <div className="cocktail-results">
                  {favoritos.map(cocktail => (
                    <div key={cocktail.idDrink} className="cocktail-card">
                      <h3>{cocktail.strDrink}</h3>
                      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                      <p>Categoria: {cocktail.strCategory}</p>
                      <p>Alcoholico: {cocktail.strAlcoholic}</p>
                      <p>Instrucciones: {cocktail.strInstructions}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
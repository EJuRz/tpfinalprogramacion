import React, { useState } from "react";

export default function CocktailApi() {
  const [search, setSearch] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [msg, setMsg] = useState("");

  // GET usando fetch
  const buscarCocktail = async () => {
    setMsg("");
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
      );
      if (!res.ok) throw new Error("Error al buscar cócteles");
      const data = await res.json();
      setCocktails(data.drinks || []);
      if (!data.drinks) setMsg("No se encontraron cócteles con ese nombre.");
    } catch (error) {
      setCocktails([]);
      setMsg("Error al buscar cócteles");
    }
  };

  function getIngredientes(coctel) {
    const ingredientes = [];
    for (let i = 1; i <= 15; i++) {
      const ing = coctel[`strIngredient${i}`];
      const medida = coctel[`strMeasure${i}`];
      if (ing) {
        ingredientes.push(
          <li key={i}>
            {medida ? medida : ""} {ing}
          </li>
        );
      }
    }
    return ingredientes;
  }

  return (
    <div style={{marginTop: 30}}>
      <h2>Cocktail Search</h2>
      <input
        type="text"
        value={search}
        placeholder="E.g. margarita"
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={buscarCocktail}>Search</button>
      <div>
        {msg && <p>{msg}</p>}
        <ul style={{listStyle: "none", padding: 0}}>
          {cocktails.map(c => (
            <li key={c.idDrink} style={{marginBottom: 20, border:"1px solid #eee", borderRadius:8, padding:15}}>
              <b style={{fontSize:"1.2em"}}>{c.strDrink}</b>
              <div style={{display:"flex", gap:20, alignItems:"flex-start"}}>
                <img src={c.strDrinkThumb} alt={c.strDrink} width={100} style={{borderRadius:8}} />
                <div>
                  <strong>Ingredients:</strong>
                  <ul>{getIngredientes(c)}</ul>
                  <div>
                    <strong>Instructions:</strong>{" "}
                    {c.strInstructions}
                  </div>
                  {c.strAlcoholic && (
                    <div>
                      <strong>Type:</strong> {c.strAlcoholic}
                    </div>
                  )}
                  {c.strCategory && (
                    <div>
                      <strong>Category:</strong> {c.strCategory}
                    </div>
                  )}
                  {c.strGlass && (
                    <div>
                      <strong>Glass:</strong> {c.strGlass}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
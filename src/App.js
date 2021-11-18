import Axios from "axios";
import React from 'react';
import { useState } from 'react';
import './App.css';
import RecipeTile from './components/receipe-page';

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLabel, setHealthLabel] = useState("vegan");

  const YOUR_APP_ID = `c7c045df`;
  const YOUR_APP_KEY = "31d0d10d9136ee18425fe7570f53e4dd";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

  const getReceipeInfo = async () => {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);

  }

  const onSubmit = (e) => {
    e.preventDefault();
    getReceipeInfo();
  }

  return (
    <div className="app">
      <h1>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input className="app__input"
          type="text" placeholder="enter ingredients"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
        <select className="app__healthLabels">
          <option onClick={() => setHealthLabel("Vegan")}>Vegan</option>
          <option onClick={() => setHealthLabel("Vegetarian")}>vegetarian</option>
          <option onClick={() => setHealthLabel("Pescatarian")}>paleo</option>
          <option onClick={() => setHealthLabel("Diary-free")}>diary-free</option>
          <option onClick={() => setHealthLabel("Glutan-free")}>glutan-free</option>
          <option onClick={() => setHealthLabel("Wheat-free")}>wheat-free</option>
          <option onClick={() => setHealthLabel("low-sugar")}>low-sugar</option>
          <option onClick={() => setHealthLabel("Soy-free")}>sugar-free</option>
          <option onClick={() => setHealthLabel("Peanut-free")}>peanut-free</option>
          <option onClick={() => setHealthLabel("Egg-free")}>egg-free</option>
          <option onClick={() => setHealthLabel("Tree-nut-free")}>Tree-nut-free</option>
          <option onClick={() => setHealthLabel("Mustard-free")}>Mustard-free</option>
        </select>
      </form>
      <div className="app__gridview">
        {
          recipes.map((recipe, index) => {
            return <RecipeTile key={index} recipe={recipe} />;
          })

        }
      </div >

    </div>
  );
}

export default App;

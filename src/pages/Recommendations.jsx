import React, { useEffect, useState } from "react";
import { fetchRecipesByMood } from "../services/spoonacular.js";

const moodEmojis = {
  happy: "😊",
  sad: "😔",
  lazy: "😴",
  focused: "😎",
};

const musicLinks = {
  happy: [
    { title: "Happy Vibes 🎵", url: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0" },
    { title: "Sunshine Beats ☀️", url: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC" },
    { title: "Feel-Good Mix", url: "https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy" }
  ],
  sad: [ 
    { title: "Rainy Mood 🌧", url: "https://open.spotify.com/playlist/37i9dQZF1DWVV27DiNWxkR" },
    { title: "Lo-Fi Chill", url: "https://open.spotify.com/playlist/37i9dQZF1DX9sIqqvKsjG8" },
    { title: "Comfort Vibes", url: "https://open.spotify.com/playlist/37i9dQZF1DWVrtsSlLKzro" }
  ],
  lazy: [
    { title: "Slow Sunday", url: "https://open.spotify.com/playlist/37i9dQZF1DWUvZBXGjNCU4" },
    { title: "Cozy Acoustic", url: "https://open.spotify.com/playlist/37i9dQZF1DX6VdMW310YC7" },
    { title: "Stay in Bed Mix", url: "https://open.spotify.com/playlist/37i9dQZF1DWVxoleDT3ILq" }
  ],
  focused: [
    { title: "Deep Focus 🔥", url: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
    { title: "Coding Beats", url: "https://open.spotify.com/playlist/3C4MJpi1eb1ARiE2rx2Nhi" },
    { title: "Study Flow", url: "https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6" }
  ]
};

const addToFavorites = (item, type, mood) => {
  const key = `favorites-${type}`;
  const current = JSON.parse(localStorage.getItem(key)) || [];
  const isAlreadySaved = current.some((fav) => fav.url === item.url);
  if (isAlreadySaved) return;
  const itemWithMood = { ...item, mood };
  const updated = [...current, itemWithMood];
  localStorage.setItem(key, JSON.stringify(updated));
};

export default function Recommendations() {
  const [recipes, setRecipes] = useState([]);
  const [savedMusicUrls, setSavedMusicUrls] = useState([]);
  const [savedFoodUrls, setSavedFoodUrls] = useState([]);
  const mood = localStorage.getItem("selectedMood") || "happy";

  useEffect(() => {
    async function loadRecipes() {
      const result = await fetchRecipesByMood(mood);
      setRecipes(result);
    }

    const savedMusic = JSON.parse(localStorage.getItem("favorites-music")) || [];
    const savedFood = JSON.parse(localStorage.getItem("favorites-food")) || [];
    setSavedMusicUrls(savedMusic.map((item) => item.url));
    setSavedFoodUrls(savedFood.map((item) => item.url));
    loadRecipes();
  }, [mood]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/rf-bg.png')" }}
      ></div>

      <div className="relative z-10 px-4 sm:px-8 py-6">
        <div className="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-6 sm:p-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-purple-800 mb-6 uppercase">
            Your Mood: <span className="capitalize">{mood}</span> {moodEmojis[mood]}
          </h2>

          {/* Music Section */}
          <h3 className="text-xl sm:text-2xl font-semibold text-purple-700 text-center mb-4">
            🎵 Music Recommendations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {musicLinks[mood].map((track, idx) => {
              const isSaved = savedMusicUrls.includes(track.url);
              return (
                <div key={idx} className="bg-purple-100 p-4 rounded-xl text-center shadow">
                  <h4 className="text-base sm:text-lg font-medium mb-2">{track.title}</h4>
                  <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
                  >
                    Listen Now
                  </a>
                  <button
                    onClick={() => {
                      if (!isSaved) {
                        addToFavorites({ ...track }, "music", mood);
                        setSavedMusicUrls([...savedMusicUrls, track.url]);
                      }
                    }}
                    className={`block mt-2 text-sm ${
                      isSaved ? "text-pink-600" : "text-purple-600 hover:underline"
                    }`}
                    disabled={isSaved}
                  >
                    {isSaved ? "❤️ Saved" : "💾 Save to Favorites"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Food Section */}
          <h3 className="text-xl sm:text-2xl font-semibold text-green-700 text-center mb-4">
            🥗 Food Recommendations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recipes.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500">Loading recipes...</p>
            ) : (
              recipes.map((recipe) => {
                const recipeUrl = `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-")}-${recipe.id}`;
                const isSaved = savedFoodUrls.includes(recipeUrl);
                return (
                  <div key={recipe.id} className="bg-green-100 p-4 rounded-xl text-center shadow">
                    <h4 className="text-base sm:text-lg font-medium mb-2">{recipe.title}</h4>
                    {recipe.image && (
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="mx-auto mb-3 rounded-lg h-32 object-cover"
                      />
                    )}
                    <a
                      href={recipeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                    >
                      View Recipe
                    </a>
                    <button
                      onClick={() => {
                        if (!isSaved) {
                          addToFavorites(
                            {
                              title: recipe.title,
                              image: recipe.image,
                              url: recipeUrl,
                            },
                            "food",
                            mood
                          );
                          setSavedFoodUrls([...savedFoodUrls, recipeUrl]);
                        }
                      }}
                      className={`block mt-2 text-sm ${
                        isSaved ? "text-pink-600" : "text-green-700 hover:underline"
                      }`}
                      disabled={isSaved}
                    >
                      {isSaved ? "❤️ Saved" : "💾 Save to Favorites"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

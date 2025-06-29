import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [musicFavorites, setMusicFavorites] = useState([]);
  const [foodFavorites, setFoodFavorites] = useState([]);

  useEffect(() => {
    const music = JSON.parse(localStorage.getItem("favorites-music")) || [];
    const food = JSON.parse(localStorage.getItem("favorites-food")) || [];
    setMusicFavorites(music);
    setFoodFavorites(food);
  }, []);

  const handleRemove = (index, type) => {
    const key = `favorites-${type}`;
    const list = type === "music" ? [...musicFavorites] : [...foodFavorites];
    list.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(list));
    type === "music" ? setMusicFavorites(list) : setFoodFavorites(list);
  };

  const clearAllFavorites = () => {
    const confirmed = window.confirm("Are you sure you want to remove all favorites?");
    if (!confirmed) return;
    localStorage.removeItem("favorites-music");
    localStorage.removeItem("favorites-food");
    setMusicFavorites([]);
    setFoodFavorites([]);
  };

  const clearSpecificFavorites = (type) => {
    const key = `favorites-${type}`;
    localStorage.removeItem(key);
    type === "music" ? setMusicFavorites([]) : setFoodFavorites([]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/rf-bg.png')" }}
      ></div>

      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Your Favorites</h2>

          {(musicFavorites.length > 0 || foodFavorites.length > 0) && (
            <div className="text-center mb-6 flex flex-wrap justify-center gap-4">
              <button onClick={clearAllFavorites} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
                ❌ Clear All Favorites
              </button>
              <button onClick={() => clearSpecificFavorites("music")} className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition">
                🎵 Clear Music
              </button>
              <button onClick={() => clearSpecificFavorites("food")} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                🥗 Clear Food
              </button>
            </div>
          )}

          <h3 className="text-xl font-semibold text-purple-700 mb-4">🎵 Music</h3>
          {musicFavorites.length === 0 ? (
            <p className="text-gray-600 mb-6">No music saved.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {musicFavorites.map((item, index) => (
                <div key={index} className="bg-purple-100 p-4 rounded-xl text-center shadow">
                  <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                  <p className="text-sm text-purple-600 italic mb-2">Mood: {item.mood || "Unknown"}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition block mb-2">
                    Listen Now
                  </a>
                  <button onClick={() => handleRemove(index, "music")} className="text-red-600 text-sm hover:underline">
                    ❌ Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <h3 className="text-xl font-semibold text-green-700 mb-4">🥗 Food</h3>
          {foodFavorites.length === 0 ? (
            <p className="text-gray-600">No recipes saved.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {foodFavorites.map((item, index) => (
                <div key={index} className="bg-green-100 p-4 rounded-xl text-center shadow">
                  <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                  <p className="text-sm text-green-700 italic mb-2">Mood: {item.mood || "Unknown"}</p>
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover mb-3 rounded-lg" />
                  )}
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition block mb-2">
                    View Recipe
                  </a>
                  <button onClick={() => handleRemove(index, "food")} className="text-red-600 text-sm hover:underline">
                    ❌ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

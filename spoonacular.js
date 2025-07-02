// src/api/spoonacular.js
const API_KEY = '2517b9c787cd41dc8934749366a9a427'; // Replace with your actual key

export async function fetchRecipesByMood(mood) {
  const moodKeywords = {
    happy: "fruit salad",
    sad: "comfort food",
    lazy: "easy noodles",
    focused: "protein bowl"
  };

  const query = moodKeywords[mood] || "snack";
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}


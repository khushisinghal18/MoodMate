# MoodMate 🎧🍽️
**MoodMate** is a React-based web application that suggests food recipes and music based on your current mood. Whether you're feeling happy, sad, lazy, or focused — MoodMate personalizes suggestions to help uplift or balance your emotions.

##  Features
- 😄 Mood selection through emoji buttons or typed text
- 🔍 Mood detection using keyword analysis
- 🎲 "Surprise Me" random mood generator
- 🥗 Recipe suggestions using the Spoonacular API
- 🎵 Curated music playlists via YouTube links
- ❤️ Save and manage favorite recipes & songs using LocalStorage
- 📱 Fully responsive UI with Tailwind CSS


## 🧑‍💻 Tech Stack

| Tool         | Purpose                        |
|--------------|--------------------------------|
| React.js     | Frontend framework             |
| Tailwind CSS | Styling and responsiveness     |
| Spoonacular  | Recipe API integration         |
| React Router | Page navigation                |
| LocalStorage | Storing mood and favorite data |


##  Folder Structure
src/
├── api/                 // Spoonacular API fetch logic
├── components/          // Navbar and reusable UI
├── pages/               // Home, Recommendations, Favorites, About
├── App.jsx              // Route structure
├── index.css            // Tailwind directives
└── main.jsx             // App entry point



##  How to Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/MoodMate.git
   cd MoodMate
````

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

>  *Make sure to add your Spoonacular API key in* `src/api/spoonacular.js`


##  Learnings
This project was made while learning React, JavaScript, and Tailwind CSS from scratch. Key concepts implemented:
* useState and useEffect hooks
* Component-based structure
* Routing with React Router
* Responsive design with Tailwind
* Working with third-party APIs (Spoonacular)
* LocalStorage for persistence



##  License
This project is open for learning and demonstration purposes.

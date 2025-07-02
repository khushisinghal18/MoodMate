import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-4">About MoodMate</h1>

        <p className="text-lg text-gray-700 mb-6 text-center">
          MoodMate is your personalized companion for <span className="font-semibold text-purple-600">mood-based music</span> and <span className="font-semibold text-green-600">food recommendations</span>. 🎵🥗
        </p>

        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-purple-700">🎯 Our Mission</h2>
            <p className="text-gray-700 mt-1">
              To blend emotions, flavors, and rhythms — making your daily experience more joyful and mindful. MoodMate helps you find music and recipes based on how you're feeling.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-green-700">🔍 How It Works</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Pick your current mood — Happy, Sad, Lazy, or Focused.</li>
              <li>Get handpicked Spotify playlists to match your vibe.</li>
              <li>Find delicious recipes that suit your mood.</li>
              <li>Save your favorites for easy access anytime.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-700">👩‍💻 Built With</h2>
            <p className="text-gray-700 mt-1">
              ReactJS, Tailwind CSS, Spoonacular API, and Spotify links. LocalStorage is used to save your favorites — no sign-in required.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-700">💡 Future Scope</h2>
            <p className="text-gray-700 mt-1">
              User login, mood tracking history, personalized dashboards, and voice-controlled recommendations are on the way!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Made with 💜 by Team MoodMate.
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😴", label: "Lazy" },
  { emoji: "😎", label: "Focused" },
];

const moodKeywords = {
  happy: ["happy", "joy", "excited", "grateful", "cheerful", "content", "delighted", "smiling", "energetic"],
  sad: ["sad", "upset", "depressed", "crying", "hurt", "lonely", "heartbroken", "miserable", "melancholy"],
  lazy: ["lazy", "tired", "bored", "sleepy", "unmotivated", "chilling", "slow", "lethargic", "relaxed"],
  focused: ["focused", "concentrated", "motivated", "productive", "disciplined", "determined", "studying", "working"]
};

export default function Home() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [userText, setUserText] = useState("");

  const handleMoodSelect = (moodLabel) => {
    const lower = moodLabel.toLowerCase();
    const emoji = moods.find((m) => m.label === moodLabel).emoji;

    setSelectedMood(lower);
    localStorage.setItem("selectedMood", lower);

    const now = new Date().toLocaleString();
    const entry = { mood: lower, emoji, date: now, note: "" };
    const hist = JSON.parse(localStorage.getItem("mood-history")) || [];
    hist.push(entry);
    localStorage.setItem("mood-history", JSON.stringify(hist));
  };

  const detectMoodFromText = (text) => {
    const lowerText = text.toLowerCase();
    for (const mood in moodKeywords) {
      if (moodKeywords[mood].some((word) => lowerText.includes(word))) {
        return mood;
      }
    }
    return null;
  };

  const handleTextDetect = () => {
    const detected = detectMoodFromText(userText);
    if (detected) {
      setSelectedMood(detected);
      localStorage.setItem("selectedMood", detected);

      const emoji = moods.find((m) => m.label.toLowerCase() === detected)?.emoji || "";
      const now = new Date().toLocaleString();
      const entry = { mood: detected, emoji, date: now, note: userText };
      const hist = JSON.parse(localStorage.getItem("mood-history")) || [];
      hist.push(entry);
      localStorage.setItem("mood-history", JSON.stringify(hist));

      alert(`Detected mood: ${detected.charAt(0).toUpperCase() + detected.slice(1)}!`);
    } else {
      alert("Couldn't detect your mood. Please try different words!");
    }
  };

  const handleRandomMood = () => {
    const random = moods[Math.floor(Math.random() * moods.length)];
    handleMoodSelect(random.label);
  };

  const handleShowRecommendations = () => {
    if (!selectedMood) {
      alert("Please select a mood first!");
      return;
    }
    navigate("/recommendations");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/bg-home.png')",
      }}
    >
      <div className="bg-white/80 rounded-xl px-4 py-6 sm:px-8 sm:py-10 text-center shadow-xl max-w-xl w-full">
        {/* Logo and Title */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center">
            <img src="/logo.png" alt="MoodMate Logo" className="h-10 w-10 mr-3 rounded-full" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800">MoodMate</h1>
          </div>
          <p className="text-base sm:text-lg text-purple-600 mt-1 italic font-medium">
            Feed your mood — with food & tunes!
          </p>
        </div>

        {/* Mood Buttons */}
        <p className="text-lg sm:text-xl mb-3 text-gray-800">How are you feeling today?</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => handleMoodSelect(m.label)}
              className={`rounded-xl shadow-md px-4 py-3 text-base sm:text-lg transition ${
                selectedMood === m.label.toLowerCase()
                  ? "bg-purple-200 text-purple-800 font-semibold"
                  : "bg-white hover:bg-purple-100"
              }`}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        {/* Surprise Button */}
        <button
          onClick={handleRandomMood}
          className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 mb-5 transition text-sm sm:text-base"
        >
          🎲 Surprise Me with a Mood
        </button>

        {/* Text Input */}
        <textarea
          className="w-full h-20 p-3 border border-purple-300 rounded-lg mb-4 resize-none text-sm sm:text-base"
          placeholder="Type how you're feeling..."
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />

        {/* Detect Mood Button */}
        <button
          onClick={handleTextDetect}
          className="bg-purple-600 text-white w-full sm:w-auto px-6 py-2 rounded-full hover:bg-purple-700 transition mb-3"
        >
          🔍 Detect My Mood
        </button>

        {/* Show Recommendation */}
        <button
          onClick={handleShowRecommendations}
          className="bg-purple-600 text-white w-full sm:w-auto px-6 py-2 rounded-full hover:bg-purple-700 transition shadow-lg"
        >
          Show My Recommendations
        </button>
      </div>
    </div>
  );
}

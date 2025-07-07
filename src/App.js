// App.js - Main Component for KIH (Keeping It Human)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dummyData = [
  {
    title: "Listen to TPAB",
    description:
      "Honestly, its ona the best rap albums I've ever listened to with all of the Jazz instruments.",
    submittedBy: "Evan",
    timestamp: "2025-02-28 01:16:26",
  },
  {
    title: "Inception",
    description:
      "A film that dares to challenge your grip on reality. Christopher Nolan crafts a dreamworld layered so deeply you’ll leave questioning which parts were real. Watch it late at night, in silence, and let the score by Hans Zimmer echo in your bones.",
    submittedBy: "Amy",
    timestamp: "2025-06-19 03:20:02",
  },
  {
    title: "The Office",
    description:
      "Not just a comedy — a slow-burn comfort show that somehow captures the absurdity and beauty of working life. Perfect for unwinding after school or during dinner. You’ll stay for the laughs and find yourself caring way too much about Dwight Schrute’s beet farm.",
    submittedBy: "Chris",
    timestamp: "2024-11-03 08:42:02",
  },
];

function App() {
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({
    title: "",
    description: "",
    submittedBy: "",
  });

  const handleScroll = (e) => {
    if (e.deltaY > 0 && index < dummyData.length - 1) {
      setIndex(index + 1);
    } else if (e.deltaY < 0 && index > 0) {
      setIndex(index - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && index < dummyData.length - 1) {
      setIndex(index + 1);
    } else if (e.key === "ArrowUp" && index > 0) {
      setIndex(index - 1);
    }
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dummyData.push({
      ...newSuggestion,
      timestamp: new Date().toISOString(),
    });
    setNewSuggestion({
      title: "",
      description: "",
      submittedBy: "",
    });
    setShowForm(false);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden"
      onWheel={handleScroll}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl text-center"
          >
            <h1 className="text-2xl font-semibold mb-4 text-gray-700">
              {dummyData[index].title}
            </h1>
            <p className="text-base mb-6 text-gray-600 leading-relaxed max-w-prose">
              {dummyData[index].description}
            </p>
            {dummyData[index].submittedBy && (
              <p className="text-sm text-gray-400">
                - {dummyData[index].submittedBy}
              </p>
            )}
            <p className="text-xs text-gray-400 mb-6">
              {new Date(dummyData[index].timestamp).toLocaleString()}
            </p>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              Add Your Word of Mouth
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full max-w-xl p-8 bg-white rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Add Your Word of Mouth
            </h2>
            <input
              className="w-full p-3 mb-3 border border-gray-300 rounded"
              placeholder="Title"
              value={newSuggestion.title}
              onChange={(e) =>
                setNewSuggestion({ ...newSuggestion, title: e.target.value })
              }
              required
            />
            <textarea
              className="w-full p-3 mb-3 border border-gray-300 rounded"
              placeholder="Why are you recommending this?"
              value={newSuggestion.description}
              onChange={(e) =>
                setNewSuggestion({
                  ...newSuggestion,
                  description: e.target.value,
                })
              }
              required
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              placeholder="Your Name (optional)"
              value={newSuggestion.submittedBy}
              onChange={(e) =>
                setNewSuggestion({
                  ...newSuggestion,
                  submittedBy: e.target.value,
                })
              }
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

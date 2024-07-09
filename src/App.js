import React, { useState, useEffect } from "react";
import "./App.css";
import Monitor from "./oldMonitor.png";
import SnakeGame from "./components/SnakeGame";
import ScoreBoard from "./components/ScoreBoard";
import UserInput from "./components/UserInput";
import axios from "axios";

const API_URL = "https://snakegame-backend.onrender.com";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState({ playerName: "", score: 0 });
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const fetchHighScore = async () => {
      try {
        const response = await axios.get(`${API_URL}/highscore`);
        if (response.data) {
          setHighScore(response.data);
        }
      } catch (error) {
        console.error("Error fetching high score:", error);
      }
    };
    fetchHighScore();
  }, []);

  const handleResetHighScore = async () => {
    try {
      await axios.post(`${API_URL}/highscore`, { playerName: "", score: 0 });
      setHighScore({ playerName: "", score: 0 });
    } catch (error) {
      console.error('Error resetting high score:', error);
    }
  };

  const updateHighScore = async (finalScore) => {
    if (finalScore > highScore.score) {
      try {
        await axios.post(`${API_URL}/highscore`, { playerName, score: finalScore });
        setHighScore({ playerName, score: finalScore });
      } catch (error) {
        console.error('Error updating high score:', error);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetUser = () => {
    window.location.reload();
  };

  return (
    <div>
      <img src={Monitor} alt="monitor" width="4000" className="monitor" />
      {!gameStarted ? (
        <UserInput setPlayerName={setPlayerName} onStartGame={startGame} />
      ) : (
        <>
          <SnakeGame
            score={score}
            setScore={setScore}
            onGameOver={updateHighScore}
            onResetUser={resetUser}
          />
          <ScoreBoard
            score={score}
            highScore={highScore}
            onResetHighScore={handleResetHighScore}
            playerName={playerName}
          />
        </>
      )}
    </div>
  );
}

export default App;

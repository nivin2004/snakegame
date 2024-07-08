import React from "react";

const ScoreBoard = ({ score, highScore, onResetHighScore }) => {
  return (<div>
    <div className="scoreBox">
      <h2>Score: {score}</h2>
    </div>
    <div className="scoreBox2">
      <h2 >High Score</h2>
      <h2> {highScore.playerName} : {highScore.score}</h2>
    </div></div>
  );
};

export default ScoreBoard;

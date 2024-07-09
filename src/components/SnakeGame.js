import React, { useEffect, useRef, useState } from "react";
import useInterval from "../useInterval";
import AppleLogo from "../applePixels.png";

const canvasX = 1000;
const canvasY = 1000;
const initialSnake = [[4, 10], [4, 10]];
const initialApple = [14, 10];
const scale = 50;
const timeDelay = 100;

const SnakeGame = ({ score, setScore, onGameOver, onResetUser }) => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Load sounds
  const eatSound = new Audio("/sounds/food.wav");
  const gameOverSound = new Audio("/sounds/gameover.mp3");

  useInterval(() => runGame(), delay);

  useEffect(() => {
    let fruit = document.getElementById("fruit");
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#a3d001";
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver]);

  const play = () => {
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
  };

  const checkCollision = (head) => {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  };

  const appleAte = (newSnake) => {
    let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale));
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = coord;
      setScore(score + 1);
      setApple(newApple);
      eatSound.play();  // Play eat sound
      return true;
    }
    return false;
  };

  const runGame = () => {
    const newSnake = [...snake];
    const newSnakeHead = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      onGameOver(score);
      gameOverSound.play();  // Play game over sound
    }
    if (!appleAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const changeDirection = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        if (direction[0] === 0) {
          setDirection([-1, 0]);
        }
        break;
      case "ArrowUp":
        if (direction[1] === 0) {
          setDirection([0, -1]);
        }
        break;
      case "ArrowRight":
        if (direction[0] === 0) {
          setDirection([1, 0]);
        }
        break;
      case "ArrowDown":
        if (direction[1] === 0) {
          setDirection([0, 1]);
        }
        break;
      default:
        break;
    }
  };


  return (
    <div onKeyDown={(e) => changeDirection(e)}>
      <img id="fruit" src={AppleLogo} alt="fruit" width="30" />
      <canvas className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
      {gameOver && <div className="gameOver">Game Over</div>}
      <button onClick={play} className="playButton">
        Play
      </button>
      <button onClick={onResetUser} className="resetUserButton">
        New User
      </button>
    </div>
  );
};

export default SnakeGame;

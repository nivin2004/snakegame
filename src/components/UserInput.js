import React, { useState } from "react";
import './UserInput.css';

const UserInput = ({ setPlayerName, onStartGame }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setPlayerName(name);
      onStartGame();
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div className="monitorContainer">
      {/* <img src={Monitor} alt="monitor" className="monitorImage" /> */}
      <div className="inputContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange}
            className="inputField"
          />
          <button type="submit" className="inputButton">Start Game</button>
        </form>
      </div>
    </div>
  );
};

export default UserInput;

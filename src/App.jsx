import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


const cards = [
  { id: 1, value: '❤️' },
  { id: 2, value: '❤️' },
  { id: 3, value: '💎' },
  { id: 4, value: '💎' },
  { id: 5, value: '🌞' },
  { id: 6, value: '🌞' },
  { id: 7, value: '🌟' },
  { id: 8, value: '🌟' },
  { id: 9, value: '🌸' },
  { id: 10, value: '🌸' },
  { id:11, value: '🚀' },
  { id: 12, value: '🚀' },
  { id: 13, value: '🎸' },
  { id: 14, value: '🎸' },
  { id: 15, value: '😎' },
  { id: 16, value: '😎' },
  { id: 17, value: '😇' },
  { id: 18, value: '😇' },
  { id: 19, value: '👑' },
  { id: 20, value: '👑' },
  { id: 21, value: '❄️' },
  { id: 22, value: '❄️' },
  { id: 23, value: '🔥' },
  { id: 24, value: '🔥' },
  { id: 25, value: '🎲' },
  { id: 26, value: '🎲' },
  { id: 27, value: '🌹' },
  { id: 28, value: '🌹' },
];

function App() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(7);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [jubilation, setJubilation] = useState(false);

  const shuffledCards = useRef(shuffleArray(cards));

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.value === card2.value) {
        setMatchedPairs([...matchedPairs, card1.id, card2.id]);
        setScore(score + 5);
        if (matchedPairs.length + 2 === cards.length) {
          setJubilation(true);
        }
      } else {
        setLives(lives - 1);
        if (lives === 1) {
          setGameOver(true);
        }
      }
      setFlippedCards([]);
    }
  }, [flippedCards, matchedPairs, score, lives]);

  const handleCardClick = (card) => {
    if (!flippedCards.includes(card) && flippedCards.length < 2 && !matchedPairs.includes(card.id)) {
      setFlippedCards([...flippedCards, card]);
    }
  };

  const resetGame = () => {
    setLives(7);
    setScore(0);
    setMatchedPairs([]);
    setFlippedCards([]);
    setGameOver(false);
    setJubilation(false);
    shuffledCards.current = shuffleArray(cards);
  };

  return (
    <div className="App">
      <h1 className='title'>SWITCH</h1>
      <div className="Scoreboard">
        <span className='titl'>Score: {score}</span>
        <span className='titl'>Lives: {lives}</span>
      </div>
      {jubilation && <div className="JubilationAnimation">Congratulations!</div>}
      <div className="CardGrid">
        {shuffledCards.current.map((card) => (
          <div
            key={card.id}
            className={`Card ${flippedCards.includes(card) || matchedPairs.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            {matchedPairs.includes(card.id) ? (
              <div className="MatchedCard"></div>
            ) : flippedCards.includes(card) ? (
              card.value
            ) : (
              '?'
            )}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="GameOver">
          <img style={{borderRadius : "30px"}} src='https://media.tenor.com/eWKbzq3GhRUAAAAM/aesthetic-game-over.gif' alt="Game Over" height="400" width={1000}/>
          <button className="PlayAgainButton" onClick={resetGame}>
          Play Again
        </button>
        </div>
      )}
    </div>
  );
  
}

export default App;

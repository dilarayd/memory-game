import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactCardFlip from "react-card-flip";
import CardFront from './CardFront';
import CardBack from './CardBack';
import { flipCard, setGameOver, restartGame } from '../redux/cardSlice';

function Cards() {
  const score = useSelector((state) => state.cards.score)
  const gameOver = useSelector(state => state.cards.gameOver);
  const cards = useSelector(state => state.cards.entities);
  const [flippedCards, setFlippedCards] = useState([]); 
  const [matchedPairs, setMatchedPairs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (matchedPairs.length === 15) {
      dispatch(setGameOver(true));
    }
  }, [matchedPairs.length, dispatch]);

  const handleRestart = () => {
    dispatch(restartGame());
    setFlippedCards([]); 
    setMatchedPairs([]);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
      dispatch(flipCard({ id: index }));
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex].name === cards[secondIndex].name) {
        setMatchedPairs(prevMatchedPairs => [...prevMatchedPairs, cards[firstIndex].name]);
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 750);
    }
  }, [flippedCards, cards]);

  return (
    <>
      <div>
        {gameOver && (
          <div className="btn-container fixed-top">
            <button className='final-score'>  Your Score: {score} </button>
            <button onClick={handleRestart} className='start-again-btn '> Play again</button>
          </div>
        )}
      </div>

      <div className="cards-container">
        {cards.map((card, index) => (
          <ReactCardFlip key={index} isFlipped={flippedCards.includes(index) || matchedPairs.includes(card.name)} flipDirection="horizontal">
            <div onClick={() => handleCardClick(index)} className="card card-back">
              <div>
                <CardBack />
              </div>
            </div>
            <div onClick={() => handleCardClick(index)} className={matchedPairs.includes(card.name) ? "card card-front matched" : "card"}>
              <div>
                <CardFront img={card.img} name={card.name} />
              </div>
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </>
  );
}

export default Cards;

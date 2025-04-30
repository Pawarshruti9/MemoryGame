// App.jsx
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
// Import your images
import religiousImage from './assets/religious_freedom.png';
import protectionImage from './assets/protection_from_exploitation.png';
import constitutionalRemediesImage from './assets/right_to_constitutional_remedies.png';
import equalityImage from './assets/right_to_equality.png.webp';
import educationImage from './assets/education.png';
import freedomImage from './assets/freedom_of_speech.png';

// Card images array with 6 cards (as requested)
const cardImages = [
  { "src": protectionImage, "name": "protection_from_exploitation", matched: false },
  { "src": religiousImage, "name": "religious_freedom", matched: false },
  { "src": constitutionalRemediesImage, "name": "right_to_constitutional_remedies", matched: false },
  { "src": equalityImage, "name": "right_to_equality", matched: false },
  { "src": educationImage, "name": "education", matched: false },
  { "src": freedomImage, "name": "freedom_of_speech", matched: false }
];

// Educational messages based on card names
const educationalMessages = {
  "protection_from_exploitation": "Right Against Exploitation (Articles 23-24)",
  "religious_freedom": "Right to Freedom of Religion (Articles 25-28)",
  "right_to_constitutional_remedies": "Right to Constitutional Remedies (Articles 32-35)",
  "right_to_equality": "Right to Equality (Articles 14-18)",
  "education": "Cultural and Educational Rights (Articles 29-30)",
  "freedom_of_speech": "Right to Freedom (Articles 19-22)"
};

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disableCard, setDisableCard] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Shuffle function
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisableCard(true);
      if (choiceOne.src === choiceTwo.src) {
        // Show educational popup based on the matched card
        const cardName = choiceOne.name;
        setPopupMessage(educationalMessages[cardName] || "You found a match!");
        setShowPopup(true);
        
        // Update cards state with matched property
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        
        // Reset turn after a short delay to allow popup to be seen
        setTimeout(() => resetTurn(), 500);
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increment turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisableCard(false);
  };

  // Start new game on load
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button className="new-game-btn" onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disableCard}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>

      {/* Educational Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Congratulations!</h3>
            <p>{popupMessage}</p>
            <button onClick={closePopup}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
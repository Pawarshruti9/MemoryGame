// SingleCard.jsx
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <div className="front">
                    <img src={card.src} alt="card front" />
                </div>
                <div className="back" onClick={handleClick}>
                    <div className="card-back-content">
                        <span>?</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
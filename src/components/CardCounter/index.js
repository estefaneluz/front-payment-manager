import './styles.css';

function CardCounter({ color, text, number }) {
    return (
        <div className={`counter-container ${color}`}>
            <p> { text } </p>
            <p className="counter-number"> { number } </p>
        </div>
    )
}

export default CardCounter;
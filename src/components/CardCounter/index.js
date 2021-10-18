import './styles.css';

function CardCounter({ color, text, number, handleReportFilter }) {
    return (
        <div className={`counter-container ${color}` } onClick={handleReportFilter}>
            <p> { text } </p>
            <p className="counter-number"> { number } </p>
        </div>
    )
}

export default CardCounter;
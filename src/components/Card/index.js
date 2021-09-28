import './styles.css';

function Card({ children, icon, title }) {
    return(
        <div className="card-container">
            <div className="card-header">
                <img src={icon} alt={`icone do card ${title}`} />
                <p>{ title }</p>
            </div>
            <div className="card-content">
                { children }
            </div>
        </div>
    )
}

export default Card;
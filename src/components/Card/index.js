function Card({ children, icon, title }) {
    return(
        <div className="card-container">
            <div className="card-header">
                <img src={icon} alt={`icone de ${title}`} />
                <p>{ title }</p>
            </div>
            <div className="card-content">
                { children }
            </div>
        </div>
    )
}

export default Card;
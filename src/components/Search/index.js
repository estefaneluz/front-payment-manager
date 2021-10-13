import './styles.css';
import searchIcon from '../../assets/search-icon.svg';

function Search() {
    return(
        <div className="input-search">
            <input type="search" placeholder="Procurar por Nome, E-mail ou CPF" />
            <button className="search-button">
                <div>
                    <img src={searchIcon} alt="icone de pesquisa" /> 
                    <span> Buscar </span>
                </div>
            </button>
        </div>
    );
}

export default Search;
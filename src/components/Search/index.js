import './styles.css';
import searchIcon from '../../assets/search-icon.svg';

function Search({className, search, setSearch, getSearch}) {

    return(
        <div className={`input-search ${className}`}>
            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        getSearch();
                    }
                }}
                type="search" 
                placeholder="Procurar por Nome, E-mail ou CPF"
            />
            <button 
                className="search-button" 
                onClick={getSearch} 
                type="button"
            >
                <div>
                    <img src={searchIcon} alt="icone de pesquisa" /> 
                    <span> Buscar </span>
                </div>
            </button>
        </div>
    );
}

export default Search;
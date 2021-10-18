import './styles.css';
import dogIcon from '../../assets/Dog-swimming-01.svg';
import { Link } from 'react-router-dom';

function NoRecords({element, link}) {
    return(
        <div>
            <p>{`Não há ${element} disponíveis.`}</p>
            <Link to={link} className="no-records-link">
                {`Clique aqui para criar.`}
            </Link>
            <img src={dogIcon} alt="ilustração de um cachorrinho em uma boia."/>
        </div>
    );
}

export default NoRecords;
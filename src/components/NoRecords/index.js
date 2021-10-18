import './styles.css';
import dogIcon from '../../assets/Dog-swimming-01.svg';
import { Link } from 'react-router-dom';

function NoRecords({link, message}) {
    return(
        <div>
            <p>{message}</p>
            <Link to={link} className="no-records-link">
                {`Clique aqui caso deseje criar uma nova.`}
            </Link>
            <img src={dogIcon} alt="ilustração de um cachorrinho em uma boia."/>
        </div>
    );
}

export default NoRecords;
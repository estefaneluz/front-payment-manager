import './styles.css';
import trashIcon from '../../assets/trash-icon.svg';

function DeleteItem() {
    return(
        <div className="flex-row delete-item-container">
            <div className="delete-item">
                <img src={trashIcon} alt="icone de lixeira (deletar). "/>
                <p>Excluir cobrança</p>
            </div>
            <div className="popup-delete">
                <p>Apagar item?</p>
                <div>
                    <button className="delete-btn --blue">Sim</button>
                    <button className="delete-btn --red">Não</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteItem;